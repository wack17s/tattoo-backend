import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityName } from 'src/city/city.types';
import { FindManyOptions, Repository } from 'typeorm';

import { Tattooer } from '../model/tattooer.entity';
import { InstagramService } from '../instagram/instagram.service';
import { StyleName } from '../style/style.types';

import { CreateTattooerDto } from './dto/tattooer.create.dto';

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

  // public async getMany(instagrams: string[]) {
  //   return await this.tattooerModel.findByIds(instagrams);
  // }

  // update
  public async createOne(createTattooerDto: CreateTattooerDto) {
    const oldTattooer = await this.tattooerModel.findOne({  where: { instagram: createTattooerDto.instagram }});

    const {
      instagram,
      city,
      styles,
      about,
      aboutRaw,
      profilePic,
      postIds,
      posts,
      postsCount,
      followersCount,
      followingCount,
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

    if (oldTattooer) {
      const updatedTattooer = this.tattooerModel.create({
        instagram,
        about,
        aboutRaw,
        profilePic,
        postsCount,
        followersCount,
        followingCount,
        posts: posts || newPosts,
        city: CityName[city] || undefined,
        styles: styles && styles.length ? styles.map(style => StyleName[style] || undefined).filter(item => !!item) : undefined,
      });
  
      await this.tattooerModel.update({ id: oldTattooer.id }, updatedTattooer);
  
      return updatedTattooer;
    } else {
      const createdTattooer = this.tattooerModel.create({
        instagram,
        about,
        aboutRaw,
        profilePic,
        postsCount,
        followersCount,
        followingCount,
        posts: posts || newPosts,
        city: CityName[city] || undefined,
        styles: styles && styles.length ? styles.map(style => StyleName[style] || undefined).filter(item => !!item) : undefined,
      });
  
      await this.tattooerModel.save(createdTattooer);
  
      return createdTattooer;
    }
  }

  // public async updateMany(createTattooerDtos: CreateTattooerDto[]) {
  //   return await Promise.all(createTattooerDtos.map(item => this.createOne(item)));
  // }

  public async deleteOne(instagram: string) {
    return await this.tattooerModel.delete({ instagram });
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