import { Leaf } from 'lucide-react';

export const AppHeader = () => {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary text-primary-foreground">
            <Leaf className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CropClairvoyant</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Plant Health Detection</p>
          </div>
        </div>
      </div>
    </header>
  );
};