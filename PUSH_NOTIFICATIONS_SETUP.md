# Push Notifications Setup Guide for YesuApp

## Overview
This guide explains how push notifications are integrated in YesuApp using Capacitor and Firebase Cloud Messaging (FCM).

## Architecture

### Components
1. **Database Tables**
   - `device_tokens`: Stores FCM device tokens for each user
   - `notifications_log`: Logs all sent notifications

2. **Edge Functions**
   - `send-notification`: Sends push notifications via FCM
   - `register-device-token`: Registers/updates device tokens

3. **Frontend Hook**
   - `usePushNotifications`: Manages push notification registration and listening

## Firebase Cloud Messaging (FCM) Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Add Android app to your Firebase project
   - Package name: `app.lovable.2cf022d16dd34cc18e1a962f8999f12d`
   - Download `google-services.json`

### 2. Get FCM Server Key
1. In Firebase Console, go to Project Settings
2. Navigate to "Cloud Messaging" tab
3. Copy the "Server key" (legacy)
4. Add this key to Supabase secrets as `FCM_SERVER_KEY`

### 3. Configure Android App
1. Place `google-services.json` in `android/app/` directory
2. Update `android/app/build.gradle`:
```gradle
dependencies {
    implementation platform('com.google.firebase:firebase-bom:32.7.0')
    implementation 'com.google.firebase:firebase-messaging'
}
```

3. Add to the bottom of the file:
```gradle
apply plugin: 'com.google.gms.google-services'
```

4. Update `android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

## Database Schema

### device_tokens Table
```sql
CREATE TABLE device_tokens (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  token TEXT UNIQUE NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('android', 'ios', 'web')),
  device_info JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### notifications_log Table
```sql
CREATE TABLE notifications_log (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  target_type TEXT CHECK (target_type IN ('user', 'broadcast')),
  target_user_id UUID REFERENCES auth.users(id),
  sent_count INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Supabase Edge Functions

### Edge Function URLs
- **Send Notification**: `https://fuiofiwsgtwnzrwwdalq.supabase.co/functions/v1/send-notification`
- **Register Device Token**: `https://fuiofiwsgtwnzrwwdalq.supabase.co/functions/v1/register-device-token`

### Required Secrets in Supabase
1. `FCM_SERVER_KEY` - Your Firebase Cloud Messaging server key

## Usage Examples

### 1. Send Notification to Single User

```typescript
import { supabase } from '@/integrations/supabase/client';

const sendUserNotification = async (userId: string) => {
  const { data, error } = await supabase.functions.invoke('send-notification', {
    body: {
      title: 'Daily Scripture',
      body: 'Your daily scripture is ready!',
      data: {
        route: '/daily',
        scriptureId: '123'
      },
      targetType: 'user',
      targetUserId: userId
    }
  });

  if (error) {
    console.error('Error sending notification:', error);
  } else {
    console.log('Notification sent:', data);
  }
};
```

### 2. Send Broadcast Notification

```typescript
const sendBroadcastNotification = async () => {
  const { data, error } = await supabase.functions.invoke('send-notification', {
    body: {
      title: 'New Event',
      body: 'Join us for our community gathering this Sunday!',
      data: {
        route: '/events',
        eventId: '456'
      },
      targetType: 'broadcast'
    }
  });

  if (error) {
    console.error('Error sending broadcast:', error);
  } else {
    console.log('Broadcast sent:', data);
  }
};
```

### 3. Test Notification from Supabase SQL Editor

```sql
-- Test sending a notification to all users
SELECT 
  net.http_post(
    url := 'https://fuiofiwsgtwnzrwwdalq.supabase.co/functions/v1/send-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SUPABASE_ANON_KEY'
    ),
    body := jsonb_build_object(
      'title', 'Test Notification',
      'body', 'This is a test notification',
      'targetType', 'broadcast'
    )
  ) as request_id;
```

## Frontend Integration

The push notification system is automatically initialized when the app starts via the `usePushNotifications` hook in `App.tsx`.

### How It Works

