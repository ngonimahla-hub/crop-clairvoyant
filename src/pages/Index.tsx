import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { UploadZone } from '@/components/upload-zone';
import { AnalysisResults, AnalysisResult } from '@/components/analysis-results';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-crops.jpg';

// Mock analysis function - in a real app, this would call an AI service
const analyzePlantImage = async (file: File): Promise<AnalysisResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock different results based on filename or random
  const mockResults: AnalysisResult[] = [
    {
      status: 'healthy',
      confidence: 0.94,
      condition: 'Healthy Plant',
      description: 'Your plant appears to be in excellent health with vibrant green foliage and no signs of disease or stress.',
      recommendations: [
        'Continue current watering schedule',
        'Ensure adequate sunlight exposure',
        'Monitor for any changes in leaf color'
      ]
    },
    {
      status: 'warning',
      confidence: 0.78,
      condition: 'Early Blight',
      description: 'Early signs of blight detected. This fungal disease commonly affects tomatoes and potatoes.',
      symptoms: [
        'Small dark spots on lower leaves',
        'Yellowing around spot margins',
        'Concentric ring patterns'
      ],
      recommendations: [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation around plants',
        'Water at soil level to avoid wetting leaves'
      ]
    },
    {
      status: 'disease',
      confidence: 0.89,
      condition: 'Late Blight',
      description: 'Severe late blight infection detected. This is a serious disease that requires immediate action.',
      symptoms: [
        'Large brown patches on leaves',
        'White fuzzy growth on leaf undersides',
        'Rapid spread to stems and fruits'
      ],
      recommendations: [
        'Remove all infected plant material',
        'Apply systemic fungicide immediately',
        'Increase spacing between plants',
        'Consider resistant varieties for future planting'
      ]
    }
  ];
  
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | undefined>();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | undefined>();

  const handleImageUpload = async (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
    setIsAnalyzing(true);
    setAnalysisResult(undefined);

    try {
      const result = await analyzePlantImage(file);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClearImage = () => {
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
    setUploadedImage(undefined);
    setAnalysisResult(undefined);
    setIsAnalyzing(false);
  };

  const handleNewAnalysis = () => {
    handleClearImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {!uploadedImage && !isAnalyzing && !analysisResult && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="relative overflow-hidden rounded-2xl mb-8">
                <img
                  src={heroImage}
                  alt="Healthy crops in a field"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">Detect Plant Diseases Instantly</h1>
                    <p className="text-xl opacity-90">AI-powered crop health analysis in seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <div className="p-3 rounded-full bg-healthy/10 w-fit mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-healthy" />
                </div>
                <h3 className="font-semibold mb-2">Instant Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Upload a photo and get results in seconds
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning for accurate diagnosis
                </p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="p-3 rounded-full bg-accent/10 w-fit mx-auto mb-4">
                  <Leaf className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  Get treatment recommendations from experts
                </p>
              </Card>
            </div>
          </>
        )}

        {/* Upload or Results Section */}
        <div className="max-w-2xl mx-auto">
          {!analysisResult ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Upload Plant Image</h2>
                <p className="text-muted-foreground">
                  Take a clear photo of your plant's leaves to get started
                </p>
              </div>
              
              <UploadZone
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                onClearImage={handleClearImage}
              />
              
              {isAnalyzing && (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    <div>
                      <h3 className="font-semibold">Analyzing Your Plant</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI is examining the image for signs of disease...
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Analysis Complete</h2>
                <p className="text-muted-foreground">
                  Here's what we found about your plant's health
                </p>
              </div>
              
              <AnalysisResults
                result={analysisResult}
                onNewAnalysis={handleNewAnalysis}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
