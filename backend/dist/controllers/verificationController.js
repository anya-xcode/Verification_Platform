"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationController = exports.VerificationController = void 0;
const verificationService_1 = require("../services/verificationService");
class VerificationController {
    async verifyAadhaar(req, res, next) {
        try {
            const userId = req.user.userId;
            const { candidateId } = req.params;
            const log = await verificationService_1.verificationService.verifyAadhaar(candidateId, userId);
            res.status(200).json(log);
        }
        catch (error) {
            next(error);
        }
    }
    async verifyPan(req, res, next) {
        try {
            const userId = req.user.userId;
            const { candidateId } = req.params;
            const log = await verificationService_1.verificationService.verifyPan(candidateId, userId);
            res.status(200).json(log);
        }
        catch (error) {
            next(error);
        }
    }
    async getStatus(req, res, next) {
        try {
            const userId = req.user.userId;
            const { candidateId } = req.params;
            const status = await verificationService_1.verificationService.getStatus(candidateId, userId);
            res.status(200).json(status);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.VerificationController = VerificationController;
exports.verificationController = new VerificationController();
//# sourceMappingURL=verificationController.js.map