import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Star, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const studyPlans = [
  {
    id: 1,
    title: "Walking with Jesus",
    description: "A 30-day journey through the life and teachings of Christ",
    duration: 30,
    progress: 12,
    category: "Discipleship",
    difficulty: "Beginner",
    participants: 1250
  },
  {
    id: 2,
    title: "Psalms of Hope",
    description: "Finding comfort and strength in David's words",
    duration: 14,
    progress: 0,
    category: "Comfort",
    difficulty: "All Levels",
    participants: 890
  },
  {
    id: 3,
    title: "Proverbs for Daily Living",
    description: "Practical wisdom for everyday decisions",
    duration: 21,
    progress: 7,
    category: "Wisdom",
    difficulty: "Intermediate",
    participants: 2100
  }
];

const recentStudies = [
  {
    title: "The Good Shepherd",
    verse: "John 10:11",
    lastRead: "2 hours ago"
  },
  {
    title: "Armor of God",
    verse: "Ephesians 6:10-18",
    lastRead: "Yesterday"
  }
];

export const StudyPage = () => {
  const { toast } = useToast();

  const handleStartPlan = (planTitle: string) => {
    toast({
      title: "Study Plan Started",
      description: `"${planTitle}" has been added to your studies!`
    });
  };

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Bible Study</h1>
        <p className="text-muted-foreground">Deepen your understanding of God's Word</p>
      </div>

      {/* Search Bar */}
      <Card className="shadow-card">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search scriptures, topics, or studies..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <Button size="sm" className="px-6">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Continue Reading */}
      {recentStudies.length > 0 && (
        <Card className="shadow-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Continue Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentStudies.map((study, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">{study.title}</p>
                  <p className="text-sm text-muted-foreground">{study.verse}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{study.lastRead}</p>
                  <Button size="sm" variant="outline" className="mt-1">
                    Continue
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Study Plans */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Study Plans</h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid gap-4">
          {studyPlans.map((plan) => (
            <Card key={plan.id} className="shadow-card hover:shadow-soft transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{plan.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {plan.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                {plan.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{plan.progress}/{plan.duration} days</span>
                    </div>
                    <Progress value={(plan.progress / plan.duration) * 100} className="h-2" />
                  </div>
                )}

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {plan.duration} days
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {plan.difficulty}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {plan.participants.toLocaleString()}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full" 
                  variant={plan.progress > 0 ? "default" : "outline"}
                  onClick={() => handleStartPlan(plan.title)}
                >
                  {plan.progress > 0 ? "Continue Study" : "Start Plan"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Study Options */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Study</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Random Verse</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col gap-2">
            <Search className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Verse Search</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};