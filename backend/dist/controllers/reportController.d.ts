import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
export declare class ReportController {
    getReport(req: AuthRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare const reportController: ReportController;
//# sourceMappingURL=reportController.d.ts.map