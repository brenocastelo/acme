type Button = {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  id: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  href?: string;
};

type Callout = {
  __typename: string;
  title: string;
  description: string;
  calloutbutton: Button;
};

type Hero = {
  __typename: string;
  title: string;
  description: string;
  actionButtons: Button[];
};

type FeatureSection = {
  __typename: string;
  title: string;
  description: string;
  label?: string;
  featureButton: Button;
  contentPosition: 'right' | 'left';
  media: Media;
};

type Media = {
  __typename: 'Image' | 'EmbeddedVideo';
  url: string;
  altText?: string;
  file?: {
    id: string;
    url: string;
    height: number;
    width: number;
  };
};

type Section = {
  id: string;
  blocks: Hero[] | FeatureSection[] | Callout[];
};

type Seo = {
  description: string;
  id: string;
  keywords: string[];
  noIndex: boolean;
  title: string;
  openGraphImage: {
    url: string;
    width: number;
    height: number;
    id: string;
  };
};

export type { Button, Section, Hero, Media, Callout, FeatureSection, Seo };
