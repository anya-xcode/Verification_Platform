"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskAadhaar = maskAadhaar;
exports.maskPan = maskPan;
exports.formatDate = formatDate;
exports.generateRefId = generateRefId;
/**
 * Mask Aadhaar number: show only last 4 digits
 * Input: "123456789012" → Output: "XXXX XXXX 9012"
 */
function maskAadhaar(aadhaar) {
    const cleaned = aadhaar.replace(/\s/g, '');
    if (cleaned.length !== 12)
        return 'XXXX XXXX XXXX';
    const last4 = cleaned.slice(-4);
    return `XXXX XXXX ${last4}`;
}
/**
 * Mask PAN number: show first 2 and last 2 characters
 * Input: "ABCDE1234F" → Output: "AB******4F"
 */
function maskPan(pan) {
    const cleaned = pan.replace(/\s/g, '').toUpperCase();
    if (cleaned.length !== 10)
        return '**********';
    return `${cleaned.slice(0, 2)}******${cleaned.slice(-2)}`;
}
/**
 * Format date to readable string
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}
/**
 * Generate a random reference ID
 */
function generateRefId(prefix = 'VS') {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
}
//# sourceMappingURL=masking.js.map