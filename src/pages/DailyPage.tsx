import React, { useState, useEffect } from 'react';
import { DailyScripture } from '@/components/daily/DailyScripture';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { db, DailyScripture as DailyScriptureType } from '@/lib/database';
import { getScriptureForDate } from '@/lib/scriptures';
import { toZonedTime, format } from 'date-fns-tz';
import { useAppStore } from '@/stores/useAppStore';

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
      // Get today's date in Ugandan time (EAT)
      const ugandanTime = toZonedTime(new Date(), 'Africa/Kampala');
      const today = format(ugandanTime, 'yyyy-MM-dd', { timeZone: 'Africa/Kampala' });
      
      // Try to get from local database first
      let scripture = await db.dailyScriptures
        .where('date')
        .equals(today)
        .first();

      if (!scripture) {
        // Get scripture for today's date in Ugandan time
        const selectedScripture = getScriptureForDate(ugandanTime);
        
        scripture = {
          date: today,
          verse: selectedScripture.verse,
          reference: selectedScripture.reference,
          commentary: selectedScripture.commentary,
          prayer: selectedScripture.prayer,
          relatedScriptures: selectedScripture.relatedScriptures,
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
      // Use Ugandan time for consistency
      const ugandanTime = toZonedTime(new Date(), 'Africa/Kampala');
      const today = format(ugandanTime, 'yyyy-MM-dd', { timeZone: 'Africa/Kampala' });
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
            {toZonedTime(new Date(), 'Africa/Kampala').toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              timeZone: 'Africa/Kampala'
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
          relatedScriptures={todayScripture.relatedScriptures}
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
              // Navigate to Study page using store
              const { setActiveTab } = useAppStore.getState();
              setActiveTab('study');
            }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Start Today's Study Plan
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => {
              // Navigate to Community page using store
              const { setActiveTab } = useAppStore.getState();
              setActiveTab('community');
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