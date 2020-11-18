export interface Tattooer {
  instagram: string;
  approved: boolean;

  city?: string;
  postURIs?: string[];
  styles?: string[];

  about?: string;
  aboutRaw?: string;

  // instagram_data?: {
  //   id: string;
  //   token: string;
  // }
}
