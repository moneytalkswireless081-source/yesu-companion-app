import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyScriptureProps {
  verse: string;
  reference: string;
  commentary?: string;
  prayer?: string;
  isBookmarked?: boolean;
  onShare?: () => void;
  onBookmark?: () => void;
}

export const DailyScripture: React.FC<DailyScriptureProps> = ({
  verse,
  reference,
  commentary,
  prayer,
  isBookmarked = false,
  onShare,
  onBookmark
}) => {
  const { toast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Scripture - ${reference}`,
          text: `"${verse}" - ${reference}\n\nFrom YesuApp`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      const shareText = `"${verse}" - ${reference}\n\nFrom YesuApp`;
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Scripture verse copied successfully!"
      });
    }
    onShare?.();
  };

  const handleBookmark = () => {
    onBookmark?.();
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Removed from your bookmarks" : "Added to your bookmarks"
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Scripture Card */}
      <Card className="shadow-card border-0 gradient-sky">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">Today's Scripture</span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Bookmark 
                  className={`h-4 w-4 transition-smooth ${
                    isBookmarked ? 'fill-primary text-primary' : 'text-muted-foreground'
                  }`} 
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0 hover:bg-primary/10"
              >
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <blockquote className="scripture-text text-lg leading-relaxed text-foreground mb-4">
            "{verse}"
          </blockquote>
          <cite className="text-primary font-semibold text-right block">
            — {reference}
          </cite>
        </CardContent>
      </Card>

      {/* Commentary Section */}
      {commentary && (
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-secondary" />
              Commentary
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {commentary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Prayer Section */}
      {prayer && (
        <Card className="shadow-card border-secondary/20 bg-secondary/5">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-foreground">
              Guided Prayer
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed italic">
              {prayer}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};