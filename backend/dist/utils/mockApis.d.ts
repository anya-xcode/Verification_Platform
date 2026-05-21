import { MockVerificationResponse } from '../types';
/**
 * Mock Aadhaar Verification API
 * 80% success rate, simulates UIDAI verification
 */
export declare function mockAadhaarVerification(aadhaarNumber: string, fullName: string): Promise<MockVerificationResponse>;
/**
 * Mock PAN Verification API
 * 80% success rate, simulates NSDL/ITD verification
 */
export declare function mockPanVerification(panNumber: string, fullName: string): Promise<MockVerificationResponse>;
//# sourceMappingURL=mockApis.d.ts.map