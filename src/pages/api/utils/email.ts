import { sendEmail } from 'cloudflare-email-sending';

export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  // You'll need to set up your email sending service in Cloudflare
  // This is just a placeholder - replace with your actual email sending logic
  return sendEmail({
    to,
    subject,
    body,
    from: 'no-reply@allura-lincoln.com',
  });
}
