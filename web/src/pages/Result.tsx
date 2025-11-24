import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { StoryCard } from '@/components/StoryCard';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, BookOpen } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [story, setStory] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    // Get story and images from navigation state
    const storyFromState = location.state?.story;
    const imagesFromState = location.state?.images;

    if (storyFromState) {
      setStory(storyFromState);
      if (imagesFromState) {
        setImages(imagesFromState);
      }
      setLoading(false);
    } else {
      // Sample story for demo
      setStory(`In the golden hour of a crisp autumn evening, Sarah discovered an old photograph tucked between the pages of her grandmother's cookbook. The faded image showed a young woman standing beside a vintage bicycle, her smile radiant against the backdrop of a cobblestone street.

As she gazed at the photo, memories began to flood back—stories her grandmother had told about cycling through the countryside, delivering fresh bread to neighbors during warmer days. Each pedal stroke was a connection to the past, a thread linking generations.

Sarah decided then that she would restore that old bicycle in the garage, the one covered in dust and cobwebs. It wasn't just about fixing a bike; it was about honoring a legacy, breathing new life into forgotten tales, and perhaps, creating her own adventures to pass down someday.`);
      setLoading(false);
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-primary shadow-strong animate-pulse">
            <Loader2 className="w-10 h-10 text-primary-foreground animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              Crafting Your Story
            </h2>
            <p className="text-muted-foreground">
              Our AI is analyzing your images and creating something magical...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="rounded-2xl bg-card border border-border shadow-strong p-8 space-y-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 text-destructive">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Story Not Found
              </h2>
              <p className="text-muted-foreground">
                We couldn't find your story. Please try generating a new one.
              </p>
            </div>
            <Button
              onClick={() => navigate('/upload')}
              className="w-full h-12 rounded-xl bg-gradient-primary hover:opacity-90 shadow-medium hover:shadow-strong transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create New Story
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/upload')}
              className="rounded-xl shadow-soft hover:shadow-medium transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create Another
            </Button>
            {sessionId && (
              <p className="text-sm text-muted-foreground">
                Session: {sessionId}
              </p>
            )}
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="rounded-2xl bg-card border border-border shadow-strong p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Your Images</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl overflow-hidden bg-muted shadow-soft hover:shadow-medium transition-all aspect-square"
                  >
                    <img
                      src={imageUrl}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Story Display */}
          <StoryCard story={story} />
        </div>
      </div>
    </div>
  );
};

export default Result;
