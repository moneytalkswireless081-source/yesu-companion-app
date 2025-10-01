import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Bell } from 'lucide-react';

export const TestNotifications = () => {
  const [title, setTitle] = useState('Test Notification');
  const [body, setBody] = useState('This is a test notification from YesuApp');
  const [targetType, setTargetType] = useState<'broadcast' | 'user'>('broadcast');
  const [targetUserId, setTargetUserId] = useState('');
  const [route, setRoute] = useState('/daily');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const sendTestNotification = async () => {
    if (!title || !body) {
      toast({
        title: 'Error',
        description: 'Please fill in title and body',
        variant: 'destructive',
      });
      return;
    }

    if (targetType === 'user' && !targetUserId) {
      toast({
        title: 'Error',
        description: 'Please provide a user ID for targeted notification',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: {
          title,
          body,
          data: {
            route,
          },
          targetType,
          targetUserId: targetType === 'user' ? targetUserId : undefined,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: `Notification sent to ${data.sent} device(s)`,
      });

      console.log('Notification result:', data);
    } catch (error: any) {
      console.error('Error sending notification:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send notification',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const sendDailyScriptureNotification = async () => {
    setIsSending(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: {
          title: 'Daily Scripture',
          body: 'Your daily scripture is ready! Open YesuApp to read today\'s verse.',
          data: {
            route: '/daily',
          },
          targetType: 'broadcast',
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: `Daily scripture notification sent to ${data.sent} device(s)`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send notification',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Test Push Notifications
          </CardTitle>
          <CardDescription>
            Send test push notifications to users. Make sure FCM is properly configured.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Notification Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Notification Body</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter notification message"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="route">Navigation Route (optional)</Label>
            <Input
              id="route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              placeholder="/daily"
            />
            <p className="text-xs text-muted-foreground">
              Where to navigate when notification is tapped
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetType">Target Type</Label>
            <Select value={targetType} onValueChange={(value: 'broadcast' | 'user') => setTargetType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="broadcast">Broadcast (All Users)</SelectItem>
                <SelectItem value="user">Specific User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {targetType === 'user' && (
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                placeholder="Enter user UUID"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={sendTestNotification}
              disabled={isSending}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : 'Send Test Notification'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Send pre-configured notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            onClick={sendDailyScriptureNotification}
            disabled={isSending}
            variant="outline"
            className="w-full"
          >
            <Bell className="h-4 w-4 mr-2" />
            Send Daily Scripture Notification
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Devices</CardTitle>
          <CardDescription>View devices registered for push notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <DeviceTokensList />
        </CardContent>
      </Card>
    </div>
  );
};

const DeviceTokensList = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDevices = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('device_tokens')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevices(data || []);
    } catch (error) {
      console.error('Error loading devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={loadDevices} disabled={isLoading} variant="outline" size="sm">
        {isLoading ? 'Loading...' : 'Refresh Device List'}
      </Button>

      {devices.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {devices.length} active device(s) registered
          </p>
          <div className="space-y-2">
            {devices.map((device) => (
              <div
                key={device.id}
                className="p-3 border rounded-lg text-sm space-y-1"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">{device.platform}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(device.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  Token: {device.token.substring(0, 20)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No devices registered yet</p>
      )}
    </div>
  );
};
