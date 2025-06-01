import React, { useState } from 'react';
import { NameGeneratorHero } from '@/components/NameGeneratorHero';
import { NameGeneratorResults } from '@/components/NameGeneratorResults';
import { RecentGenerations } from '@/components/RecentGenerations';
import { Header } from '@/components/Header';
import { generateBrandingKit } from '@/utils/nameGenerator';
import { BrandingKit } from '@/types/branding';
import { Sparkles, Zap, Target, Shield, Rocket, Users } from 'lucide-react';

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<BrandingKit[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = async (description: string) => {
    setIsGenerating(true);
    setShowResults(false);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const brandingKits = await generateBrandingKit(description);
      setResults(brandingKits);
      setShowResults(true);
      
      // Save to localStorage
      const saved = JSON.parse(localStorage.getItem('recentGenerations') || '[]');
      const newGeneration = {
        id: Date.now(),
        description,
        results: brandingKits,
        timestamp: new Date().toISOString(),
      };
      saved.unshift(newGeneration);
      localStorage.setItem('recentGenerations', JSON.stringify(saved.slice(0, 10)));
      
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div id="generator">
          <NameGeneratorHero onGenerate={handleGenerate} isLoading={isGenerating} />
        </div>
        
        {showResults && (
          <NameGeneratorResults results={results} />
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose BrandSpark?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your ideas into powerful brands with our AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Generation</h3>
              <p className="text-gray-600">Get unique, creative brand names that perfectly match your vision and target audience.</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Domain Availability</h3>
              <p className="text-gray-600">Instantly check domain availability and secure your perfect web address.</p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Branding Kit</h3>
              <p className="text-gray-600">Get everything you need: logos, color schemes, and brand guidelines.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your perfect brand in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Describe Your Idea</h3>
              <p className="text-gray-600">Tell us about your business, target audience, and vision.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Options</h3>
              <p className="text-gray-600">Get multiple branding options tailored to your needs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Download & Launch</h3>
              <p className="text-gray-600">Download your complete branding kit and start building.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Generations */}
      <div className="container mx-auto px-4 py-12">
        <RecentGenerations />
      </div>
    </div>
  );
};

export default Index;
