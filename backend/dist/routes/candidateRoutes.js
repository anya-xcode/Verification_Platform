"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const candidateController_1 = require("../controllers/candidateController");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const router = (0, express_1.Router)();
// Apply auth middleware to all routes
router.use(auth_1.authMiddleware);
router.get('/stats', candidateController_1.candidateController.getStats);
router.get('/', candidateController_1.candidateController.getAll);
router.get('/:id', candidateController_1.candidateController.getById);
router.post('/', (0, validate_1.validate)(candidateController_1.createCandidateSchema), candidateController_1.candidateController.create);
router.put('/:id', (0, validate_1.validate)(candidateController_1.updateCandidateSchema), candidateController_1.candidateController.update);
router.delete('/:id', candidateController_1.candidateController.delete);
exports.default = router;
//# sourceMappingURL=candidateRoutes.js.map