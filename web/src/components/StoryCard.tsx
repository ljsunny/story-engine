import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoryCardProps {
  story: string;
}

export function StoryCard({ story }: StoryCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story);
      setCopied(true);
      toast({
        title: 'Copied!',
        description: 'Story copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Generated Story',
          text: story,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      // Fallback to copy
      handleCopy();
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card border border-border shadow-medium p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Your Story</h2>
          <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
            <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {story}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 h-12 rounded-xl shadow-soft hover:shadow-medium transition-all"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Text
            </>
          )}
        </Button>
        
        <Button
          onClick={handleShare}
          className="flex-1 h-12 rounded-xl bg-gradient-primary hover:opacity-90 shadow-medium hover:shadow-strong transition-all"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Story
        </Button>
      </div>
    </div>
  );
}
