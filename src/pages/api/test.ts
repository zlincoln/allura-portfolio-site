import type { APIRoute } from 'astro';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const get: APIRoute = async () => {
  return new Response(
    JSON.stringify({ message: 'Test endpoint is working!' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};

export const post: APIRoute = async ({ request }) => {
  let data;
  try {
    data = await request.json();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid JSON';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }

  return new Response(
    JSON.stringify({ 
      message: 'POST request received!',
      data,
      timestamp: new Date().toISOString()
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    }
  );
};

export const options: APIRoute = () => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
};
