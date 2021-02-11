import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VercelService } from '../vercel/vercel.service';
import { InstagramService } from '../instagram/instagram.service';
import { Tattooer } from '../model/tattooer.entity';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Tattooer) private readonly tattooerModel: Repository<Tattooer>,
    private instagramService: InstagramService,
    private vercelService: VercelService,
  ) {
    this.updateTattooersPosts();
  }

  // @Cron(CronExpression.EVERY_WEEK)
  public async updateTattooersPosts() {
    const tattooers = await this.tattooerModel.find();

    await Promise.all(tattooers.map(async tattooer => {
      if (!tattooer.posts || !tattooer.posts.length) {
        return;
      }

      const newPosts = await Promise.all(tattooer.posts.map(async post => {
        const newThumbnail = await this.instagramService.getPost(post.id);

        if (!newThumbnail || !newThumbnail.thumbnail_url) {
          return post;
        }

        return { id: post.id, uri: newThumbnail.thumbnail_url };
      }))

      await this.tattooerModel.update({ id: tattooer.id, instagram: tattooer.instagram }, { posts: newPosts });
    }));

    await this.vercelService.redeployMaster();

    this.logger.debug('[updateTattooersPosts] done');
  }
}
