"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const candidateRoutes_1 = __importDefault(require("./routes/candidateRoutes"));
const verificationRoutes_1 = __importDefault(require("./routes/verificationRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const app = (0, express_1.default)();
// Security middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins for simplicity in development, configure properly in production
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Apply general rate limit to all routes
app.use(rateLimiter_1.generalLimiter);
// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
// App routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/candidates', candidateRoutes_1.default);
app.use('/api/verify', verificationRoutes_1.default);
app.use('/api/reports', reportRoutes_1.default);
// Global Error Handler
app.use(errorHandler_1.errorHandler);
app.listen(config_1.config.port, () => {
    console.log(`[SERVER] VShield API running on port ${config_1.config.port} in ${config_1.config.nodeEnv} mode`);
});
//# sourceMappingURL=index.js.map