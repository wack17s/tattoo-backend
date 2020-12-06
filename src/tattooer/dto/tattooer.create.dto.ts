export interface CreateTattooerDto {
  instagram: string; // index // id

  city?: string;
  styles?: string[];

  about?: string;
  aboutRaw?: string;
  
  profilePic?: string;
  
  postIds?: string[];
  posts?: { id: string; uri: string; }[];

  postsCount?: string;
  followersCount?: string;
  followingCount?: string;
}
