import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/components/email-templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

const sender = process.env.RESEND_SENDER_EMAIL;
const receiver = process.env.RESEND_RECIEVER_EMAIL;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    const { error } = await resend.emails.send({
      from: `${siteName} <${sender}>`,
      to: [`${receiver}`],
      subject: 'New Form Submission',
      react: EmailTemplate({ formData }),
    });

    if (error) { 
      return Response.json({ error }, { status: 500 }); 
    }
    
    return Response.json({ message: 'Message sent successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};