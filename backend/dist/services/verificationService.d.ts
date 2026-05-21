export declare class VerificationService {
    verifyAadhaar(candidateId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.VerificationType;
        status: import(".prisma/client").$Enums.VerificationStatus;
        candidateId: string;
        requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
        responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
        verifiedAt: Date | null;
    }>;
    verifyPan(candidateId: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.VerificationType;
        status: import(".prisma/client").$Enums.VerificationStatus;
        candidateId: string;
        requestPayload: import("@prisma/client/runtime/library").JsonValue | null;
        responsePayload: import("@prisma/client/runtime/library").JsonValue | null;
        verifiedAt: Date | null;
    }>;
    getStatus(candidateId: string, userId: string): Promise<{
        candidateId: string;
        candidateName: string;
        overallStatus: import(".prisma/client").$Enums.CandidateStatus;
        aadhaar: {
            status: import(".prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            referenceId: any;
        } | {
            status: string;
            verifiedAt?: undefined;
            referenceId?: undefined;
        };
        pan: {
            status: import(".prisma/client").$Enums.VerificationStatus;
            verifiedAt: Date | null;
            referenceId: any;
        } | {
            status: string;
            verifiedAt?: undefined;
            referenceId?: undefined;
        };
    }>;
    private updateCandidateStatus;
}
export declare const verificationService: VerificationService;
//# sourceMappingURL=verificationService.d.ts.map