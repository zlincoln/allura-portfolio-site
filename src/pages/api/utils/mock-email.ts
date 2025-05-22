export async function sendEmail(data: { name: string; email: string; message: string }) {
  // Mock email sending for local development
  console.log('Mock email sent to:', process.env.CONTACT_EMAIL);
  console.log('From:', `contact@${process.env.SITE_DOMAIN || 'allura-lincoln.com'}`);
  console.log('Subject: New Contact Form Submission');
  console.log('Message:', `
    Name: ${data.name}
    Email: ${data.email}
    Message: ${data.message}
  `);
  
  return {
    success: true,
    message: 'Email sent successfully (mock)'
  };
}
