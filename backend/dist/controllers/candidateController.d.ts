import { Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../types';
export declare const createCandidateSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    dateOfBirth: z.ZodUnion<[z.ZodString, z.ZodString]>;
    aadhaarNumber: z.ZodString;
    panNumber: z.ZodString;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    phone: string;
    fullName: string;
    dateOfBirth: string;
    aadhaarNumber: string;
    panNumber: string;
    address: string;
}, {
    email: string;
    phone: string;
    fullName: string;
    dateOfBirth: string;
    aadhaarNumber: string;
    panNumber: string;
    address: string;
}>;
export declare const updateCandidateSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodString]>>;
    aadhaarNumber: z.ZodOptional<z.ZodString>;
    panNumber: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    phone?: string | undefined;
    fullName?: string | undefined;
    dateOfBirth?: string | undefined;
    aadhaarNumber?: string | undefined;
    panNumber?: string | undefined;
    address?: string | undefined;
}, {
    email?: string | undefined;
    phone?: string | undefined;
    fullName?: string | undefined;
    dateOfBirth?: string | undefined;
    aadhaarNumber?: string | undefined;
    panNumber?: string | undefined;
    address?: string | undefined;
}>;
export declare class CandidateController {
    getAll(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getById(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    create(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    update(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    delete(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getStats(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare const candidateController: CandidateController;
//# sourceMappingURL=candidateController.d.ts.map