import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Phone,
  Mail,
  MessageCircle,
  User,
  Clock,
  Calendar,
  Heart,
  Shield,
  Send,
  MessageSquare
} from 'lucide-react';

export const CounselingPage = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [showAnonymousChat, setShowAnonymousChat] = useState(false);
  const [requestForm, setRequestForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    anonymous: false
  });

  const pastors = [
    {
      id: 1,
      name: "Pastor John Kayemba",
      title: "Senior Pastor",
      specialties: ["Marriage Counseling", "Spiritual Guidance", "Crisis Intervention"],
      phone: "+256-701-123-456",
      email: "pastor.john@yesuapp.com",
      available: true,
      nextAvailable: "Today 2:00 PM",
      unreadMessages: 2
    },
    {
      id: 2,
      name: "Pastor Grace Nakato",
      title: "Associate Pastor",
      specialties: ["Youth Counseling", "Family Therapy", "Grief Support"],
      phone: "+256-702-789-012",
      email: "pastor.grace@yesuapp.com",
      available: false,
      nextAvailable: "Tomorrow 10:00 AM",
      unreadMessages: 0
    },
    {
      id: 3,
      name: "Pastor David Mukasa",
      title: "Counseling Pastor",
      specialties: ["Addiction Recovery", "Depression Support", "Relationship Issues"],
      phone: "+256-703-456-789",
      email: "pastor.david@yesuapp.com",
      available: true,
      nextAvailable: "Available now",
      unreadMessages: 1
    }
  ];

  const emergencyContacts = [
    {
      name: "Crisis Hotline",
      phone: "0800-111-111",
      description: "24/7 Crisis Support"
    },
    {
      name: "Mental Health Support",
      phone: "0800-222-222",
      description: "Professional Mental Health Line"
    }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle anonymous chat message
      console.log('Sending anonymous message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleRequestSubmit = () => {
    console.log('Submitting counseling request:', requestForm);
    // Reset form
    setRequestForm({
      name: '',
      email: '',
      phone: '',
      message: '',
      anonymous: false
    });
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Counseling & Pastoral Care</h1>
        <p className="text-muted-foreground">Connect with our pastoral team for guidance and support</p>
      </div>

      {/* Emergency Contacts */}
      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <Phone className="h-5 w-5" />
            Emergency Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
              <div>
                <p className="font-medium text-foreground">{contact.name}</p>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => window.open(`tel:${contact.phone}`, '_blank')}
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Anonymous Chat */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Anonymous Counseling Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showAnonymousChat ? (
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Start an anonymous chat session with our counseling team. 
                Your identity will remain completely confidential.
              </p>
              <Button 
                onClick={() => setShowAnonymousChat(true)}
                className="w-full"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Anonymous Chat
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg min-h-[200px]">
                <div className="space-y-3">
                  <div className="bg-primary/10 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hello! I'm here to listen and support you. How can I help today?</p>
                    <span className="text-xs text-muted-foreground">Pastor - just now</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                This chat is anonymous and confidential. Our counselors are here to help.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pastors & Counselors */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Our Pastoral Team</h2>
        {pastors.map((pastor) => (
          <Card key={pastor.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{pastor.name}</h3>
                    <Badge variant={pastor.available ? "default" : "secondary"}>
                      {pastor.available ? "Available" : "Busy"}
                    </Badge>
                    {pastor.unreadMessages > 0 && (
                      <Badge variant="destructive">
                        {pastor.unreadMessages} new
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{pastor.title}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {pastor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{pastor.nextAvailable}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(`tel:${pastor.phone}`, '_blank')}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => window.open(`mailto:${pastor.email}`, '_blank')}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Chat
                </Button>
                <Button size="sm" variant="secondary">
                  <Calendar className="h-4 w-4 mr-1" />
                  Book Session
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Counseling Request Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Request Counseling Session
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Name</label>
              <Input
                value={requestForm.name}
                onChange={(e) => setRequestForm({...requestForm, name: e.target.value})}
                placeholder="Your full name"
                disabled={requestForm.anonymous}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input
                value={requestForm.phone}
                onChange={(e) => setRequestForm({...requestForm, phone: e.target.value})}
                placeholder="+256-xxx-xxx-xxx"
                disabled={requestForm.anonymous}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              value={requestForm.email}
              onChange={(e) => setRequestForm({...requestForm, email: e.target.value})}
              placeholder="your.email@example.com"
              disabled={requestForm.anonymous}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">How can we help you?</label>
            <Textarea
              value={requestForm.message}
              onChange={(e) => setRequestForm({...requestForm, message: e.target.value})}
              placeholder="Please describe what you'd like to discuss..."
              rows={4}
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="anonymous"
              checked={requestForm.anonymous}
              onChange={(e) => setRequestForm({...requestForm, anonymous: e.target.checked})}
            />
            <label htmlFor="anonymous" className="text-sm text-foreground">
              Submit anonymously
            </label>
          </div>
          <Button onClick={handleRequestSubmit} className="w-full">
            Submit Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};