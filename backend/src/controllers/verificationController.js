import { verificationService } from '../services/verificationService.js';
import { candidateService } from '../services/candidateService.js';

export class VerificationController {
  async verifyAadhaar(req, res, next) {
    try {
      const userId = req.user.userId;
      const candidateId = req.params.candidateId;
      const log = await verificationService.verifyAadhaar(candidateId, userId);
      const candidate = await candidateService.getById(candidateId, userId);
      res.status(200).json({ message: 'Aadhaar verification completed', log, candidate });
    } catch (error) {
      next(error);
    }
  }

  async verifyPan(req, res, next) {
    try {
      const userId = req.user.userId;
      const candidateId = req.params.candidateId;
      const log = await verificationService.verifyPan(candidateId, userId);
      const candidate = await candidateService.getById(candidateId, userId);
      res.status(200).json({ message: 'PAN verification completed', log, candidate });
    } catch (error) {
      next(error);
    }
  }

  async getStatus(req, res, next) {
    try {
      const userId = req.user.userId;
      const candidateId = req.params.candidateId;
      const status = await verificationService.getStatus(candidateId, userId);
      res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  }
}

export const verificationController = new VerificationController();
