import { z } from 'zod';

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

    // Use Cloudflare Worker's native email functionality
    const emailOptions = {
      from: {
        email: `no-reply@${process.env.SITE_DOMAIN || 'allura-lincoln.com'}`,
        name: 'Alluras Support Team'
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
    };

    const emailResponse = await EMAIL.send(emailOptions);

    if (!emailResponse.ok) {
      console.error('Email sending error:', emailResponse.error);
      return new Response(JSON.stringify({ 
        error: 'Failed to send email',
        details: emailResponse.error
      }), {
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
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
