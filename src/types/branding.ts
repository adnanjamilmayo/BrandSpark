
export interface BrandingKit {
  name: string;
  domain: string;
  domainAvailable: boolean;
  logo: string;
  slogan: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}
