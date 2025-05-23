// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Define types for Cloudflare Email binding
type CloudflareEmail = {
  send: (message: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }) => Promise<{ success: boolean; error?: string }>;
};

// Helper function to create a JSON response
interface JsonResponseData {
  [key: string]: unknown;
  error?: string;
  details?: unknown;
  success?: boolean;
}

const jsonResponse = (data: JsonResponseData, status = 200, headers: Record<string, string> = {}) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
      ...headers,
    },
  });
};

// Define types for form data and validation results
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationSuccess {
  success: true;
  data: FormData;
  errors?: never;
}

interface ValidationError {
  success: false;
  errors: Record<string, string>;
  data?: never;
}

type ValidationResult = ValidationSuccess | ValidationError;

// Form validation function
function validateFormData(data: Record<string, unknown>): ValidationResult {
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const subject = String(data.subject || '').trim();
  const message = String(data.message || '').trim();
  
  const errors: Record<string, string> = {};
  
  if (!name) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
  if (!subject) errors.subject = 'Subject is required';
  if (!message) errors.message = 'Message is required';
  
  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }
  
  return { 
    success: true, 
    data: { name, email, subject, message } 
  };
}

// Cloudflare Pages Functions handler
// Define the Cloudflare Email binding type
declare const CLOUDFLARE_EMAIL: CloudflareEmail;

// Handle OPTIONS request for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: {
    CLOUDFLARE_EMAIL: CloudflareEmail;
  };
}): Promise<Response> {
  try {
    // Parse form data
    const formData = await context.request.formData();
    const data = Object.fromEntries(formData.entries());
    const result = validateFormData(data);

    if (!result.success) {
      return jsonResponse(
        { 
          error: 'Validation failed',
          details: result.errors
        },
        400
      );
    }

    // At this point, we know result.data exists because result.success is true
    const { data: formDataResult } = result;
    const { name, email, subject, message } = formDataResult;
    const recipient = 'contact@zacharylincoln.com';
    const domain = 'allura-lincoln.com';

    // Prepare email content
    const emailContent = `
      New contact form submission from ${name} (${email}):
      
      Subject: ${subject}
      
      Message:
      ${message}
      
      ---
      This email was sent from the contact form on ${domain}
    `;

    // Send email using Cloudflare's native email binding
    const emailResponse = await context.env.CLOUDFLARE_EMAIL.send({
      from: `no-reply@${domain}`,
      to: recipient,
      subject: `New Contact: ${subject}`,
      text: emailContent.trim()
    });

    if (!emailResponse.success) {
      console.error('Email sending failed:', emailResponse.error);
      return jsonResponse(
        { 
          error: 'Failed to send email',
          details: emailResponse.error || 'Unknown error'
        },
        500
      );
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error processing request:', error);
    return jsonResponse(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      500
    );
  }
};
