import { PaginationParams, PaginatedResponse } from '../types';
export declare class CandidateService {
    getAll(userId: string, params: PaginationParams): Promise<PaginatedResponse<any>>;
    getById(id: string, userId: string): Promise<{
        verificationLogs: {
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.VerificationType;
            status: import(".prisma/client").$Enums.VerificationStatus;
            candidateId: string;
            requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
            responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
            verifiedAt: Date | null;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.CandidateStatus;
        phone: string;
        fullName: string;
        dateOfBirth: Date;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }>;
    create(userId: string, data: {
        fullName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }): Promise<{
        verificationLogs: {
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.VerificationType;
            status: import(".prisma/client").$Enums.VerificationStatus;
            candidateId: string;
            requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
            responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
            verifiedAt: Date | null;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.CandidateStatus;
        phone: string;
        fullName: string;
        dateOfBirth: Date;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }>;
    update(id: string, userId: string, data: Partial<{
        fullName: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }>): Promise<{
        verificationLogs: {
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.VerificationType;
            status: import(".prisma/client").$Enums.VerificationStatus;
            candidateId: string;
            requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
            responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
            verifiedAt: Date | null;
        }[];
    } & {
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.CandidateStatus;
        phone: string;
        fullName: string;
        dateOfBirth: Date;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.CandidateStatus;
        phone: string;
        fullName: string;
        dateOfBirth: Date;
        aadhaarNumber: string;
        panNumber: string;
        address: string;
    }>;
    getStats(userId: string): Promise<{
        total: number;
        verified: number;
        pending: number;
        failed: number;
        inProgress: number;
        recent: ({
            verificationLogs: {
                id: string;
                createdAt: Date;
                type: import(".prisma/client").$Enums.VerificationType;
                status: import(".prisma/client").$Enums.VerificationStatus;
                candidateId: string;
                requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
                responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
                verifiedAt: Date | null;
            }[];
        } & {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.CandidateStatus;
            phone: string;
            fullName: string;
            dateOfBirth: Date;
            aadhaarNumber: string;
            panNumber: string;
            address: string;
        })[];
        chartData: {
            date: string;
            count: number;
        }[];
    }>;
}
export declare const candidateService: CandidateService;
//# sourceMappingURL=candidateService.d.ts.map