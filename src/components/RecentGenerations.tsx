
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Trash2 } from 'lucide-react';
import { BrandingKit } from '@/types/branding';

interface Generation {
  id: number;
  description: string;
  results: BrandingKit[];
  timestamp: string;
}

export const RecentGenerations: React.FC = () => {
  const [generations, setGenerations] = useState<Generation[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentGenerations') || '[]');
    setGenerations(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('recentGenerations');
    setGenerations([]);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (generations.length === 0) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Clock className="w-6 h-6" />
          Recent Generations
        </h2>
        <Button
          onClick={clearHistory}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear History
        </Button>
      </div>
      
      <div className="space-y-4">
        {generations.map((generation) => (
          <Card key={generation.id} className="p-4 bg-white">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-medium text-gray-800">{generation.description}</p>
                <p className="text-sm text-gray-500">{formatDate(generation.timestamp)}</p>
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {generation.results.slice(0, 3).map((kit, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: kit.colors.primary }}
                  ></div>
                  <span className="text-sm font-medium">{kit.name}</span>
                </div>
              ))}
              {generation.results.length > 3 && (
                <div className="text-sm text-gray-500 px-3 py-1">
                  +{generation.results.length - 3} more
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
