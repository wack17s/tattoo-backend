export class Instagram {
  private appAccessToken: string;

  public constructor(config: { appAccessToken: string; }) {
    this.appAccessToken = config.appAccessToken;
  }

  public getPost = async (postId: string) => {
    return `https://graph.facebook.com/v8.0/instagram_oembed?url=https://www.instagram.com/p/${postId}/&access_token=${this.appAccessToken}`;
  }
}
