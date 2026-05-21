import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

export class AuthService {
  async register(email, password, name) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      const error = new Error('User with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    const token = this.generateToken(user.id, user.email, user.role);

    return { user, token };
  }

  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = this.generateToken(user.id, user.email, user.role);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  generateToken(userId, email, role) {
    return jwt.sign({ userId, email, role }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
  }
}

export const authService = new AuthService();
