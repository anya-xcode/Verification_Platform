import { Router } from 'express';
import { candidateController, createCandidateSchema, updateCandidateSchema } from '../controllers/candidateController.js';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Support both /stats and /stats/summary for frontend compatibility
router.get('/stats', candidateController.getStats);
router.get('/stats/summary', candidateController.getStats);
router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById);
router.post('/', validate(createCandidateSchema), candidateController.create);
router.put('/:id', validate(updateCandidateSchema), candidateController.update);
router.delete('/:id', candidateController.delete);

export default router;
