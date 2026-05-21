"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateController = exports.CandidateController = exports.updateCandidateSchema = exports.createCandidateSchema = void 0;
const zod_1 = require("zod");
const candidateService_1 = require("../services/candidateService");
exports.createCandidateSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
    dateOfBirth: zod_1.z.string().datetime({ precision: 3 }).or(zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')),
    aadhaarNumber: zod_1.z.string().regex(/^[0-9]{12}$/, 'Aadhaar number must be exactly 12 digits'),
    panNumber: zod_1.z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format'),
    address: zod_1.z.string().min(5),
});
exports.updateCandidateSchema = exports.createCandidateSchema.partial();
class CandidateController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.userId;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search;
            const status = req.query.status;
            const result = await candidateService_1.candidateService.getAll(userId, { page, limit, search, status });
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            const candidate = await candidateService_1.candidateService.getById(id, userId);
            res.status(200).json(candidate);
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const userId = req.user.userId;
            const candidate = await candidateService_1.candidateService.create(userId, req.body);
            res.status(201).json(candidate);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            const candidate = await candidateService_1.candidateService.update(id, userId, req.body);
            res.status(200).json(candidate);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            await candidateService_1.candidateService.delete(id, userId);
            res.status(200).json({ message: 'Candidate deleted successfully' });
        }
        catch (error) {
            next(error);
        }
    }
    async getStats(req, res, next) {
        try {
            const userId = req.user.userId;
            const stats = await candidateService_1.candidateService.getStats(userId);
            res.status(200).json(stats);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CandidateController = CandidateController;
exports.candidateController = new CandidateController();
//# sourceMappingURL=candidateController.js.map