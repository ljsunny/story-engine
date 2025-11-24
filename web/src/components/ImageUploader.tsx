import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploaderProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onImagesChange, maxImages = 5 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files).filter(
        (file) => file.type.startsWith('image/')
      );

      const remainingSlots = maxImages - images.length;
      const newImages = [...images, ...files.slice(0, remainingSlots)];
      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;

      const files = Array.from(e.target.files).filter((file) =>
        file.type.startsWith('image/')
      );

      const remainingSlots = maxImages - images.length;
      const newImages = [...images, ...files.slice(0, remainingSlots)];
      onImagesChange(newImages);
    },
    [images, maxImages, onImagesChange]
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);
    },
    [images, onImagesChange]
  );

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-12 transition-all',
          isDragging
            ? 'border-primary bg-primary/5 shadow-medium'
            : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50',
          images.length >= maxImages && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={images.length >= maxImages}
        />
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
            <Upload className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-foreground">
              Drop your images here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Upload up to {maxImages} images • PNG, JPG, WEBP
            </p>
            <p className="text-xs text-muted-foreground">
              {images.length} / {maxImages} images uploaded
            </p>
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden bg-card shadow-soft hover:shadow-medium transition-all"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive/90 backdrop-blur-sm text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-destructive"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-background truncate">{image.name}</p>
              </div>
            </div>
          ))}
          {images.length < maxImages &&
            Array.from({ length: maxImages - images.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-xl border-2 border-dashed border-border bg-muted/30 h-32 flex items-center justify-center"
              >
                <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
