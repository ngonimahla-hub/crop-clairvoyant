import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, Leaf, Bug, Droplets } from 'lucide-react';

export interface AnalysisResult {
  status: 'healthy' | 'warning' | 'disease';
  confidence: number;
  condition: string;
  description: string;
  symptoms?: string[];
  recommendations?: string[];
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResults = ({ result, onNewAnalysis }: AnalysisResultsProps) => {
  const getStatusIcon = () => {
    switch (result.status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-healthy" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-warning" />;
      case 'disease':
        return <XCircle className="h-6 w-6 text-disease" />;
    }
  };

  const getStatusColor = () => {
    switch (result.status) {
      case 'healthy':
        return 'bg-healthy text-healthy-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'disease':
        return 'bg-disease text-disease-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <CardTitle className="text-xl">{result.condition}</CardTitle>
                <CardDescription>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor()}>
              {result.status.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{result.description}</p>
          
          {result.symptoms && result.symptoms.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Bug className="h-4 w-4" />
                Symptoms Detected
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {result.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations && result.recommendations.length > 0 && (
            <div>
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4" />
                Recommendations
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {result.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onNewAnalysis} variant="outline" className="flex items-center gap-2">
          <Leaf className="h-4 w-4" />
          Analyze Another Plant
        </Button>
      </div>
    </div>
  );
};