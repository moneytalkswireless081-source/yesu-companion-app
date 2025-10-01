import { useEffect, useState } from 'react';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [notificationToken, setNotificationToken] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications only work on native platforms');
      return;
    }

    const initializePushNotifications = async () => {
      try {
        // Request permission
        const permissionResult = await PushNotifications.requestPermissions();
        console.log('Permission result:', permissionResult);

        if (permissionResult.receive === 'granted') {
          // Register for push notifications
          await PushNotifications.register();
          console.log('Push notifications registered');

          // Listen for registration success
          await PushNotifications.addListener('registration', async (token) => {
            console.log('Push registration success, token:', token.value);
            setNotificationToken(token.value);
            setIsRegistered(true);

            // Register token with Supabase
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
              try {
                const { error } = await supabase.functions.invoke('register-device-token', {
                  body: {
                    token: token.value,
                    platform: Capacitor.getPlatform(),
                    deviceInfo: {
                      model: await getDeviceInfo(),
                    },
                  },
                });

                if (error) {
                  console.error('Error registering token with Supabase:', error);
                } else {
                  console.log('Token registered with Supabase successfully');
                }
              } catch (err) {
                console.error('Failed to register token:', err);
              }
            } else {
              console.log('No active session, token will be registered after login');
            }
          });

          // Listen for registration errors
          await PushNotifications.addListener('registrationError', (error) => {
            console.error('Push registration error:', error);
            toast({
              title: 'Notification Error',
              description: 'Failed to register for push notifications',
              variant: 'destructive',
            });
          });

          // Listen for incoming notifications when app is open
          await PushNotifications.addListener('pushNotificationReceived', (notification) => {
            console.log('Push notification received:', notification);
            toast({
              title: notification.title || 'New Notification',
              description: notification.body || '',
            });
          });

          // Listen for notification tap (when app is in background/closed)
          await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
            console.log('Push notification action performed:', action);
            
            // Handle navigation based on notification data
            const data = action.notification.data;
            if (data && data.route) {
              // Navigate to specific route
              window.location.href = data.route;
            }
          });
        } else {
          console.log('Push notification permission not granted');
          toast({
            title: 'Notification Permission',
            description: 'Please enable notifications to receive updates',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error initializing push notifications:', error);
      }
    };

    initializePushNotifications();

    // Cleanup listeners on unmount
    return () => {
      PushNotifications.removeAllListeners();
    };
  }, [toast]);

  // Re-register token when user logs in
  useEffect(() => {
    const registerTokenOnAuth = async () => {
      if (notificationToken && isRegistered) {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          try {
            await supabase.functions.invoke('register-device-token', {
              body: {
                token: notificationToken,
                platform: Capacitor.getPlatform(),
                deviceInfo: {
                  model: await getDeviceInfo(),
                },
              },
            });
            console.log('Token re-registered after auth');
          } catch (err) {
            console.error('Failed to re-register token:', err);
          }
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        registerTokenOnAuth();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [notificationToken, isRegistered]);

  return {
    isRegistered,
    notificationToken,
  };
};

// Helper function to get device info
async function getDeviceInfo() {
  try {
    const { Device } = await import('@capacitor/device');
    const info = await Device.getInfo();
    return `${info.manufacturer} ${info.model}`;
  } catch {
    return 'Unknown Device';
  }
}
