export interface BrandingKit {
  name: string;
  domain: string;
  domainAvailable: boolean;
  logo: {
    text: string;
    style: string;
    icon: string;
  };
  slogan: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  // New AI-generated content
  brandStory?: {
    story: string;
    meaning: string;
    culturalSignificance: string[];
    pronunciation: {
      [key: string]: string;
    };
  };
  brandPersonality?: {
    traits: string[];
    marketingAngles: string[];
    visualIdentity: string[];
  };
}
