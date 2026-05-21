import { PrismaClient } from '@prisma/client';
import { mockAadhaarVerification, mockPanVerification } from '../utils/mockApis.js';
import { reportService } from './reportService.js';
import { uploadReportToCloudinary } from '../utils/cloudinary.js';

const prisma = new PrismaClient();

export class VerificationService {
  async verifyAadhaar(candidateId, userId) {
    const candidate = await prisma.candidate.findFirst({
      where: { id: candidateId, userId },
    });

    if (!candidate) {
      const error = new Error('Candidate not found');
      error.statusCode = 404;
      throw error;
    }

    await prisma.candidate.update({
      where: { id: candidateId },
      data: { status: 'IN_PROGRESS' },
    });

    const response = await mockAadhaarVerification(candidate.aadhaarNumber, candidate.fullName);

    const log = await prisma.verificationLog.create({
      data: {
        candidateId,
        type: 'AADHAAR',
        status: response.verified ? 'SUCCESS' : 'FAILED',
        requestPayload: {
          aadhaarNumber: candidate.aadhaarNumber,
          fullName: candidate.fullName,
        },
        responsePayload: response,
        verifiedAt: response.verified ? new Date() : null,
      },
    });

    await this.updateCandidateStatus(candidateId, userId);

    return log;
  }

  async verifyPan(candidateId, userId) {
    const candidate = await prisma.candidate.findFirst({
      where: { id: candidateId, userId },
    });

    if (!candidate) {
      const error = new Error('Candidate not found');
      error.statusCode = 404;
      throw error;
    }

    await prisma.candidate.update({
      where: { id: candidateId },
      data: { status: 'IN_PROGRESS' },
    });

    const response = await mockPanVerification(candidate.panNumber, candidate.fullName);

    const log = await prisma.verificationLog.create({
      data: {
        candidateId,
        type: 'PAN',
        status: response.verified ? 'SUCCESS' : 'FAILED',
        requestPayload: {
          panNumber: candidate.panNumber,
          fullName: candidate.fullName,
        },
        responsePayload: response,
        verifiedAt: response.verified ? new Date() : null,
      },
    });

    await this.updateCandidateStatus(candidateId, userId);

    return log;
  }

  async getStatus(candidateId, userId) {
    const candidate = await prisma.candidate.findFirst({
      where: { id: candidateId, userId },
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

    const aadhaarLog = candidate.verificationLogs.find((l) => l.type === 'AADHAAR');
    const panLog = candidate.verificationLogs.find((l) => l.type === 'PAN');

    return {
      candidateId: candidate.id,
      candidateName: candidate.fullName,
      overallStatus: candidate.status,
      reportUrl: candidate.reportUrl || null,
      aadhaar: aadhaarLog
        ? { status: aadhaarLog.status, verifiedAt: aadhaarLog.verifiedAt, referenceId: aadhaarLog.responsePayload?.referenceId }
        : { status: 'NOT_STARTED' },
      pan: panLog
        ? { status: panLog.status, verifiedAt: panLog.verifiedAt, referenceId: panLog.responsePayload?.referenceId }
        : { status: 'NOT_STARTED' },
    };
  }

  async updateCandidateStatus(candidateId, userId) {
    const logs = await prisma.verificationLog.findMany({
      where: { candidateId },
    });

    const aadhaarLog = logs.find((l) => l.type === 'AADHAAR');
    const panLog = logs.find((l) => l.type === 'PAN');

    let status = 'PENDING';

    if (aadhaarLog && panLog) {
      if (aadhaarLog.status === 'SUCCESS' && panLog.status === 'SUCCESS') {
        status = 'VERIFIED';
      } else if (aadhaarLog.status === 'FAILED' || panLog.status === 'FAILED') {
        status = 'FAILED';
      } else {
        status = 'IN_PROGRESS';
      }
    } else if (aadhaarLog || panLog) {
      const existingLog = aadhaarLog || panLog;
      status = existingLog.status === 'FAILED' ? 'FAILED' : 'IN_PROGRESS';
    }

    await prisma.candidate.update({
      where: { id: candidateId },
      data: { status },
    });

    // Auto-generate and upload PDF report when verification completes
    if (status === 'VERIFIED' || status === 'FAILED') {
      try {
        console.log(`[REPORT] Generating PDF report for candidate ${candidateId}...`);
        const pdfBuffer = await reportService.generateReport(candidateId, userId);
        const reportUrl = await uploadReportToCloudinary(pdfBuffer, candidateId);
        await prisma.candidate.update({
          where: { id: candidateId },
          data: { reportUrl },
        });
        console.log(`[REPORT] Report uploaded to Cloudinary: ${reportUrl}`);
      } catch (err) {
        console.error('[REPORT] Failed to auto-generate or upload report:', err.message);
      }
    }
  }
}

export const verificationService = new VerificationService();
