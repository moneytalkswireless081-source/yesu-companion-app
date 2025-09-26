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
  relatedScriptures?: string[];
  isBookmarked?: boolean;
  onShare?: () => void;
  onBookmark?: () => void;
}

export const DailyScripture: React.FC<DailyScriptureProps> = ({
  verse,
  reference,
  commentary,
  prayer,
  relatedScriptures,
  isBookmarked = false,
  onShare,
  onBookmark
}) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareText = `"${verse}" - ${reference}\n\nFrom YesuApp`;
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Daily Scripture - ${reference}`,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to share options
        showShareOptions();
      }
    } else {
      showShareOptions();
    }
    onShare?.();
  };

  const showShareOptions = () => {
    const shareText = encodeURIComponent(`"${verse}" - ${reference}\n\nFrom YesuApp`);
    const shareUrl = encodeURIComponent(window.location.href);
    
    const shareOptions = [
      {
        name: "X (Twitter)",
        url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
        action: () => window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`, '_blank')
      },
      {
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`,
        action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`, '_blank')
      },
      {
        name: "WhatsApp",
        url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
        action: () => window.open(`https://wa.me/?text=${shareText}%20${shareUrl}`, '_blank')
      },
      {
        name: "Copy to Clipboard",
        action: async () => {
          try {
            await navigator.clipboard.writeText(`"${verse}" - ${reference}\n\nFrom YesuApp`);
            toast({
              title: "Copied to clipboard",
              description: "Scripture verse copied successfully!"
            });
          } catch (error) {
            console.error('Failed to copy:', error);
          }
        }
      }
    ];

    // Create a simple share dialog
    const shareDialog = document.createElement('div');
    shareDialog.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    const shareMenu = document.createElement('div');
    shareMenu.style.cssText = `
      background: white;
      border-radius: 8px;
      padding: 20px;
      max-width: 300px;
      width: 90%;
    `;
    
    shareMenu.innerHTML = `
      <h3 style="margin: 0 0 15px 0; color: #333;">Share Scripture</h3>
      ${shareOptions.map(option => `
        <button style="
          display: block;
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          text-align: left;
        " data-option="${option.name}">${option.name}</button>
      `).join('')}
      <button style="
        display: block;
        width: 100%;
        padding: 10px;
        margin: 10px 0 0 0;
        border: none;
        border-radius: 4px;
        background: #f0f0f0;
        cursor: pointer;
      " data-option="cancel">Cancel</button>
    `;
    
    shareDialog.appendChild(shareMenu);
    document.body.appendChild(shareDialog);
    
    shareMenu.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const optionName = target.getAttribute('data-option');
      
      if (optionName === 'cancel') {
        document.body.removeChild(shareDialog);
        return;
      }
      
      const option = shareOptions.find(o => o.name === optionName);
      if (option) {
        option.action();
        document.body.removeChild(shareDialog);
      }
    });
    
    shareDialog.addEventListener('click', (e) => {
      if (e.target === shareDialog) {
        document.body.removeChild(shareDialog);
      }
    });
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

      {/* Related Scriptures for Further Study */}
      {relatedScriptures && relatedScriptures.length > 0 && (
        <Card className="shadow-card border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Further Study
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                Explore these related scriptures to deepen your understanding:
              </p>
              {relatedScriptures.map((scripture, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-background border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <p className="text-sm text-foreground leading-relaxed">
                    {scripture}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};