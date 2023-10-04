export interface Noticia {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: NewsSite;
  summary: string;
  published_at: Date;
  updated_at: Date;
  featured: boolean;
  launches: Launch[];
  events: any[];
}

export interface Launch {
  launch_id: string;
  provider: string;
}

export enum NewsSite {
  SpaceNews = 'SpaceNews',
  TheLaunchPad = 'The Launch Pad',
}
