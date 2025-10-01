import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestNotifications } from '@/components/admin/TestNotifications';
import { 
  Shield,
  Users,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Send,
  AlertTriangle
} from 'lucide-react';

export const AdminPage = () => {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pendingPosts = [
    {
      id: 1,
      type: 'prayer',
      title: 'Prayer for healing',
      author: 'John D.',
      content: 'Please pray for my mother who is in the hospital...',
      timestamp: '2 hours ago',
      reports: 0
    },
    {
      id: 2,
      type: 'testimony',
      title: 'God answered my prayers',
      author: 'Grace M.',
      content: 'I want to share how God blessed me with a new job...',
      timestamp: '5 hours ago',
      reports: 1
    },
    {
      id: 3,
      type: 'question',
      title: 'Understanding forgiveness',
      author: 'Anonymous',
      content: 'How do I forgive someone who hurt me deeply?',
      timestamp: '1 day ago',
      reports: 0
    }
  ];

  const reportedContent = [
    {
      id: 1,
      type: 'post',
      content: 'This content contains inappropriate language...',
      reporter: 'User123',
      reason: 'Inappropriate content',
      timestamp: '3 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      type: 'comment',
      content: 'Spam message with external links...',
      reporter: 'Grace K.',
      reason: 'Spam',
      timestamp: '1 day ago',
      status: 'pending'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      joinDate: '2024-01-15',
      posts: 12,
      status: 'active',
      lastSeen: '2 hours ago'
    },
    {
      id: 2,
      name: 'Grace Nakato',
      email: 'grace@example.com',
      joinDate: '2024-02-20',
      posts: 8,
      status: 'active',
      lastSeen: '1 day ago'
    },
    {
      id: 3,
      name: 'David Mukasa',
      email: 'david@example.com',
      joinDate: '2024-01-30',
      posts: 15,
      status: 'suspended',
      lastSeen: '1 week ago'
    }
  ];

  const analytics = {
    totalUsers: 10539,
    activeUsers: 6003,
    totalPosts: 7501,
    pendingModeration: 15,
    reportsToday: 3
  };

  const handleApprovePost = (postId: number) => {
    console.log('Approving post:', postId);
  };

  const handleRejectPost = (postId: number) => {
    console.log('Rejecting post:', postId);
  };

  const handleSendBroadcast = () => {
    if (broadcastMessage.trim()) {
      console.log('Sending broadcast:', {
        message: broadcastMessage,
        category: selectedCategory
      });
      setBroadcastMessage('');
    }
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user:`, userId);
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage content, users, and app settings</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{analytics.totalUsers}</p>
            <p className="text-xs text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-secondary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{analytics.totalPosts}</p>
            <p className="text-xs text-muted-foreground">Total Posts</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{analytics.activeUsers}</p>
            <p className="text-xs text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{analytics.pendingModeration}</p>
            <p className="text-xs text-muted-foreground">Pending Review</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{analytics.reportsToday}</p>
            <p className="text-xs text-muted-foreground">Reports Today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="moderation" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="moderation">Moderation</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="moderation" className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Content Moderation</h2>
          
          {/* Pending Posts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Pending Posts ({pendingPosts.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingPosts.map((post) => (
                <div key={post.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{post.type}</Badge>
                        <span className="text-sm text-muted-foreground">by {post.author}</span>
                        {post.reports > 0 && (
                          <Badge variant="destructive">{post.reports} reports</Badge>
                        )}
                      </div>
                      <h4 className="font-medium text-foreground">{post.title}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{post.content}</p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprovePost(post.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleRejectPost(post.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Reported Content */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Reported Content ({reportedContent.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reportedContent.map((report) => (
                <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="destructive">{report.type}</Badge>
                        <span className="text-sm text-muted-foreground">Reported by {report.reporter}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{report.reason}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{report.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{report.content}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="destructive">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                    <Button size="sm" variant="outline">
                      Dismiss Report
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">User Management</h2>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground">{user.name}</h4>
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {user.joinDate} • {user.posts} posts • Last seen {user.lastSeen}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {user.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleUserAction(user.id, 'suspend')}
                      >
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => handleUserAction(user.id, 'activate')}
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Content Management</h2>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Daily Scripture & Commentary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Manage Daily Scriptures
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Manage Commentaries
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Manage Prayers
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast" className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Push Notifications & Broadcasts</h2>
          
          <TestNotifications />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">App Settings</h2>
          
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Moderation Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto-approve posts</p>
                  <p className="text-sm text-muted-foreground">Posts are published immediately</p>
                </div>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Enable profanity filter</p>
                  <p className="text-sm text-muted-foreground">Automatically filter inappropriate content</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Allow anonymous posts</p>
                  <p className="text-sm text-muted-foreground">Users can post without revealing identity</p>
                </div>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};