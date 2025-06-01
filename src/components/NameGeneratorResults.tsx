import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, CheckCircle, XCircle, Copy, Heart, Globe, Palette, Type } from 'lucide-react';
import { BrandingKit } from '@/types/branding';
import { useToast } from '@/hooks/use-toast';
import { SaveNameButton } from './SaveNameButton';
import { BrandStory } from './BrandStory';

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
    <div className="space-y-4 mt-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Your Branding Kits</h2>
        <p className="text-sm text-gray-600">Pick your favorite and start building your brand!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {results.map((kit) => (
          <Card key={kit.name} className="overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-bold text-gray-800">{kit.name}</CardTitle>
                  <p className="text-xs text-gray-600 mt-0.5 italic">"{kit.slogan}"</p>
                </div>
                <button
                  onClick={() => toggleFavorite(kit.name)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.has(kit.name) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-3 space-y-3">
              {/* Enhanced Domain Section */}
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 p-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-700 mb-1">Domain</div>
                    <div className="flex items-center gap-1.5">
                      <code className="text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded font-mono truncate flex-1">
                        {kit.domain}
                      </code>
                      {kit.domainAvailable ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 text-xs px-1.5 py-0">
                          <CheckCircle className="w-3 h-3 mr-0.5" /> Available
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0">
                          <XCircle className="w-3 h-3 mr-0.5" /> Taken
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Preview */}
              <div className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-1.5 mb-2">
                  <Type className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Logo Preview</span>
                </div>
                <div className="relative">
                  <div 
                    className="relative w-full h-20 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${kit.colors.primary}20, ${kit.colors.secondary}20)`,
                      border: `1px solid ${kit.colors.primary}30`
                    }}
                  >
                    <div className="text-center transform hover:scale-105 transition-transform duration-300">
                      <div 
                        className="text-2xl mb-1"
                        style={{ color: kit.colors.primary }}
                      >
                        {kit.logo.icon}
                      </div>
                      <div 
                        className="text-sm font-bold tracking-wider"
                        style={{ 
                          color: kit.colors.secondary,
                          textShadow: `0 2px 4px ${kit.colors.primary}20`
                        }}
                      >
                        {kit.logo.text}
                      </div>
                    </div>
                    <div 
                      className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${kit.colors.accent}20`,
                        color: kit.colors.accent
                      }}
                    >
                      {kit.logo.style}
                    </div>
                  </div>

                  {/* Logo Variations */}
                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    <div 
                      className="h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: kit.colors.primary }}
                    >
                      <span className="text-white text-sm">{kit.logo.icon}</span>
                    </div>
                    <div 
                      className="h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: kit.colors.secondary }}
                    >
                      <span className="text-white text-sm">{kit.logo.icon}</span>
                    </div>
                    <div 
                      className="h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: kit.colors.accent }}
                    >
                      <span className="text-white text-sm">{kit.logo.icon}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Palette */}
              <div className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-1.5 mb-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Color Palette</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1">
                    <div 
                      className="h-6 rounded-lg shadow-sm mb-0.5"
                      style={{ backgroundColor: kit.colors.primary }}
                    ></div>
                    <div className="text-[10px] text-center text-gray-600">Primary</div>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-6 rounded-lg shadow-sm mb-0.5"
                      style={{ backgroundColor: kit.colors.secondary }}
                    ></div>
                    <div className="text-[10px] text-center text-gray-600">Secondary</div>
                  </div>
                  <div className="flex-1">
                    <div 
                      className="h-6 rounded-lg shadow-sm mb-0.5"
                      style={{ backgroundColor: kit.colors.accent }}
                    ></div>
                    <div className="text-[10px] text-center text-gray-600">Accent</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5 pt-2">
                <Button
                  onClick={() => copyToClipboard(kit.name)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs h-7"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
                <Button
                  onClick={() => downloadBrandingKit(kit)}
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs h-7"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>

              <SaveNameButton name={kit.name} description={kit.slogan} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
