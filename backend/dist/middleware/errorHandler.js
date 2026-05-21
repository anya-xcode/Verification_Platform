"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error(`[ERROR] ${err.message}`, err.stack);
    // Prisma unique constraint violation
    if (err.code === 'P2002') {
        res.status(409).json({
            error: 'A record with this information already exists.',
        });
        return;
    }
    // Prisma record not found
    if (err.code === 'P2025') {
        res.status(404).json({
            error: 'Record not found.',
        });
        return;
    }
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 ? 'Internal server error' : err.message;
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
//# sourceMappingURL=errorHandler.js.map