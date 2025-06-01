import { BrandingKit } from '@/types/branding';
import { generateBrandStory } from './openai';

const namePatterns = [
  'Tech', 'Pro', 'Smart', 'Quick', 'Flow', 'Sync', 'Hub', 'Lab', 'Works', 'Base',
  'Cloud', 'Stream', 'Wave', 'Core', 'Link', 'Shift', 'Boost', 'Spark', 'Forge', 'Mind'
];

const suffixes = [
  'ly', 'io', 'app', 'hub', 'lab', 'pro', 'ai', 'go', 'co', 'net'
];

const colorPalettes = [
  { primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA' }, // Blue
  { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA' }, // Purple
  { primary: '#10B981', secondary: '#059669', accent: '#34D399' }, // Green
  { primary: '#F59E0B', secondary: '#D97706', accent: '#FBBF24' }, // Orange
  { primary: '#EF4444', secondary: '#DC2626', accent: '#F87171' }, // Red
  { primary: '#06B6D4', secondary: '#0891B2', accent: '#67E8F9' }, // Cyan
  { primary: '#8B5A2B', secondary: '#92400E', accent: '#D97706' }, // Brown
  { primary: '#6366F1', secondary: '#4F46E5', accent: '#818CF8' }, // Indigo
];

const slogans = [
  'Simplify. Amplify. Succeed.',
  'Where productivity meets innovation',
  'Transform the way you work',
  'Your success, automated',
  'Building the future, today',
  'Efficiency redefined',
  'Smart solutions for modern teams',
  'Empowering your potential',
  'Innovation at your fingertips',
  'Streamline. Scale. Succeed.',
];

const logoStyles = [
  'minimal',
  'geometric',
  'abstract',
  'letter-based',
  'symbol-based'
];

const logoIcons = {
  minimal: ['⚡', '✨', '🌟', '💫', '⭐'],
  geometric: ['⬡', '⬢', '⬣', '⬤', '⬥'],
  abstract: ['◈', '◇', '◉', '◎', '◯'],
  'letter-based': ['A', 'B', 'C', 'D', 'E'],
  'symbol-based': ['∞', '∆', '∑', '∏', '∫']
};

function generateName(description: string): string {
  const words = description.toLowerCase().split(' ');
  const keyWords = words.filter(word => 
    !['for', 'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'from', 'tool', 'platform', 'app'].includes(word)
  );
  
  const baseWord = keyWords[Math.floor(Math.random() * keyWords.length)] || 'smart';
  const pattern = namePatterns[Math.floor(Math.random() * namePatterns.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const variations = [
    `${baseWord}${pattern}`,
    `${pattern}${baseWord}`,
    `${baseWord}.${suffix}`,
    `${pattern}.${suffix}`,
    `${baseWord}${pattern}.${suffix}`,
  ];
  
  return variations[Math.floor(Math.random() * variations.length)]
    .replace(/\b\w/g, l => l.toUpperCase())
    .replace('.', '');
}

function generateLogo(name: string): { text: string; style: string; icon: string } {
  const words = name.split(/(?=[A-Z])/);
  const style = logoStyles[Math.floor(Math.random() * logoStyles.length)];
  
  let text = '';
  let icon = '';
  
  switch (style) {
    case 'minimal':
      text = words[0][0] + words[1]?.[0] || words[0][1];
      icon = logoIcons.minimal[Math.floor(Math.random() * logoIcons.minimal.length)];
      break;
    case 'geometric':
      text = words[0].substring(0, 2);
      icon = logoIcons.geometric[Math.floor(Math.random() * logoIcons.geometric.length)];
      break;
    case 'abstract':
      text = name.substring(0, 2);
      icon = logoIcons.abstract[Math.floor(Math.random() * logoIcons.abstract.length)];
      break;
    case 'letter-based':
      text = words[0][0];
      icon = logoIcons['letter-based'][Math.floor(Math.random() * logoIcons['letter-based'].length)];
      break;
    case 'symbol-based':
      text = name.substring(0, 1);
      icon = logoIcons['symbol-based'][Math.floor(Math.random() * logoIcons['symbol-based'].length)];
      break;
    default:
      text = name.substring(0, 2);
      icon = '✨';
  }
  
  return {
    text: text.toUpperCase(),
    style,
    icon
  };
}

function checkDomainAvailability(): boolean {
  // Simulate domain availability (in real app, this would call an API)
  return Math.random() > 0.6; // 40% chance of availability
}

function generateSlogan(): string {
  return slogans[Math.floor(Math.random() * slogans.length)];
}

export async function generateBrandingKit(description: string): Promise<BrandingKit[]> {
  const results: BrandingKit[] = [];
  const usedNames = new Set<string>();
  
  while (results.length < 5) {
    const name = generateName(description);
    
    if (!usedNames.has(name)) {
      usedNames.add(name);
      const domain = `${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      const logoData = generateLogo(name);
      const colors = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const slogan = generateSlogan();
      const domainAvailable = checkDomainAvailability();
      
      // Generate AI brand story
      const brandStory = await generateBrandStory(name, description);
      
      results.push({
        name,
        domain,
        domainAvailable,
        logo: logoData,
        slogan,
        colors,
        brandStory: brandStory ? {
          story: brandStory.story,
          meaning: brandStory.meaning,
          culturalSignificance: brandStory.culturalSignificance,
          pronunciation: brandStory.pronunciation
        } : undefined,
        brandPersonality: brandStory ? {
          traits: brandStory.brandPersonality.traits,
          marketingAngles: brandStory.brandPersonality.marketingAngles,
          visualIdentity: brandStory.brandPersonality.visualIdentity
        } : undefined
      });
    }
  }
  
  return results;
}
