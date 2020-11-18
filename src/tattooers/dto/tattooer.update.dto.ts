export interface UpdateTattooerDto {
  instagram: string; // index // id

  city?: string;
  styles?: string[];
  about?: string;

  aboutRaw?: string;
  postIds?: string[];
}
