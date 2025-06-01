import React from 'react';
import { BrandingKit } from '@/types/branding';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BrandStoryProps {
  brandingKit: BrandingKit;
}

export function BrandStory({ brandingKit }: BrandStoryProps) {
  if (!brandingKit.brandStory || !brandingKit.brandPersonality) {
    return null;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Brand Story</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Story</h3>
            <p className="text-gray-600">{brandingKit.brandStory.story}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Meaning</h3>
            <p className="text-gray-600">{brandingKit.brandStory.meaning}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Cultural Significance</h3>
            <ul className="list-disc list-inside text-gray-600">
              {brandingKit.brandStory.culturalSignificance.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pronunciation</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(brandingKit.brandStory.pronunciation).map(([language, pronunciation]) => (
                <div key={language} className="text-gray-600">
                  <span className="font-medium capitalize">{language}:</span> {pronunciation}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Brand Personality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Traits</h3>
            <div className="flex flex-wrap gap-2">
              {brandingKit.brandPersonality.traits.map((trait, index) => (
                <Badge key={index} variant="secondary">{trait}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Marketing Angles</h3>
            <ul className="list-disc list-inside text-gray-600">
              {brandingKit.brandPersonality.marketingAngles.map((angle, index) => (
                <li key={index}>{angle}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Visual Identity Suggestions</h3>
            <ul className="list-disc list-inside text-gray-600">
              {brandingKit.brandPersonality.visualIdentity.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 