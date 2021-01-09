import { Injectable, HttpService, Logger } from "@nestjs/common";

@Injectable()
export class VercelService {
  private readonly logger = new Logger(VercelService.name);

  public constructor(private httpService: HttpService) {}

  public redeployMaster = async () => {
    try {
      await this.httpService.post(process.env.VERCEL_REDEPLOY_HOOK).toPromise();
    } catch (error) {
      this.logger.error(`[vercel redeploy error]: ${error}`);
    }
  }
}
