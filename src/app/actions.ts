
'use server';

import {
  getSecurityLevelGuidance,
  type SecurityLevelGuidanceInput,
} from '@/ai/flows/security-selection-guidance';

export async function fetchSecurityGuidance(
  input: SecurityLevelGuidanceInput
): Promise<string> {
  try {
    const result = await getSecurityLevelGuidance(input);
    return result.guidance;
  } catch (error) {
    console.error('Error fetching security guidance:', error);
    return 'Could not retrieve guidance at this time.';
  }
}
