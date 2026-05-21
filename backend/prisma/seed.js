import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminEmail = 'admin@test.com';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    const hashedPassword = await bcrypt.hash('password123', 12);
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'VShield Admin',
        role: 'ADMIN',
      },
    });
    console.log('Created admin user: admin@test.com / password123');
  } else {
    console.log('Admin user already exists');
  }

  // Create sample candidates
  const sampleCandidates = [
    {
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '9876543210',
      dateOfBirth: new Date('1992-05-15'),
      aadhaarNumber: '123456789012',
      panNumber: 'ABCDE1234F',
      address: 'Flat 402, Shanti Vihar, Sector 56, Gurgaon, Haryana - 122011',
      status: 'VERIFIED',
    },
    {
      fullName: 'Priya Patel',
      email: 'priya.patel@example.com',
      phone: '9812345678',
      dateOfBirth: new Date('1995-10-22'),
      aadhaarNumber: '987654321098',
      panNumber: 'XYZWP5678Q',
      address: '12, Park Street, Kolkata, West Bengal - 700016',
      status: 'PENDING',
    },
    {
      fullName: 'Amit Kumar',
      email: 'amit.kumar@example.com',
      phone: '9988776655',
      dateOfBirth: new Date('1988-02-08'),
      aadhaarNumber: '456789012345',
      panNumber: 'LMNOP9012S',
      address: 'House No. 45, Rajendra Nagar, Patna, Bihar - 800016',
      status: 'IN_PROGRESS',
    },
    {
      fullName: 'Sneha Reddy',
      email: 'sneha.reddy@example.com',
      phone: '9123456789',
      dateOfBirth: new Date('1994-07-30'),
      aadhaarNumber: '789012345678',
      panNumber: 'RSTUV3456D',
      address: 'Flat 101, Oakwood Apartments, Gachibowli, Hyderabad, Telangana - 500032',
      status: 'FAILED',
    },
    {
      fullName: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '9000111222',
      dateOfBirth: new Date('1990-12-12'),
      aadhaarNumber: '234567890123',
      panNumber: 'DEFGH7890Z',
      address: '76, Model Town, Jalandhar, Punjab - 144003',
      status: 'PENDING',
    },
  ];

  for (const candidateData of sampleCandidates) {
    const existing = await prisma.candidate.findFirst({
      where: { email: candidateData.email, userId: admin.id },
    });

    if (!existing) {
      const candidate = await prisma.candidate.create({
        data: {
          ...candidateData,
          userId: admin.id,
        },
      });

      // If status is verified or failed, seed verification logs
      if (candidateData.status === 'VERIFIED') {
        await prisma.verificationLog.createMany({
          data: [
            {
              candidateId: candidate.id,
              type: 'AADHAAR',
              status: 'SUCCESS',
              requestPayload: { aadhaarNumber: candidateData.aadhaarNumber, fullName: candidateData.fullName },
              responsePayload: { success: true, verified: true, referenceId: `AAD-${Date.now()}-1`, details: { nameMatch: true } },
              verifiedAt: new Date(),
            },
            {
              candidateId: candidate.id,
              type: 'PAN',
              status: 'SUCCESS',
              requestPayload: { panNumber: candidateData.panNumber, fullName: candidateData.fullName },
              responsePayload: { success: true, verified: true, referenceId: `PAN-${Date.now()}-2`, details: { nameMatch: true } },
              verifiedAt: new Date(),
            },
          ],
        });
      } else if (candidateData.status === 'FAILED') {
        await prisma.verificationLog.createMany({
          data: [
            {
              candidateId: candidate.id,
              type: 'AADHAAR',
              status: 'SUCCESS',
              requestPayload: { aadhaarNumber: candidateData.aadhaarNumber, fullName: candidateData.fullName },
              responsePayload: { success: true, verified: true, referenceId: `AAD-${Date.now()}-3`, details: { nameMatch: true } },
              verifiedAt: new Date(),
            },
            {
              candidateId: candidate.id,
              type: 'PAN',
              status: 'FAILED',
              requestPayload: { panNumber: candidateData.panNumber, fullName: candidateData.fullName },
              responsePayload: { success: true, verified: false, referenceId: `PAN-${Date.now()}-4`, details: { nameMatch: false, reason: 'Name mismatch' } },
              verifiedAt: null,
            },
          ],
        });
      } else if (candidateData.status === 'IN_PROGRESS') {
        await prisma.verificationLog.create({
          data: {
            candidateId: candidate.id,
            type: 'AADHAAR',
            status: 'SUCCESS',
            requestPayload: { aadhaarNumber: candidateData.aadhaarNumber, fullName: candidateData.fullName },
            responsePayload: { success: true, verified: true, referenceId: `AAD-${Date.now()}-5`, details: { nameMatch: true } },
            verifiedAt: new Date(),
          },
        });
      }
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
