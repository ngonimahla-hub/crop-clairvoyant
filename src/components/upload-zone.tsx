import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  uploadedImage?: string;
  onClearImage: () => void;
}

export const UploadZone = ({ onImageUpload, uploadedImage, onClearImage }: UploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      
      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        onImageUpload(files[0]);
      }
    },
    [onImageUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onImageUpload(files[0]);
      }
    },
    [onImageUpload]
  );

  if (uploadedImage) {
    return (
      <Card className="relative overflow-hidden shadow-lg">
        <img
          src={uploadedImage}
          alt="Uploaded plant"
          className="w-full h-80 object-cover"
        />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4"
          onClick={onClearImage}
        >
          <X className="h-4 w-4" />
        </Button>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer",
        "h-80 flex flex-col items-center justify-center p-8 text-center",
        isDragOver && "border-primary bg-primary/5"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-primary/10">
          <Upload className="h-8 w-8 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload Plant Image</h3>
          <p className="text-muted-foreground">
            Drag and drop your plant image here, or click to select
          </p>
        </div>

        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
          <Button variant="outline" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Choose Image
          </Button>
        </label>
      </div>
    </Card>
  );
};