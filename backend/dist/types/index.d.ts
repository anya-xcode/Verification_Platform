import { Request } from 'express';
export interface AuthPayload {
    userId: string;
    email: string;
    role: string;
}
export interface AuthRequest extends Request {
    user?: AuthPayload;
}
export interface PaginationParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export interface MockVerificationResponse {
    success: boolean;
    verified: boolean;
    message: string;
    referenceId: string;
    details: Record<string, unknown>;
    timestamp: string;
}
//# sourceMappingURL=index.d.ts.map