import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen,
  Play,
  HelpCircle,
  Users,
  Calendar,
  Mail,
  Phone,
  Clock,
  Star,
  Award
} from 'lucide-react';

export const MarriagePage = () => {
  const [selectedCounselor, setSelectedCounselor] = useState<string | null>(null);

  const lessons = [
    {
      id: 1,
      title: "Building Strong Foundations",
      duration: "15 min",
      completed: false,
      description: "Learn the biblical principles for a God-centered marriage"
    },
    {
      id: 2,
      title: "Communication in Marriage",
      duration: "20 min",
      completed: true,
      description: "Effective communication strategies for couples"
    },
    {
      id: 3,
      title: "Conflict Resolution",
      duration: "18 min",
      completed: false,
      description: "Biblical approach to resolving disagreements"
    }
  ];

  const books = [
    {
      id: 1,
      title: "Love & Respect",
      author: "Dr. Emerson Eggerichs",
      rating: 4.8,
      pages: 320,
      downloaded: false
    },
    {
      id: 2,
      title: "The Meaning of Marriage",
      author: "Timothy Keller",
      rating: 4.9,
      pages: 368,
      downloaded: true
    },
    {
      id: 3,
      title: "Sacred Marriage",
      author: "Gary Thomas",
      rating: 4.7,
      pages: 272,
      downloaded: false
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Premarital Counseling Basics",
      speaker: "Pastor John Smith",
      duration: "45:30",
      thumbnail: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Marriage Enrichment Seminar",
      speaker: "Dr. Sarah Johnson",
      duration: "1:20:15",
      thumbnail: "/placeholder.svg"
    }
  ];

  const counselors = [
    {
      id: 1,
      name: "Pastor Michael Brown",
      specialty: "Marriage Counseling",
      experience: "15 years",
      email: "michael@church.com",
      phone: "+256-701-123-456",
      available: true
    },
    {
      id: 2,
      name: "Dr. Grace Namukwaya",
      specialty: "Family Therapy",
      experience: "12 years",
      email: "grace@therapy.ug",
      phone: "+256-702-789-012",
      available: false
    }
  ];

  const quizzes = [
    {
      id: 1,
      title: "Love Languages Assessment",
      questions: 30,
      completed: true,
      score: 85
    },
    {
      id: 2,
      title: "Communication Styles",
      questions: 25,
      completed: false,
      score: null
    },
    {
      id: 3,
      title: "Conflict Resolution Skills",
      questions: 20,
      completed: false,
      score: null
    }
  ];

  return (
    <div className="p-4 space-y-6 pb-20">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Marriage Ministry</h1>
        <p className="text-muted-foreground">Resources for God-centered relationships</p>
      </div>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          <TabsTrigger value="counselors">Counselors</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{lesson.title}</h3>
                      {lesson.completed && <Badge variant="secondary">Completed</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                      <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                        {lesson.completed ? "Review" : "Start Lesson"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          {books.map((book) => (
            <Card key={book.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{book.title}</h3>
                      {book.downloaded && <Badge variant="secondary">Downloaded</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-secondary fill-current" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{book.pages} pages</span>
                    </div>
                    <Button size="sm" variant={book.downloaded ? "outline" : "default"}>
                      {book.downloaded ? "Read Now" : "Download"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          {videos.map((video) => (
            <Card key={video.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">by {video.speaker}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{video.duration}</span>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{quiz.title}</h3>
                      {quiz.completed && <Badge variant="secondary">Completed</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{quiz.questions} questions</p>
                    <div className="flex items-center gap-4">
                      {quiz.completed && quiz.score && (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium">{quiz.score}%</span>
                        </div>
                      )}
                      <Button size="sm" variant={quiz.completed ? "outline" : "default"}>
                        {quiz.completed ? "Retake" : "Start Quiz"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="counselors" className="space-y-4">
          {counselors.map((counselor) => (
            <Card key={counselor.id} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">{counselor.name}</h3>
                      <Badge variant={counselor.available ? "default" : "secondary"}>
                        {counselor.available ? "Available" : "Busy"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{counselor.specialty}</p>
                    <p className="text-sm text-muted-foreground mb-3">{counselor.experience} experience</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`tel:${counselor.phone}`, '_blank')}
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`mailto:${counselor.email}`, '_blank')}
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    Book Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <p className="text-muted-foreground mb-4">Need immediate counseling support?</p>
              <Button className="w-full">Request Anonymous Counseling</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};