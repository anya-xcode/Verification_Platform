import { generateRefId } from './masking.js';

/**
 * Simulate network delay (200-500ms)
 */
function simulateDelay() {
  const delay = Math.floor(Math.random() * 300) + 200;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Mock Aadhaar Verification API
 * 80% success rate, simulates UIDAI verification
 */
export async function mockAadhaarVerification(aadhaarNumber, fullName) {
  await simulateDelay();

  const isSuccess = Math.random() < 0.8;
  const referenceId = generateRefId('AAD');

  if (isSuccess) {
    return {
      success: true,
      verified: true,
      message: 'Aadhaar verification successful. Identity confirmed.',
      referenceId,
      details: {
        nameMatch: true,
        aadhaarValid: true,
        demographicMatch: 'EXACT',
        source: 'UIDAI',
        verificationMode: 'DEMOGRAPHIC',
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    verified: false,
    message: 'Aadhaar verification failed. Details could not be verified.',
    referenceId,
    details: {
      nameMatch: false,
      aadhaarValid: true,
      demographicMatch: 'MISMATCH',
      source: 'UIDAI',
      reason: 'Demographic details do not match records',
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Mock PAN Verification API
 * 80% success rate, simulates NSDL/ITD verification
 */
export async function mockPanVerification(panNumber, fullName) {
  await simulateDelay();

  const isSuccess = Math.random() < 0.8;
  const referenceId = generateRefId('PAN');

  if (isSuccess) {
    return {
      success: true,
      verified: true,
      message: 'PAN verification successful. Identity confirmed.',
      referenceId,
      details: {
        nameMatch: true,
        panValid: true,
        panStatus: 'ACTIVE',
        category: 'INDIVIDUAL',
        source: 'NSDL',
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    verified: false,
    message: 'PAN verification failed. Details could not be verified.',
    referenceId,
    details: {
      nameMatch: false,
      panValid: true,
      panStatus: 'ACTIVE',
      source: 'NSDL',
      reason: 'Name does not match PAN records',
    },
    timestamp: new Date().toISOString(),
  };
}
