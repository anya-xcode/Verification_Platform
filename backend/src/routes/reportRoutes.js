import { Router } from 'express';
import { reportController } from '../controllers/reportController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/pdf/:candidateId', reportController.getReport);
router.get('/:candidateId', reportController.getReport);

export default router;
