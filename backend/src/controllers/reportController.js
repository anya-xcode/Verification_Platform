import { reportService } from '../services/reportService.js';

export class ReportController {
  async getReport(req, res, next) {
    try {
      const userId = req.user.userId;
      const candidateId = req.params.candidateId;

      const pdfBuffer = await reportService.generateReport(candidateId, userId);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=vshield-report-${candidateId}.pdf`);
      res.send(pdfBuffer);
    } catch (error) {
      next(error);
    }
  }
}

export const reportController = new ReportController();
