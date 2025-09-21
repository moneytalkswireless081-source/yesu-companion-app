import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2cf022d16dd34cc18e1a962f8999f12d',
  appName: 'YesuApp',
  webDir: 'dist',
  server: {
    url: 'https://2cf022d1-6dd3-4cc1-8e1a-962f8999f12d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#488AFF',
      sound: 'beep.wav'
    }
  }
};

export default config;