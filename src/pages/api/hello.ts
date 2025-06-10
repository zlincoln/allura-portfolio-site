import type { APIRoute } from 'astro';

export const get: APIRoute = async () => {
  return new Response(
    JSON.stringify({ message: 'Hello from API!' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const post: APIRoute = async ({ request }) => {
  const data = await request.json();
  return new Response(
    JSON.stringify({ 
      message: 'Received your data!',
      data 
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
