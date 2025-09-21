import React, { useState, useEffect } from 'react';
import { DailyScripture } from '@/components/daily/DailyScripture';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, DailyScripture as DailyScriptureType } from '@/lib/database';

// Sample scripture data - in production, this would come from an API
const sampleScriptures = [
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    reference: "Jeremiah 29:11",
    commentary: "God's plans for us are always good, even when we can't see the path ahead. This verse reminds us that He has our best interests at heart and is working all things together for our good.",
    prayer: "Heavenly Father, help me to trust in Your perfect plans for my life. When uncertainty comes, remind me that You hold my future and that Your plans are always for my good. Give me peace in knowing that You are in control. Amen."
  },
  {
    verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    commentary: "This passage calls us to complete dependence on God rather than our limited human understanding. When we submit our ways to Him, He promises to direct our paths.",
    prayer: "Lord, I surrender my understanding to You. Help me to trust You completely, especially when I don't understand what You're doing in my life. Guide my steps and make Your path clear before me. Amen."
  }
];

export const DailyPage = () => {
  const [todayScripture, setTodayScripture] = useState<DailyScriptureType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadTodayScripture();
  }, []);

  const loadTodayScripture = async () => {
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Try to get from local database first
      let scripture = await db.dailyScriptures
        .where('date')
        .equals(today)
        .first();

      if (!scripture) {
        // Generate new scripture for today
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        const selectedScripture = sampleScriptures[dayOfYear % sampleScriptures.length];
        
        scripture = {
          date: today,
          verse: selectedScripture.verse,
          reference: selectedScripture.reference,
          commentary: selectedScripture.commentary,
          prayer: selectedScripture.prayer,
          isRead: false,
          createdAt: new Date()
        };

        // Save to database
        await db.dailyScriptures.add(scripture);
      }

      setTodayScripture(scripture);
      
      // Mark as read if not already
      if (!scripture.isRead) {
        await db.dailyScriptures.update(scripture.id!, { isRead: true });
      }

      // Check if bookmarked
      const bookmark = await db.bookmarks
        .where('itemId')
        .equals(`scripture-${today}`)
        .first();
      setIsBookmarked(!!bookmark);

    } catch (error) {
      console.error('Error loading daily scripture:', error);
      toast({
        title: "Error",
        description: "Failed to load today's scripture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    loadTodayScripture();
    toast({
      title: "Refreshed",
      description: "Scripture content updated!"
    });
  };

  const handleBookmark = async () => {
    if (!todayScripture) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const bookmarkId = `scripture-${today}`;

      if (isBookmarked) {
        // Remove bookmark
        await db.bookmarks
          .where('itemId')
          .equals(bookmarkId)
          .delete();
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await db.bookmarks.add({
          type: 'scripture',
          itemId: bookmarkId,
          title: `Daily Scripture - ${todayScripture.reference}`,
          createdAt: new Date()
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error managing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to update bookmark. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading && !todayScripture) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Daily Scripture</h1>
        </div>
        <Card className="shadow-card">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-6 bg-muted rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Daily Scripture</h1>
          <p className="text-muted-foreground flex items-center gap-1 mt-1">
            <Calendar className="h-4 w-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={isLoading}
          className="shadow-card"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Scripture Content */}
      {todayScripture && (
        <DailyScripture
          verse={todayScripture.verse}
          reference={todayScripture.reference}
          commentary={todayScripture.commentary}
          prayer={todayScripture.prayer}
          isBookmarked={isBookmarked}
          onBookmark={handleBookmark}
          onShare={() => {
            // Handle share tracking if needed
          }}
        />
      )}

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Continue Your Journey</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => {
              // Navigate to Bible study
              toast({ title: "Bible Study", description: "Feature coming soon!" });
            }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Start Today's Study Plan
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => {
              // Navigate to community
              toast({ title: "Community", description: "Feature coming soon!" });
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Share Prayer Request
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};