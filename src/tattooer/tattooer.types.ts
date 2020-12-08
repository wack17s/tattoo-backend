export interface ICreateTattooer {
  instagram: string; // index // id

  city_id?: string;
  style_ids?: string[];

  about?: string;
  aboutRaw?: string;
  
  profilePic?: string;
  
  postIds?: string[];
  posts?: { id: string; uri: string; }[];

  postsCount?: string;
  followersCount?: string;
  followingCount?: string;
}
