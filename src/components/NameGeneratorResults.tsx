import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle, XCircle, Copy, Heart } from 'lucide-react';
import { BrandingKit } from '@/types/branding';
import { useToast } from '@/hooks/use-toast';
import { SaveNameButton } from './SaveNameButton';

interface NameGeneratorResultsProps {
  results: BrandingKit[];
}

export const NameGeneratorResults: React.FC<NameGeneratorResultsProps> = ({ results }) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const toggleFavorite = (name: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(name)) {
      newFavorites.delete(name);
    } else {
      newFavorites.add(name);
    }
    setFavorites(newFavorites);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard!",
      description: "The name has been copied to your clipboard.",
    });
  };

  const downloadBrandingKit = (kit: BrandingKit) => {
    const data = {
      name: kit.name,
      domain: kit.domain,
      slogan: kit.slogan,
      colors: kit.colors,
      logo: kit.logo
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${kit.name.toLowerCase().replace(/\s+/g, '-')}-branding-kit.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started!",
      description: "Your branding kit has been downloaded.",
    });
  };

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Branding Kits</h2>
        <p className="text-gray-600">Pick your favorite and start building your brand!</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((kit) => (
          <Card key={kit.name} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{kit.name}</h3>
                <p className="text-sm text-gray-600 italic">"{kit.slogan}"</p>
              </div>
              <button
                onClick={() => toggleFavorite(kit.name)}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`w-5 h-5 ${favorites.has(kit.name) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-700">Domain:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm">{kit.domain}</code>
                {kit.domainAvailable ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <Badge variant={kit.domainAvailable ? "default" : "destructive"} className="text-xs">
                {kit.domainAvailable ? "Available" : "Taken"}
              </Badge>
            </div>
            
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Logo Preview</div>
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
                style={{ backgroundColor: kit.colors.primary }}
              >
                {kit.logo}
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">Color Palette</div>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                  style={{ backgroundColor: kit.colors.primary }}
                  title="Primary"
                ></div>
                <div 
                  className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                  style={{ backgroundColor: kit.colors.secondary }}
                  title="Secondary"
                ></div>
                <div 
                  className="w-8 h-8 rounded-full shadow-sm border-2 border-white"
                  style={{ backgroundColor: kit.colors.accent }}
                  title="Accent"
                ></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={() => copyToClipboard(kit.name)}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy Name
              </Button>
              <Button
                onClick={() => downloadBrandingKit(kit)}
                size="sm"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
            
            <div className="mt-4">
              <SaveNameButton name={kit.name} description={kit.slogan} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
