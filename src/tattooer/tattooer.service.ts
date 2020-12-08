import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Tattooer } from '../model/tattooer.entity';
import { InstagramService } from '../instagram/instagram.service';

import { ICreateTattooer } from './tattooer.types';

@Injectable()
export class TattooerService {
  constructor(
    @InjectRepository(Tattooer) private readonly tattooerModel: Repository<Tattooer>,
    private instagramService: InstagramService
  ) {}

  public async getList(params?: FindManyOptions) {
    return (await this.tattooerModel.find(params));
  }

  public async getOne(id: string) {
    return await this.tattooerModel.findOne({ id });
  }

  public async createOne(createTattooerDto: ICreateTattooer) {
    const {
      postIds,
      posts,
      ...createTattooer
    } = createTattooerDto;

    let newPosts = []

    if (postIds && postIds.length) {
      const posts = await Promise.all(postIds.map(async postId => {
        const instagramPost = await this.instagramService.getPost(postId);

        if (instagramPost && instagramPost.thumbnail_url) {
          return {
            id: postId,
            uri: instagramPost.thumbnail_url
          };
        }

        return undefined;
      }));

      newPosts = posts.filter(item => !!item);
    }

    const createdTattooer = this.tattooerModel.create({
      ...createTattooer,
      posts: posts || newPosts,
    });

    return (await this.tattooerModel.save(createdTattooer));
  }

  public async updateOne(id: string, createTattooerDto: ICreateTattooer) {
    const oldTattooer = await this.tattooerModel.findOne({  where: { id }});

    const {
      postIds,
      posts,
      ...createTattooer
    } = createTattooerDto;

    let newPosts = []

    if (postIds && postIds.length) {
      const posts = await Promise.all(postIds.map(async postId => {
        const instagramPost = await this.instagramService.getPost(postId);

        if (instagramPost && instagramPost.thumbnail_url) {
          return {
            id: postId,
            uri: instagramPost.thumbnail_url
          };
        }

        return undefined;
      }));

      newPosts = posts.filter(item => !!item);
    }

    const updatedTattooer = this.tattooerModel.create({
      ...createTattooer,
      posts: posts || newPosts,
    });

    await this.tattooerModel.update({ id: oldTattooer.id, instagram: updatedTattooer.instagram }, updatedTattooer);

    return { id, ...updatedTattooer };
  }

  public async deleteOne(id: string) {
    return await this.tattooerModel.delete({ id });
  }
}

// getList	GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24&title=bar
// getOne	GET http://my.api.url/posts/123
// getMany	GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
// getManyReference	GET http://my.api.url/posts?author_id=345
// create	POST http://my.api.url/posts/123
// update	PUT http://my.api.url/posts/123
// updateMany	PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
// delete	DELETE http://my.api.url/posts/123