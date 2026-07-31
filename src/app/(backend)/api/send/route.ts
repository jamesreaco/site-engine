import { z } from 'zod';
import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/components/email-templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = process.env.RESEND_SENDER_EMAIL;
const receiver = process.env.RESEND_RECIEVER_EMAIL;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

const formDataSchema = z
  .record(z.string().min(1).max(100), z.union([z.string().max(5000), z.number(), z.boolean()]))
  .refine((data) => Object.keys(data).length > 0, 'Form data cannot be empty')
  .refine((data) => Object.keys(data).length <= 30, 'Too many form fields');

export async function POST(request: NextRequest) {

  if (!process.env.RESEND_API_KEY || !sender || !receiver) {
    console.error('Send route is missing required environment variables (RESEND_API_KEY, RESEND_SENDER_EMAIL, RESEND_RECIEVER_EMAIL)');
    return Response.json(
      { error: 'Email service is not configured' }, 
      { status: 500 }
    );
  };

  let formData: z.infer<typeof formDataSchema>;

  try {
    formData = formDataSchema.parse(await request.json());
  } catch {
    return Response.json(
      { error: 'Invalid form data' }, 
      { status: 400 }
    );
  };

  try {
    const { error } = await resend.emails.send({
      from: `${siteName ?? 'Website'} <${sender}>`,
      to: [receiver],
      subject: 'New Form Submission',
      react: EmailTemplate({ formData }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json(
        { error: 'Failed to send message' }, 
        { status: 500 }
      );
    };

    return Response.json({ 
      message: 'Message sent successfully' 
    });

  } catch (error) {
    console.error('Send route error:', error);
    return Response.json(
      { error: 'Failed to send message' }, 
      { status: 500 }
    );
  };
};