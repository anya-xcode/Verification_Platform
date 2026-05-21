import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CandidateService {
  async getAll(userId, params) {
    const { page = 1, limit = 10, search, status } = params;
    const skip = (page - 1) * limit;

    const where = { userId };

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    if (status && status !== 'ALL') {
      where.status = status;
    }

    const [candidates, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          verificationLogs: {
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      prisma.candidate.count({ where }),
    ]);

    return {
      data: candidates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getById(id, userId) {
    const candidate = await prisma.candidate.findFirst({
      where: { id, userId },
      include: {
        verificationLogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!candidate) {
      const error = new Error('Candidate not found');
      error.statusCode = 404;
      throw error;
    }

    return candidate;
  }

  async create(userId, data) {
    return prisma.candidate.create({
      data: {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        userId,
      },
      include: {
        verificationLogs: true,
      },
    });
  }

  async update(id, userId, data) {
    // Verify ownership
    await this.getById(id, userId);

    const updateData = { ...data };
    if (data.dateOfBirth) {
      updateData.dateOfBirth = new Date(data.dateOfBirth);
    }

    return prisma.candidate.update({
      where: { id },
      data: updateData,
      include: {
        verificationLogs: true,
      },
    });
  }

  async delete(id, userId) {
    await this.getById(id, userId);
    return prisma.candidate.delete({ where: { id } });
  }

  async getStats(userId) {
    const [total, verified, pending, failed, recent] = await Promise.all([
      prisma.candidate.count({ where: { userId } }),
      prisma.candidate.count({ where: { userId, status: 'VERIFIED' } }),
      prisma.candidate.count({ where: { userId, status: 'PENDING' } }),
      prisma.candidate.count({ where: { userId, status: 'FAILED' } }),
      prisma.candidate.findMany({
        where: { userId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { verificationLogs: true },
      }),
    ]);

    // Get verification counts for last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const verificationsByDay = await prisma.verificationLog.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: sevenDaysAgo },
        candidate: { userId },
      },
      _count: true,
    });

    // Aggregate by day
    const dailyData = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      dailyData[key] = 0;
    }

    verificationsByDay.forEach((entry) => {
      const key = new Date(entry.createdAt).toISOString().split('T')[0];
      if (dailyData[key] !== undefined) {
        dailyData[key] += entry._count;
      }
    });

    const chartData = Object.entries(dailyData).map(([date, count]) => ({
      date,
      count,
    }));

    return {
      total,
      verified,
      pending,
      failed,
      inProgress: total - verified - pending - failed,
      recent,
      chartData,
    };
  }
}

export const candidateService = new CandidateService();
