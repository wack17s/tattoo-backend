import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityName } from 'src/city/city.types';
import { Repository } from 'typeorm';

import { Tattooer } from '../model/tattooer.entity';
import { InstagramService } from '../instagram/instagram.service';
import { StyleName } from '../style/style.types';

import { CreateTattooerDto } from './dto/tattooer.create.dto';

@Injectable()
export class TattooerService {
  constructor(@InjectRepository(Tattooer) private readonly tattooerModel: Repository<Tattooer>, private instagramService: InstagramService) {
    // dirtyTatts.tattooers.forEach(async item => {
    //   this.createOne(item)
    // })
  }

  public async getAll() {
    return (await this.tattooerModel.find()).length;
  }

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
}