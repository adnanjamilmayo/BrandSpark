import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, Target, ArrowRight, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';

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

  const features = [
    "AI-Powered Name Generation",
    "Instant Domain Availability",
    "Complete Branding Kit",
    "Logo & Color Schemes",
    "Brand Guidelines",
    "Export & Download"
  ];

  return (
    <div className="text-center max-w-4xl mx-auto mb-16">
      <div className="mb-12">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Launch Your Brand in Minutes
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your ideas into powerful brands with our AI-powered platform. Get unique names, check domain availability, and create complete branding kits in seconds.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100"
            >
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative">
          <label htmlFor="description" className="block text-lg font-semibold text-gray-700 mb-4">
            Describe Your Vision
          </label>
          
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about your business idea, target audience, and what makes you unique..."
            className="w-full h-32 text-lg resize-none border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300"
            disabled={isLoading}
          />
          
          <div className="mt-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setDescription(example)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-600 transition-all duration-300 hover:shadow-sm"
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
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Your Brand...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Branding Kit</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="flex justify-center gap-8 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>AI-Powered</span>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-green-500" />
          <span>Instant Results</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span>100% Free</span>
        </div>
      </div>
    </div>
  );
};
