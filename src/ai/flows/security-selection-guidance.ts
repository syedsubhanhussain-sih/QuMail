'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing security level guidance based on message content and recipient.
 *
 * It exports:
 * - `getSecurityLevelGuidance`: An async function that takes message content and recipient as input and returns security level guidance.
 * - `SecurityLevelGuidanceInput`: The input type for the `getSecurityLevelGuidance` function.
 * - `SecurityLevelGuidanceOutput`: The output type for the `getSecurityLevelGuidance` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SecurityLevelGuidanceInputSchema = z.object({
  messageContent: z.string().describe('The content of the message being composed.'),
  recipient: z.string().describe('The email address of the recipient.'),
});
export type SecurityLevelGuidanceInput = z.infer<typeof SecurityLevelGuidanceInputSchema>;

const SecurityLevelGuidanceOutputSchema = z.object({
  guidance: z.string().describe('Guidance on which security level is most appropriate.'),
});
export type SecurityLevelGuidanceOutput = z.infer<typeof SecurityLevelGuidanceOutputSchema>;

export async function getSecurityLevelGuidance(
  input: SecurityLevelGuidanceInput
): Promise<SecurityLevelGuidanceOutput> {
  return securityLevelGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'securityLevelGuidancePrompt',
  input: {schema: SecurityLevelGuidanceInputSchema},
  output: {schema: SecurityLevelGuidanceOutputSchema},
  prompt: `You are an AI assistant that provides guidance on selecting the most appropriate security level for an email.

  Based on the message content and recipient, recommend one of the following security levels:
  - Quantum Secure - OTP: For highly sensitive information requiring maximum security.
  - Quantum-aided AES: For sensitive information that needs strong security against current and future threats.
  - PQC: For information that needs long-term security and resistance to quantum computing attacks.
  - No Quantum security: For non-sensitive, everyday communication.

  Message Content: {{{messageContent}}}
  Recipient: {{{recipient}}}

  Provide a brief explanation of why the recommended security level is appropriate for this specific message and recipient.
  Ensure that the output is a single sentence.
  Be concise and direct.
  The output should be geared toward a general audience with limited knowledge of Quantum security concepts.
`,
});

const securityLevelGuidanceFlow = ai.defineFlow(
  {
    name: 'securityLevelGuidanceFlow',
    inputSchema: SecurityLevelGuidanceInputSchema,
    outputSchema: SecurityLevelGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
