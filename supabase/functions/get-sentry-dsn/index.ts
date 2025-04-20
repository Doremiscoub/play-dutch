
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-dutch-auth',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Verify the custom header for basic auth
    const dutchAuthHeader = req.headers.get('x-dutch-auth');
    
    if (dutchAuthHeader !== 'true') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: corsHeaders }
      );
    }

    // Get Sentry DSN from environment variable
    const sentryDsn = Deno.env.get('SENTRY_DSN');
    
    if (!sentryDsn) {
      console.error('SENTRY_DSN environment variable not set');
      return new Response(
        JSON.stringify({ error: 'Configuration error: DSN not available' }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Return the DSN as JSON
    return new Response(
      JSON.stringify({ dsn: sentryDsn }),
      { headers: corsHeaders, status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving Sentry DSN:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: corsHeaders, status: 500 }
    );
  }
});
