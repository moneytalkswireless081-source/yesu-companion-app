import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BookOpen, Search, Star, Clock, Users, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { studyPlansDatabase, StudyPlan, StudyLesson } from '@/lib/studyPlans';
import { useAppStore } from '@/stores/useAppStore';

export const StudyPage = () => {
  const { toast } = useToast();
  const { getStudyProgress, updateStudyProgress } = useAppStore();
  const [studyPlans, setStudyPlans] = useState<(StudyPlan & { progress: number; currentDay: number })[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<StudyLesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLessonOpen, setIsLessonOpen] = useState(false);
  const [availableLessons, setAvailableLessons] = useState<StudyLesson[]>([]);

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

  useEffect(() => {
    const loadStudyPlans = () => {
      const plansWithProgress = studyPlansDatabase.map((plan) => {
        const progress = getStudyProgress(plan.id);
        const progressPercentage = Math.round((progress.completedLessons.length / plan.duration) * 100);
        return {
          ...plan,
          progress: progressPercentage,
          currentDay: progress.currentDay
        };
      });
      setStudyPlans(plansWithProgress);
    };

    loadStudyPlans();
  }, [getStudyProgress]);

  const handleStartPlan = (plan: StudyPlan & { progress: number; currentDay: number }) => {
    const progress = getStudyProgress(plan.id);
    setSelectedPlan(plan);
    setCompletedLessons(progress.completedLessons);
    
    // Find the current lesson to show
    const currentLesson = plan.lessons.find(lesson => lesson.day === progress.currentDay);
    if (currentLesson) {
      setSelectedLesson(currentLesson);
      setIsLessonOpen(true);
      
      // Set available lessons (completed + current, but not future ones)
      const available = plan.lessons.filter(lesson => 
        lesson.day <= progress.currentDay || progress.completedLessons.includes(lesson.id)
      );
      setAvailableLessons(available);
    }
    
    toast({
      title: progress.currentDay > 1 ? "Continuing Study" : "Study Plan Started",
      description: `"${plan.title}" Day ${progress.currentDay} is now open!`
    });
  };

  const handleCompleteLesson = (lesson: StudyLesson) => {
    if (!selectedPlan) return;
    
    // Update progress in store
    const progress = getStudyProgress(selectedPlan.id);
    const nextDay = lesson.day + 1;
    updateStudyProgress(selectedPlan.id, nextDay, lesson.id);
    
    // Update local state
    setStudyPlans(prev => prev.map(plan => 
      plan.id === selectedPlan.id 
        ? { 
            ...plan, 
            progress: Math.round(((progress.completedLessons.length + 1) / plan.duration) * 100),
            currentDay: nextDay <= plan.duration ? nextDay : plan.duration
          }
        : plan
    ));
    
    setCompletedLessons(prev => [...prev, lesson.id]);
    setIsLessonOpen(false);
    
    toast({
      title: "Lesson Completed!",
      description: `Great job completing "${lesson.title}". ${nextDay <= selectedPlan.duration ? `Day ${nextDay} is now available!` : 'Study plan completed!'}`
    });
  };

  const handleRandomVerse = () => {
    const verses = [
      { reference: "Psalm 46:10", text: "Be still, and know that I am God." },
      { reference: "Philippians 4:13", text: "I can do all this through him who gives me strength." },
      { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him." }
    ];
    
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    
    toast({
      title: randomVerse.reference,
      description: randomVerse.text,
      duration: 5000
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
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="mt-1"
                  onClick={() => {
                    toast({
                      title: `Continuing "${study.title}"`,
                      description: "Opening your last reading position"
                    });
                    // In a real app, this would navigate to the specific lesson
                  }}
                >
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
                      <span className="font-medium">Day {plan.currentDay}/{plan.duration}</span>
                    </div>
                    <Progress value={plan.progress} className="h-2" />
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
                  onClick={() => handleStartPlan(plan)}
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
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={handleRandomVerse}
          >
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Random Verse</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col gap-2"
            onClick={() => toast({ title: "Verse Search", description: "Search feature coming soon!" })}
          >
            <Search className="h-6 w-6 text-primary" />
            <span className="text-sm font-medium">Verse Search</span>
          </Button>
        </CardContent>
      </Card>

      {/* Study Lesson Dialog */}
      <Dialog open={isLessonOpen} onOpenChange={setIsLessonOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedLesson && selectedPlan && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Day {selectedLesson.day}: {selectedLesson.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Scripture Reference */}
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <h3 className="font-semibold text-primary mb-2">Today's Scripture</h3>
                  <p className="font-medium">{selectedLesson.scripture}</p>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-2">Study Content</h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedLesson.content}</p>
                </div>

                {/* Additional Scriptures */}
                {selectedLesson.additionalScriptures && selectedLesson.additionalScriptures.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Additional Scriptures for Study</h3>
                    <ul className="space-y-1">
                      {selectedLesson.additionalScriptures.map((scripture, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-medium">•</span>
                          <span className="text-muted-foreground text-sm">{scripture}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Reflection Questions */}
                <div>
                  <h3 className="font-semibold mb-2">Reflection Questions</h3>
                  <ul className="space-y-2">
                    {selectedLesson.questions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-medium">{index + 1}.</span>
                        <span className="text-muted-foreground">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prayer */}
                <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/20">
                  <h3 className="font-semibold text-secondary mb-2">Prayer</h3>
                  <p className="italic text-muted-foreground">{selectedLesson.prayer}</p>
                </div>

                {/* Complete Button */}
                <Button 
                  className="w-full" 
                  onClick={() => handleCompleteLesson(selectedLesson)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete Lesson
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};