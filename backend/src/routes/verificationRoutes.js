import { Router } from 'express';
import { verificationController } from '../controllers/verificationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

// Supports: POST /api/verify/:candidateId/aadhaar  AND  POST /api/verification/aadhaar/:candidateId
router.post('/:candidateId/aadhaar', verificationController.verifyAadhaar);
router.post('/:candidateId/pan', verificationController.verifyPan);
router.get('/:candidateId/status', verificationController.getStatus);

// Frontend calls POST /api/verification/aadhaar/:candidateId
router.post('/aadhaar/:candidateId', verificationController.verifyAadhaar);
router.post('/pan/:candidateId', verificationController.verifyPan);

export default router;
