import { sendEmail as sendEmailCloudflare } from 'cloudflare-email-sending';

export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  // Use Cloudflare's email sending service to send the email
  await sendEmailCloudflare({
    to,
    subject,
    body,
    from: 'no-reply@allura-lincoln.com',
  });
  return { success: true };
}
