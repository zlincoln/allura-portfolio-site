import { z } from 'zod';
import { sendEmail } from './utils/mock-email';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const result = formSchema.safeParse(data);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Invalid form data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Send email using mock in development, Cloudflare Email Routing in production
    if (import.meta.env.DEV) {
      const mockResult = await sendEmail({
        name: data.name as string,
        email: data.email as string,
        message: data.message as string
      });
      if (!mockResult.success) {
        return new Response(JSON.stringify({ error: 'Failed to send email' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Production email sending
    const response = await fetch('https://api.cloudflare.com/client/v4/accounts/email-routes/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: `no-reply@${process.env.SITE_DOMAIN || 'allura-lincoln.com'}`,
          name: 'Allura\'s Support Team'
        },
        to: {
          email: process.env.CONTACT_EMAIL!,
          name: 'Allura Lincoln'
        },
        subject: data.subject as string,
        text: `
          Name: ${data.name}
          Email: ${data.email}
          Message: ${data.message}
        `
      }),
    });

    if (!response.ok) {
      console.error('Cloudflare Email Routing error:', await response.text());
      return new Response(JSON.stringify({ error: 'Failed to send email' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
