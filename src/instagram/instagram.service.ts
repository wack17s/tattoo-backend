import { Injectable, HttpService } from "@nestjs/common";

import { instagramConfig } from "./instagramConfig";

@Injectable()
export class InstagramService {
  public constructor(private httpService: HttpService) {}

  public getPost = async (postId: string): Promise<{ thumbnail_url: string; } | null> => {
    try {
      const response = await this.httpService.get<{ thumbnail_url: string; }>(`https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/${postId}/&access_token=${instagramConfig.appAccessToken}`).toPromise();

      console.log('instagram post', response.data)

      return response.data;
    } catch (error) {
      console.log('[insstagram get post error]', error);

      return null;
    }
  }
}
