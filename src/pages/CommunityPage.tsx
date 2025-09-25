import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  MessageCircle, 
  Users, 
  HelpCircle, 
  TrendingUp,
  Plus,
  Clock,
  ArrowUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const communityPosts = [
  // Prayer Requests (156 total, showing representative sample)
  {
    id: 1,
    type: 'prayer',
    title: "Prayers for healing",
    content: "Please pray for my grandmother who is in the hospital. She's been struggling with her health...",
    author: "Sarah M.",
    isAnonymous: false,
    timeAgo: "2 hours ago",
    likes: 12,
    replies: 5,
    tags: ["healing", "family"]
  },
  {
    id: 2,
    type: 'prayer',
    title: "Job search prayers",
    content: "I've been unemployed for 3 months. Please pray that God opens doors for employment...",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "3 hours ago",
    likes: 18,
    replies: 8,
    tags: ["employment", "provision"]
  },
  {
    id: 3,
    type: 'prayer',
    title: "Marriage restoration",
    content: "My spouse and I are going through a difficult time. Please pray for our marriage...",
    author: "Grace K.",
    isAnonymous: false,
    timeAgo: "5 hours ago",
    likes: 24,
    replies: 12,
    tags: ["marriage", "restoration"]
  },
  {
    id: 4,
    type: 'prayer',
    title: "Financial breakthrough",
    content: "Struggling with debt and bills. Praying for God's provision and wisdom...",
    author: "Joseph M.",
    isAnonymous: false,
    timeAgo: "6 hours ago",
    likes: 16,
    replies: 7,
    tags: ["finances", "provision"]
  },
  {
    id: 5,
    type: 'prayer',
    title: "Healing from depression",
    content: "Going through a dark season. Please pray for mental health and God's peace...",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "8 hours ago",
    likes: 31,
    replies: 15,
    tags: ["healing", "mental-health"]
  },
  
  // Testimonies (87 total, showing representative sample)
  {
    id: 6,
    type: 'testimony',
    title: "God provided in unexpected ways",
    content: "I wanted to share how God provided for my family during a difficult financial time...",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "4 hours ago",
    likes: 28,
    replies: 8,
    tags: ["provision", "testimony"]
  },
  {
    id: 7,
    type: 'testimony',
    title: "Miraculous healing testimony",
    content: "After months of prayer, the doctors say my condition has completely improved...",
    author: "Mary W.",
    isAnonymous: false,
    timeAgo: "1 day ago",
    likes: 45,
    replies: 20,
    tags: ["healing", "miracle"]
  },
  {
    id: 8,
    type: 'testimony',
    title: "God restored my marriage",
    content: "After separation, God worked in both our hearts and brought us back together...",
    author: "Peter L.",
    isAnonymous: false,
    timeAgo: "2 days ago",
    likes: 52,
    replies: 18,
    tags: ["marriage", "restoration"]
  },
  {
    id: 9,
    type: 'testimony',
    title: "Found purpose in serving",
    content: "Through volunteering at church, I discovered my calling and found peace...",
    author: "Rebecca S.",
    isAnonymous: false,
    timeAgo: "3 days ago",
    likes: 22,
    replies: 9,
    tags: ["purpose", "service"]
  },
  {
    id: 10,
    type: 'testimony',
    title: "Deliverance from addiction",
    content: "By God's grace and community support, I'm now 6 months clean...",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "4 days ago",
    likes: 38,
    replies: 14,
    tags: ["deliverance", "addiction"]
  },
  
  // Questions & Answers (45 total, showing representative sample)
  {
    id: 11,
    type: 'question',
    title: "Understanding forgiveness",
    content: "I'm struggling with forgiving someone who hurt me deeply. How do we truly forgive?",
    author: "David K.",
    isAnonymous: false,
    timeAgo: "6 hours ago",
    likes: 15,
    replies: 12,
    tags: ["forgiveness", "relationships"]
  },
  {
    id: 12,
    type: 'question',
    title: "What does it mean to have faith?",
    content: "I'm new to Christianity and trying to understand what faith really means...",
    author: "Hannah T.",
    isAnonymous: false,
    timeAgo: "12 hours ago",
    likes: 20,
    replies: 16,
    tags: ["faith", "basics"]
  },
  {
    id: 13,
    type: 'question',
    title: "How to pray effectively?",
    content: "Sometimes I feel like my prayers aren't being heard. What am I doing wrong?",
    author: "Anonymous",
    isAnonymous: true,
    timeAgo: "1 day ago",
    likes: 25,
    replies: 22,
    tags: ["prayer", "guidance"]
  },
  {
    id: 14,
    type: 'question',
    title: "Dealing with doubt",
    content: "Going through a season of doubt about my faith. Is this normal?",
    author: "Michael R.",
    isAnonymous: false,
    timeAgo: "2 days ago",
    likes: 18,
    replies: 14,
    tags: ["doubt", "faith"]
  },
  {
    id: 15,
    type: 'question',
    title: "Understanding God's will",
    content: "How do I know what God's will is for my life and major decisions?",
    author: "Esther N.",
    isAnonymous: false,
    timeAgo: "3 days ago",
    likes: 32,
    replies: 19,
    tags: ["guidance", "will-of-god"]
  }
];

const trendingTopics = [
  { name: "Prayer Requests", count: 156, color: "bg-red-100 text-red-800" },
  { name: "Healing", count: 89, color: "bg-green-100 text-green-800" },
  { name: "Testimonies", count: 87, color: "bg-blue-100 text-blue-800" },
  { name: "Faith Questions", count: 45, color: "bg-purple-100 text-purple-800" }
];

export const CommunityPage = () => {
  const [showPrayerForm, setShowPrayerForm] = useState(false);
  const [showTestimonyForm, setShowTestimonyForm] = useState(false);
  const [prayerRequest, setPrayerRequest] = useState('');
  const [testimonyText, setTestimonyText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleLike = (postId: number) => {
    toast({
      title: "Liked",
      description: "Your support has been shared with the community"
    });
  };

  const handleNewPost = (type: string) => {
    toast({
      title: "New Post",
      description: `Create a new ${type} - feature coming soon!`
    });
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'prayer':
        return <Heart className="h-4 w-4 text-red-500" />;
      case 'testimony':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'question':
        return <HelpCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredPosts = activeTab === "all" 
    ? communityPosts 
    : communityPosts.filter(post => post.type === activeTab);

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Community</h1>
        <p className="text-muted-foreground">Connect, share, and grow together in faith</p>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card gradient-sky">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2 bg-card/80 backdrop-blur-sm"
              onClick={() => handleNewPost("prayer request")}
            >
              <Heart className="h-6 w-6 text-red-500" />
              <span className="text-sm font-medium">Prayer Request</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col gap-2 bg-card/80 backdrop-blur-sm"
              onClick={() => handleNewPost("testimony")}
            >
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="text-sm font-medium">Share Testimony</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <Badge 
                key={topic.name} 
                variant="secondary" 
                className="px-3 py-1 hover:bg-primary/10 cursor-pointer transition-smooth"
              >
                {topic.name} ({topic.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="prayer">Prayer</TabsTrigger>
          <TabsTrigger value="testimony">Testimony</TabsTrigger>
          <TabsTrigger value="question">Q&A</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-4">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="shadow-card hover:shadow-soft transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  {getPostIcon(post.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{post.author}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.timeAgo}
                      </span>
                    </div>
                    <CardTitle className="text-base font-semibold">{post.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {post.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-muted-foreground hover:text-red-500"
                  >
                    <ArrowUp className="h-4 w-4" />
                    {post.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {post.replies}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No posts found in this category.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => handleNewPost("post")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};