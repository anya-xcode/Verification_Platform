"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(email, password, name) {
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            const error = new Error('User with this email already exists');
            error.statusCode = 409;
            throw error;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, config_1.config.bcryptRounds);
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
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
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
        return jsonwebtoken_1.default.sign({ userId, email, role }, config_1.config.jwtSecret, {
            expiresIn: config_1.config.jwtExpiresIn,
        });
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=authService.js.map