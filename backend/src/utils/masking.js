/**
 * Mask Aadhaar number: show only last 4 digits
 * Input: "123456789012" → Output: "XXXX XXXX 9012"
 */
export function maskAadhaar(aadhaar) {
  if (!aadhaar) return 'XXXX XXXX XXXX';
  const cleaned = aadhaar.replace(/\s/g, '');
  if (cleaned.length !== 12) return 'XXXX XXXX XXXX';
  const last4 = cleaned.slice(-4);
  return `XXXX XXXX ${last4}`;
}

/**
 * Mask PAN number: show first 2 and last 2 characters
 * Input: "ABCDE1234F" → Output: "AB******4F"
 */
export function maskPan(pan) {
  if (!pan) return '**********';
  const cleaned = pan.replace(/\s/g, '').toUpperCase();
  if (cleaned.length !== 10) return '**********';
  return `${cleaned.slice(0, 2)}******${cleaned.slice(-2)}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

/**
 * Generate a random reference ID
 */
export function generateRefId(prefix = 'VS') {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
