import { sequence } from 'astro:middleware';
import type { MiddlewareHandler } from 'astro';

// Handle API routes in development
const handleApiRoutes: MiddlewareHandler = async ({ request, url }, next) => {
  // Only handle API routes in development
  if (import.meta.env.DEV && url.pathname.startsWith('/api/')) {
    console.log(`Handling API route: ${url.pathname}`);
    
    try {
      // Remove the leading /api/ and .ts extension if present
      const apiPath = url.pathname
        .replace(/^\/api\//, '')
        .replace(/\.ts$/, '');
      
      // Import the API handler dynamically
      const module = await import(/* @vite-ignore */ `./pages/api/${apiPath}.ts`);
      
      // Handle different HTTP methods
      const method = request.method.toLowerCase();
      const handler = module[method] || module.default;
      
      if (typeof handler === 'function') {
        return handler({ request, url });
      }
      
      return new Response('Method not allowed', { status: 405 });
    } catch (error) {
      console.error('Error in API route:', error);
      return new Response(JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  // Continue to the next middleware/route handler
  return next();


};

export const onRequest = sequence(handleApiRoutes);
