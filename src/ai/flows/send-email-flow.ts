'use server';
/**
 * @fileOverview This file defines a Genkit flow for sending an email using SendGrid.
 *
 * It exports:
 * - `sendEmail`: An async function that sends an email.
 * - `SendEmailInput`: The input type for the `sendEmail` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import sgMail from '@sendgrid/mail';

const SendEmailInputSchema = z.object({
  to: z.string().email().describe('The email address of the recipient.'),
  subject: z.string().describe('The subject of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});
export type SendEmailInput = z.infer<typeof SendEmailInputSchema>;

export async function sendEmail(input: SendEmailInput): Promise<{ success: boolean; message: string }> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: SendEmailInputSchema,
    outputSchema: z.object({
        success: z.boolean(),
        message: z.string(),
    }),
  },
  async (input) => {
    // IMPORTANT: You need to set your SendGrid API Key as an environment variable.
    // Create a .env file in the root of your project and add:
    // SENDGRID_API_KEY='YOUR_SENDGRID_API_KEY'
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set.');
      return { success: false, message: 'Email service is not configured.' };
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: input.to,
      // IMPORTANT: You must verify a sender email address in your SendGrid account.
      from: 'syedsubhanhussain.sih@gmail.com', 
      subject: input.subject,
      html: input.body,
    };

    try {
      await sgMail.send(msg);
      return { success: true, message: 'Email sent successfully.' };
    } catch (error: any) {
      console.error('SendGrid Error:', error.response?.body || error.message);
      return { success: false, message: 'Failed to send email.' };
    }
  }
);
