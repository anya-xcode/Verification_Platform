import { authService } from '../services/authService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, name } = req.body;
      const result = await authService.register(email, password, name);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async me(req, res, next) {
    try {
      const userId = req.user.userId;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
