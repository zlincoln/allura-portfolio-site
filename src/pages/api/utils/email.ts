export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/accounts/email-routes/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: 'no-reply@allura-lincoln.com',
          name: 'Allura Lincoln'
        },
        to: {
          email: to,
          name: 'Recipient'
        },
        subject,
        text: body
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to send email:', error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
