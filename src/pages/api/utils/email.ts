export async function sendEmail({ to, subject, body }: { to: string; subject: string; body: string }) {
  try {
    if (!process.env.CLOUDFLARE_API_KEY) {
      throw new Error('CLOUDFLARE_API_KEY is not set');
    }
    if (!process.env.CLOUDFLARE_ACCOUNT_ID) {
      throw new Error('CLOUDFLARE_ACCOUNT_ID is not set');
    }

    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/email-routes/messages`, {
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

    const responseData = await response.json();
    if (!response.ok) {
      console.error('Failed to send email:', responseData);
      return { 
        success: false, 
        error: 'Failed to send email', 
        details: responseData.errors?.[0]?.message || 'Unknown error'
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: 'Failed to send email', 
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
