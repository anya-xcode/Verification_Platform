import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare class VerificationController {
    verifyAadhaar(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    verifyPan(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
    getStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare const verificationController: VerificationController;
//# sourceMappingURL=verificationController.d.ts.map