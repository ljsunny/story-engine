import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUploader } from '@/components/ImageUploader';
import { TextInput } from '@/components/TextInput';
import { SubmitButton } from '@/components/SubmitButton';
import { generateStory } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';

const Upload = () => {
  const [images, setImages] = useState<File[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (images.length === 0) {
      toast({
        title: 'No images selected',
        description: 'Please upload at least one image',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const result = await generateStory(images, text || null);
      // Navigate to result page with story data and images
      navigate(`/result?sessionId=${result.sessionId}`, {
        state: { story: result.story, images: images.map(img => URL.createObjectURL(img)) },
      });
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: 'Failed to generate story. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-medium mb-4">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Contextual Story Engine
            </h1>
          </div>

          {/* Upload Form */}
          <div className="rounded-2xl bg-card border border-border shadow-strong p-8 space-y-8">
            <ImageUploader
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />

            <div className="pt-4 border-t border-border">
              <TextInput
                value={text}
                onChange={setText}
                placeholder="e.g., adventure, mystery, romantic, fantasy themes..."
              />
            </div>

            <SubmitButton
              onClick={handleSubmit}
              disabled={images.length === 0}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
