import { Injectable, HttpService, Logger } from "@nestjs/common";

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);

  public constructor(private httpService: HttpService) {}

  public getPost = async (postId: string): Promise<{ thumbnail_url: string; } | null> => {
    try {
      const response = await this.httpService.get<{ thumbnail_url: string; error?: string; }>(`https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/${postId}/&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`).toPromise();

      return response.data;
    } catch (error) {
      this.logger.error(`[instagram get post error]: ${error}`);

      return null;
    }
  }
}
