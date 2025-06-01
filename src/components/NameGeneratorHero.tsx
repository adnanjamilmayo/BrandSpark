
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, Target } from 'lucide-react';

interface NameGeneratorHeroProps {
  onGenerate: (description: string) => void;
  isLoading: boolean;
}

export const NameGeneratorHero: React.FC<NameGeneratorHeroProps> = ({ onGenerate, isLoading }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (description.trim()) {
      onGenerate(description.trim());
    }
  };

  const examples = [
    "AI tool for daily habit tracking",
    "Project management for creative teams",
    "Social media scheduling platform",
    "Customer feedback analysis tool"
  ];

  return (
    <div className="text-center max-w-4xl mx-auto mb-16">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          AI SaaS Name Generator
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Generate brandable names, check domain availability, and create complete branding kits for your SaaS idea in seconds.
        </p>
        
        <div className="flex justify-center gap-8 mb-12">
          <div className="flex items-center gap-2 text-gray-600">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Target className="w-5 h-5 text-green-500" />
            <span>Domain Check</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Complete Branding</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-4">
          Describe your SaaS idea
        </label>
        
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., AI tool for daily habit tracking"
          className="w-full h-32 text-lg resize-none border-2 border-gray-200 focus:border-blue-500 rounded-xl"
          disabled={isLoading}
        />
        
        <div className="mt-4 mb-6">
          <p className="text-sm text-gray-500 mb-2">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examples.map((example, index) => (
              <button
                key={index}
                onClick={() => setDescription(example)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={!description.trim() || isLoading}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Generating Branding Kit...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate Branding Kit
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
