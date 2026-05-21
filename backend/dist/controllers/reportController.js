"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportController = exports.ReportController = void 0;
const reportService_1 = require("../services/reportService");
class ReportController {
    async getReport(req, res, next) {
        try {
            const userId = req.user.userId;
            const { candidateId } = req.params;
            const pdfBuffer = await reportService_1.reportService.generateReport(candidateId, userId);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=vshield-report-${candidateId}.pdf`);
            res.send(pdfBuffer);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ReportController = ReportController;
exports.reportController = new ReportController();
//# sourceMappingURL=reportController.js.map