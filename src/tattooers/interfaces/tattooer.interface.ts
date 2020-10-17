export interface Tattooer {
  instagram: string;
  city: string;
  styles: string[];
  about?: string;
  approved?: boolean;
  instagram_posts?: string[];

  instagram_data?: {
    id: string;
    token: string;
  }
}