1. **Permission Request**: On first launch, the app requests notification permissions
2. **Token Registration**: Once permission is granted, the device token is registered with FCM
3. **Token Storage**: The token is sent to Supabase and stored in the `device_tokens` table
4. **Notification Listening**: The app listens for:
   - Foreground notifications (app is open)
   - Background notifications (app is in background)
   - Notification taps (opens the app)

### Notification Handling

```typescript
// When app is open (foreground)
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  // Show toast or custom UI
  console.log('Notification received:', notification);
});

// When notification is tapped (background/closed)
PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
  // Navigate to specific route
  const data = action.notification.data;
  if (data.route) {
    window.location.href = data.route;
  }
});
```

## Testing Push Notifications

### 1. Test on Android Emulator or Device
1. Build and run the app:
```bash
npm run build
npx cap sync android
npx cap run android
```

2. Grant notification permissions when prompted
3. Check console logs for the device token
4. Use the device token to send a test notification

### 2. Send Test Notification via curl
```bash
curl -X POST https://fuiofiwsgtwnzrwwdalq.supabase.co/functions/v1/send-notification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "title": "Test Notification",
    "body": "This is a test from curl",
    "targetType": "broadcast"
  }'
```

### 3. Check Notification Logs
```sql
-- View recent notifications
SELECT * FROM notifications_log 
ORDER BY created_at DESC 
LIMIT 10;

-- View active device tokens
SELECT * FROM device_tokens 
WHERE is_active = true;
```

## Scheduled Notifications (Daily Scripture)

To send daily notifications at a specific time, you can use Supabase's `pg_cron` extension:

```sql
-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily notification at 8:00 AM
SELECT cron.schedule(
  'daily-scripture-notification',
  '0 8 * * *', -- Every day at 8:00 AM
  $$
  SELECT net.http_post(
    url := 'https://fuiofiwsgtwnzrwwdalq.supabase.co/functions/v1/send-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SUPABASE_ANON_KEY'
    ),
    body := jsonb_build_object(
      'title', 'Daily Scripture',
      'body', 'Your daily scripture is ready!',
      'data', jsonb_build_object('route', '/daily'),
      'targetType', 'broadcast'
    )
  );
  $$
);
```

## Troubleshooting

### Common Issues

1. **Notifications not received**
   - Check if FCM_SERVER_KEY is properly configured
   - Verify device token is registered in database
   - Check Firebase Console for any errors
   - Ensure app has notification permissions

2. **Token registration fails**
   - Verify google-services.json is in correct location
   - Check Android build.gradle configuration
   - Ensure Supabase edge function is deployed

3. **Notifications work on emulator but not on device**
   - Make sure to build a signed APK/AAB for production
   - Check if Google Play Services is installed on device
   - Verify internet connectivity

### Debug Logs

Check edge function logs:
1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Click on function name
4. View logs for errors

### View Device Tokens
```sql
SELECT 
  dt.token,
  dt.platform,
  dt.is_active,
  dt.created_at,
  u.email
FROM device_tokens dt
LEFT JOIN auth.users u ON dt.user_id = u.id
ORDER BY dt.created_at DESC;
```

## Security Considerations

1. **RLS Policies**: Device tokens are protected by RLS - users can only access their own tokens
2. **Authentication**: The register-device-token function requires a valid JWT
3. **Token Validation**: Invalid tokens are automatically marked as inactive
4. **FCM Server Key**: Keep your FCM server key secure in Supabase secrets

## Production Checklist

- [ ] Firebase project created and configured
- [ ] FCM_SERVER_KEY added to Supabase secrets
- [ ] google-services.json added to Android project
- [ ] Build.gradle files updated with Firebase dependencies
- [ ] Edge functions deployed and tested
- [ ] Database tables created with proper RLS policies
- [ ] Notification permissions tested on real device
- [ ] Scheduled notifications configured (if needed)
- [ ] Error handling and logging implemented
- [ ] User notification preferences stored and respected

## Support Resources

- [Capacitor Push Notifications Docs](https://capacitorjs.com/docs/apis/push-notifications)
- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Supabase Database Docs](https://supabase.com/docs/guides/database)
