import { z } from 'zod';
import { candidateService } from '../services/candidateService.js';

export const createCandidateSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  dateOfBirth: z.string(),
  aadhaarNumber: z.string().regex(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits'),
  panNumber: z.string().regex(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, 'Invalid PAN format').transform(val => val.toUpperCase()),
  address: z.string().min(5),
});

export const updateCandidateSchema = createCandidateSchema.partial();

export class CandidateController {
  async getAll(req, res, next) {
    try {
      const userId = req.user.userId;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search;
      const status = req.query.status;

      const result = await candidateService.getAll(userId, { page, limit, search, status });
      res.status(200).json({ candidates: result.data, pagination: result.pagination });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const userId = req.user.userId;
      const id = req.params.id;
      const candidate = await candidateService.getById(id, userId);
      res.status(200).json({ candidate });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user.userId;
      const candidate = await candidateService.create(userId, req.body);
      res.status(201).json({ candidate });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userId = req.user.userId;
      const id = req.params.id;
      const candidate = await candidateService.update(id, userId, req.body);
      res.status(200).json({ candidate });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const userId = req.user.userId;
      const id = req.params.id;
      await candidateService.delete(id, userId);
      res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const userId = req.user.userId;
      const stats = await candidateService.getStats(userId);
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
}

export const candidateController = new CandidateController();
