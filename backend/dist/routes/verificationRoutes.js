"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verificationController_1 = require("../controllers/verificationController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authMiddleware);
router.post('/:candidateId/aadhaar', verificationController_1.verificationController.verifyAadhaar);
router.post('/:candidateId/pan', verificationController_1.verificationController.verifyPan);
router.get('/:candidateId/status', verificationController_1.verificationController.getStatus);
exports.default = router;
//# sourceMappingURL=verificationRoutes.js.map