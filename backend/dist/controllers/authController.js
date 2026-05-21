"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const zod_1 = require("zod");
const authService_1 = require("../services/authService");
const registerSchema = zod_1.z.zodSchema ? zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
}) : zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().min(2),
});
class AuthController {
    async register(req, res, next) {
        try {
            const { email, password, name } = req.body;
            const result = await authService_1.authService.register(email, password, name);
            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService_1.authService.login(email, password);
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map