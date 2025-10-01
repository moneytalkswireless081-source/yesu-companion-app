import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegisterTokenPayload {
  token: string;
  platform: 'android' | 'ios' | 'web';
  deviceInfo?: Record<string, any>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get user from authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const payload: RegisterTokenPayload = await req.json();
    console.log('Registering device token for user:', user.id);

    if (!payload.token || !payload.platform) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: token, platform' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if token already exists
    const { data: existingToken } = await supabase
      .from('device_tokens')
      .select('*')
      .eq('token', payload.token)
      .single();

    if (existingToken) {
      // Update existing token
      const { error: updateError } = await supabase
        .from('device_tokens')
        .update({
          user_id: user.id,
          platform: payload.platform,
          device_info: payload.deviceInfo || {},
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq('token', payload.token);

      if (updateError) {
        throw updateError;
      }

      return new Response(
        JSON.stringify({ message: 'Device token updated successfully' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // Insert new token
      const { error: insertError } = await supabase
        .from('device_tokens')
        .insert({
          user_id: user.id,
          token: payload.token,
          platform: payload.platform,
          device_info: payload.deviceInfo || {},
          is_active: true,
        });

      if (insertError) {
        throw insertError;
      }

      return new Response(
        JSON.stringify({ message: 'Device token registered successfully' }),
        { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in register-device-token function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
