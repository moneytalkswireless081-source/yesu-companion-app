import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, any>;
  targetType: 'user' | 'broadcast';
  targetUserId?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const fcmServerKey = Deno.env.get('FCM_SERVER_KEY');

    if (!fcmServerKey) {
      throw new Error('FCM_SERVER_KEY is not configured');
    }

    const { createClient } = await import('jsr:@supabase/supabase-js@2');
    const supabase = createClient(supabaseUrl, supabaseKey);

    const payload: NotificationPayload = await req.json();
    console.log('Received notification request:', payload);

    // Validate payload
    if (!payload.title || !payload.body || !payload.targetType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, body, targetType' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get device tokens based on target type
    let tokensQuery = supabase
      .from('device_tokens')
      .select('token, user_id, platform')
      .eq('is_active', true);

    if (payload.targetType === 'user' && payload.targetUserId) {
      tokensQuery = tokensQuery.eq('user_id', payload.targetUserId);
    }

    const { data: tokens, error: tokensError } = await tokensQuery;

    if (tokensError) {
      console.error('Error fetching tokens:', tokensError);
      throw tokensError;
    }

    if (!tokens || tokens.length === 0) {
      console.log('No device tokens found for target');
      return new Response(
        JSON.stringify({ message: 'No devices to send notification to', sent: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${tokens.length} device tokens`);

    // Send notifications via FCM
    let successCount = 0;
    const failedTokens: string[] = [];

    for (const device of tokens) {
      try {
        const fcmPayload = {
          to: device.token,
          notification: {
            title: payload.title,
            body: payload.body,
            sound: 'default',
          },
          data: payload.data || {},
          priority: 'high',
        };

        const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
          method: 'POST',
          headers: {
            'Authorization': `key=${fcmServerKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fcmPayload),
        });

        const fcmResult = await fcmResponse.json();
        console.log(`FCM response for token ${device.token.substring(0, 10)}...`, fcmResult);

        if (fcmResult.success === 1) {
          successCount++;
        } else {
          console.error(`Failed to send to token ${device.token}:`, fcmResult);
          failedTokens.push(device.token);
          
          // If token is invalid, mark it as inactive
          if (fcmResult.results && fcmResult.results[0]?.error === 'InvalidRegistration') {
            await supabase
              .from('device_tokens')
              .update({ is_active: false })
              .eq('token', device.token);
          }
        }
      } catch (error) {
        console.error(`Error sending notification to ${device.token}:`, error);
        failedTokens.push(device.token);
      }
    }

    // Log notification in database
    const { error: logError } = await supabase
      .from('notifications_log')
      .insert({
        title: payload.title,
        body: payload.body,
        data: payload.data || {},
        target_type: payload.targetType,
        target_user_id: payload.targetUserId || null,
        sent_count: successCount,
        status: successCount > 0 ? 'sent' : 'failed',
      });

    if (logError) {
      console.error('Error logging notification:', logError);
    }

    return new Response(
      JSON.stringify({
        message: 'Notifications sent',
        sent: successCount,
        failed: failedTokens.length,
        total: tokens.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in send-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
