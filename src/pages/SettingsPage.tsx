import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Bell,
  Moon,
  Sun,
  Palette,
  Type,
  Globe,
  Wifi,
  WifiOff,
  Heart,
  MessageSquare,
  Mail,
  Phone,
  User,
  Settings2,
  Bookmark,
  Award,
  Clock
} from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage = () => {
  const { 
    settings, 
    notifications, 
    updateSettings, 
    updateNotifications,
    user,
    isOffline
  } = useAppStore();
  const { toast } = useToast();

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    updateNotifications({ [key]: !notifications[key] });
    toast({
      title: "Settings Updated",
      description: `${key} ${!notifications[key] ? 'enabled' : 'disabled'}`
    });
  };

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
    
    // Apply font size immediately to document
    if (key === 'fontSize') {
      const fontSizeClasses = {
        small: '14px',
        medium: '16px', 
        large: '18px'
      };
      document.documentElement.style.fontSize = fontSizeClasses[value as keyof typeof fontSizeClasses];
    }
    
    toast({
      title: "Settings Updated",
      description: `${key} changed successfully`
    });
  };

  const handleSuggestImprovement = () => {
    const subject = encodeURIComponent("YesuApp - Suggestion for Improvement");
    const body = encodeURIComponent(`Hi Henry,

I've been using YesuApp and would like to suggest an improvement:

[Please describe your suggestion here]

Best regards,
${user?.displayName || 'A YesuApp User'}`);
    
    window.open(`mailto:zoekisekka@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'spiritual', label: 'Spiritual', icon: Heart },
    { value: 'modern', label: 'Modern', icon: Palette },
    { value: 'auto', label: 'Auto', icon: Settings2 }
  ];

  const gamificationStats = {
    bookmarks: 12,
    streakDays: 7,
    completedPlans: 3,
    badges: ['Early Bird', 'Scripture Student', 'Community Helper']
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your YesuApp experience</p>
      </div>

      {/* User Profile */}
      {user && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {user.displayName || 'Anonymous User'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user.email || 'Guest Account'}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Notifications</p>
              <p className="text-sm text-muted-foreground">Daily scripture at {notifications.dailyTime}</p>
            </div>
            <Switch
              checked={notifications.dailyNotifications}
              onCheckedChange={() => handleNotificationToggle('dailyNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Community Updates</p>
              <p className="text-sm text-muted-foreground">New posts and replies</p>
            </div>
            <Switch
              checked={notifications.communityUpdates}
              onCheckedChange={() => handleNotificationToggle('communityUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Event Reminders</p>
              <p className="text-sm text-muted-foreground">Upcoming church events</p>
            </div>
            <Switch
              checked={notifications.eventReminders}
              onCheckedChange={() => handleNotificationToggle('eventReminders')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Theme Selection */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Theme & Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-foreground mb-3">Theme</p>
            <div className="grid grid-cols-2 gap-2">
              {themeOptions.map((theme) => {
                const Icon = theme.icon;
                return (
                  <Button
                    key={theme.value}
                    variant={settings.theme === theme.value ? 'default' : 'outline'}
                    onClick={() => handleSettingChange('theme', theme.value)}
                    className="justify-start h-auto p-3"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{theme.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-primary" />
            App Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Type className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Font Size</p>
                <p className="text-sm text-muted-foreground">Scripture reading comfort</p>
              </div>
            </div>
            <div className="flex gap-1">
              {['small', 'medium', 'large'].map((size) => (
                <Button
                  key={size}
                  size="sm"
                  variant={settings.fontSize === size ? 'default' : 'outline'}
                  onClick={() => handleSettingChange('fontSize', size)}
                  className="px-3"
                >
                  {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Language</p>
                <p className="text-sm text-muted-foreground">Currently: English</p>
              </div>
            </div>
            <Badge variant="secondary">Coming Soon</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isOffline ? 
                <WifiOff className="h-5 w-5 text-muted-foreground" /> : 
                <Wifi className="h-5 w-5 text-muted-foreground" />
              }
              <div>
                <p className="font-medium text-foreground">Offline Mode</p>
                <p className="text-sm text-muted-foreground">Cache content for offline use</p>
              </div>
            </div>
            <Switch
              checked={settings.offlineMode}
              onCheckedChange={(checked) => handleSettingChange('offlineMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gamification */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-secondary" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <Bookmark className="h-6 w-6 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{gamificationStats.bookmarks}</p>
              <p className="text-xs text-muted-foreground">Bookmarks</p>
            </div>
            <div className="text-center p-3 bg-secondary/5 rounded-lg">
              <Clock className="h-6 w-6 text-secondary mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{gamificationStats.streakDays}</p>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
          </div>
          
          <div>
            <p className="font-medium text-foreground mb-2">Your Badges</p>
            <div className="flex flex-wrap gap-2">
              {gamificationStats.badges.map((badge, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  <Award className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Completed {gamificationStats.completedPlans} study plans
            </p>
            <Button variant="outline" size="sm">
              View All Achievements
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-secondary" />
            About YesuApp
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">YesuApp</h3>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-foreground mb-3">Developer</h4>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Kisekka Henry</strong>
              </p>
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('mailto:zoekisekka@gmail.com', '_blank')}
                  className="justify-start"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  zoekisekka@gmail.com
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('tel:+256701709077', '_blank')}
                  className="justify-start"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +256 701 709 077
                </Button>
              </div>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleSuggestImprovement}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Suggest Improvements
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="shadow-card">
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          <p>Built with ❤️ for the Kingdom of God</p>
          <p className="mt-1">© 2024 YesuApp. All rights reserved.</p>
        </CardContent>
      </Card>
    </div>
  );
};