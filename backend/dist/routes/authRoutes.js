"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const authController_1 = require("../controllers/authController");
const validate_1 = require("../middleware/validate");
const rateLimiter_1 = require("../middleware/rateLimiter");
const router = (0, express_1.Router)();
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long'),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
router.post('/register', rateLimiter_1.authLimiter, (0, validate_1.validate)(registerSchema), authController_1.authController.register);
router.post('/login', rateLimiter_1.authLimiter, (0, validate_1.validate)(loginSchema), authController_1.authController.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map