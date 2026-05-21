"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationService = exports.VerificationService = void 0;
const client_1 = require("@prisma/client");
const mockApis_1 = require("../utils/mockApis");
const prisma = new client_1.PrismaClient();
class VerificationService {
    async verifyAadhaar(candidateId, userId) {
        const candidate = await prisma.candidate.findFirst({
            where: { id: candidateId, userId },
        });
        if (!candidate) {
            const error = new Error('Candidate not found');
            error.statusCode = 404;
            throw error;
        }
        // Update candidate status to IN_PROGRESS
        await prisma.candidate.update({
            where: { id: candidateId },
            data: { status: 'IN_PROGRESS' },
        });
        // Call mock Aadhaar API
        const response = await (0, mockApis_1.mockAadhaarVerification)(candidate.aadhaarNumber, candidate.fullName);
        // Create verification log
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
        // Update candidate status based on all verifications
        await this.updateCandidateStatus(candidateId);
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
        const response = await (0, mockApis_1.mockPanVerification)(candidate.panNumber, candidate.fullName);
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
        await this.updateCandidateStatus(candidateId);
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
            aadhaar: aadhaarLog
                ? { status: aadhaarLog.status, verifiedAt: aadhaarLog.verifiedAt, referenceId: aadhaarLog.responsePayload?.referenceId }
                : { status: 'NOT_STARTED' },
            pan: panLog
                ? { status: panLog.status, verifiedAt: panLog.verifiedAt, referenceId: panLog.responsePayload?.referenceId }
                : { status: 'NOT_STARTED' },
        };
    }
    async updateCandidateStatus(candidateId) {
        const logs = await prisma.verificationLog.findMany({
            where: { candidateId },
        });
        const aadhaarLog = logs.find((l) => l.type === 'AADHAAR');
        const panLog = logs.find((l) => l.type === 'PAN');
        let status = 'PENDING';
        if (aadhaarLog && panLog) {
            if (aadhaarLog.status === 'SUCCESS' && panLog.status === 'SUCCESS') {
                status = 'VERIFIED';
            }
            else if (aadhaarLog.status === 'FAILED' || panLog.status === 'FAILED') {
                status = 'FAILED';
            }
            else {
                status = 'IN_PROGRESS';
            }
        }
        else if (aadhaarLog || panLog) {
            const existingLog = aadhaarLog || panLog;
            if (existingLog.status === 'FAILED') {
                status = 'FAILED';
            }
            else {
                status = 'IN_PROGRESS';
            }
        }
        await prisma.candidate.update({
            where: { id: candidateId },
            data: { status },
        });
    }
}
exports.VerificationService = VerificationService;
exports.verificationService = new VerificationService();
//# sourceMappingURL=verificationService.js.map