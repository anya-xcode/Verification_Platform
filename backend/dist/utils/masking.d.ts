/**
 * Mask Aadhaar number: show only last 4 digits
 * Input: "123456789012" → Output: "XXXX XXXX 9012"
 */
export declare function maskAadhaar(aadhaar: string): string;
/**
 * Mask PAN number: show first 2 and last 2 characters
 * Input: "ABCDE1234F" → Output: "AB******4F"
 */
export declare function maskPan(pan: string): string;
/**
 * Format date to readable string
 */
export declare function formatDate(date: Date): string;
/**
 * Generate a random reference ID
 */
export declare function generateRefId(prefix?: string): string;
//# sourceMappingURL=masking.d.ts.map