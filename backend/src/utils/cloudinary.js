import cloudinary from '../config/cloudinary.js';

/**
 * Uploads generated PDF report buffer to Cloudinary.
 * If credentials are not set, it gracefully falls back to a mock URL.
 * 
 * @param {Buffer} pdfBuffer - Generated PDFKit report buffer
 * @param {string} candidateId - Candidate identifier
 * @returns {Promise<string>} Secure URL of the uploaded report
 */
export function uploadReportToCloudinary(pdfBuffer, candidateId) {
  return new Promise((resolve, reject) => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.warn('[CLOUDINARY] Credentials missing in environment variables. Falling back to mock URL.');
      // Return a simulated Cloudinary URL
      resolve(`https://res.cloudinary.com/vshield-verification/raw/upload/v1716200000/reports/report-${candidateId}.pdf`);
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // PDF files should be uploaded as 'raw' resources
        public_id: `vshield/reports/report-${candidateId}`,
        overwrite: true,
        format: 'pdf',
      },
      (error, result) => {
        if (error) {
          console.error('[CLOUDINARY] Upload failed:', error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    // End stream by passing buffer
    uploadStream.end(pdfBuffer);
  });
}
