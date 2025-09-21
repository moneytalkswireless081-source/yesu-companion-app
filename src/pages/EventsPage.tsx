import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Bell,
  BellOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const events = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Join us for worship, prayer, and fellowship",
    date: new Date("2024-01-28T10:00:00"),
    location: "Main Sanctuary",
    type: "worship",
    attendees: 245,
    rsvpStatus: null,
    hasReminder: false
  },
  {
    id: 2,
    title: "Marriage Enrichment Workshop",
    description: "Strengthening relationships through biblical principles",
    date: new Date("2024-01-30T18:30:00"),
    location: "Fellowship Hall",
    type: "workshop",
    attendees: 38,
    rsvpStatus: "yes",
    hasReminder: true
  },
  {
    id: 3,
    title: "Youth Bible Study",
    description: "Exploring faith together with our young people",
    date: new Date("2024-02-02T19:00:00"),
    location: "Youth Center",
    type: "study",
    attendees: 22,
    rsvpStatus: null,
    hasReminder: false
  },
  {
    id: 4,
    title: "Community Outreach",
    description: "Serving our neighbors with love and compassion",
    date: new Date("2024-02-05T09:00:00"),
    location: "Community Center",
    type: "outreach",
    attendees: 67,
    rsvpStatus: "maybe",
    hasReminder: true
  }
];

const eventTypeColors = {
  worship: "bg-blue-100 text-blue-800",
  workshop: "bg-green-100 text-green-800",
  study: "bg-purple-100 text-purple-800",
  outreach: "bg-orange-100 text-orange-800"
};

export const EventsPage = () => {
  const [eventList, setEventList] = useState(events);
  const { toast } = useToast();

  const handleRSVP = (eventId: number, status: 'yes' | 'no' | 'maybe') => {
    setEventList(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, rsvpStatus: status }
          : event
      )
    );

    const statusText = status === 'yes' ? 'attending' : status === 'no' ? 'not attending' : 'maybe attending';
    toast({
      title: "RSVP Updated",
      description: `You've marked yourself as ${statusText}`
    });
  };

  const handleReminder = (eventId: number) => {
    setEventList(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, hasReminder: !event.hasReminder }
          : event
      )
    );

    const event = eventList.find(e => e.id === eventId);
    toast({
      title: event?.hasReminder ? "Reminder Removed" : "Reminder Set",
      description: event?.hasReminder 
        ? "You won't be reminded about this event"
        : "We'll remind you before this event starts"
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getRSVPIcon = (status: string | null) => {
    switch (status) {
      case 'yes':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'no':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'maybe':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <p className="text-muted-foreground">Stay connected with upcoming church events</p>
      </div>

      {/* Quick Stats */}
      <Card className="shadow-card gradient-sky">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">4</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">2</p>
              <p className="text-sm text-muted-foreground">RSVP'd</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-sm text-muted-foreground">Reminders</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="space-y-4">
        {eventList.map((event) => (
          <Card key={event.id} className="shadow-card hover:shadow-soft transition-smooth">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    {event.rsvpStatus && getRSVPIcon(event.rsvpStatus)}
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`ml-2 ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}
                >
                  {event.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Event Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(event.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                {/* RSVP Buttons */}
                <div className="flex gap-1 flex-1">
                  <Button
                    size="sm"
                    variant={event.rsvpStatus === 'yes' ? 'default' : 'outline'}
                    onClick={() => handleRSVP(event.id, 'yes')}
                    className="flex-1"
                  >
                    Going
                  </Button>
                  <Button
                    size="sm"
                    variant={event.rsvpStatus === 'maybe' ? 'default' : 'outline'}
                    onClick={() => handleRSVP(event.id, 'maybe')}
                    className="flex-1"
                  >
                    Maybe
                  </Button>
                  <Button
                    size="sm"
                    variant={event.rsvpStatus === 'no' ? 'default' : 'outline'}
                    onClick={() => handleRSVP(event.id, 'no')}
                    className="flex-1"
                  >
                    Can't Go
                  </Button>
                </div>

                {/* Reminder Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleReminder(event.id)}
                  className="px-3"
                >
                  {event.hasReminder ? (
                    <Bell className="h-4 w-4 text-primary" />
                  ) : (
                    <BellOff className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add to Calendar */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 mr-2" />
            Add Church Calendar to Your Device
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};