import React, { useState } from 'react';
import { NameGeneratorHero } from '@/components/NameGeneratorHero';
import { NameGeneratorResults } from '@/components/NameGeneratorResults';
import { RecentGenerations } from '@/components/RecentGenerations';
import { Header } from '@/components/Header';
import { generateBrandingKit } from '@/utils/nameGenerator';
import { BrandingKit } from '@/types/branding';

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
      <div className="container mx-auto px-4 py-8">
        <div id="generator">
          <NameGeneratorHero onGenerate={handleGenerate} isLoading={isGenerating} />
        </div>
        
        {showResults && (
          <NameGeneratorResults results={results} />
        )}
        
        <RecentGenerations />
      </div>
    </div>
  );
};

export default Index;
