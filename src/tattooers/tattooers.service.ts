import { Inject, Injectable } from '@nestjs/common';

import { Firestore } from '../firestore/firestore';

import { Tattooer } from './interfaces/tattooer.interface';
import { UpdateTattooerDto } from './dto/tattooer.update.dto';
import { InstagramService } from 'src/instagram/instagram.service';

@Injectable()
export class TattooersService {
  private firestore: Firestore;
  // private instagramService: InstagramService;

  public constructor(@Inject('FIRESTORE') firestore: Firestore, private instagramService: InstagramService) {
    this.firestore = firestore;
    // this.instagramService = instagramService;
  }

  async findAll(): Promise<Tattooer[]> {
    const tattooers = await this.firestore.getAll<Tattooer>('tattooers');

    return tattooers;
  }

  async getOne(tattooerId: string): Promise<Tattooer | null> {
    const tattooer = await this.firestore.getOne<Tattooer>('tattooers', tattooerId);

    return tattooer;
  }

  async findQuery(queries: ({ key: string, value: string } | { array: string, value: string[] })[]): Promise<Tattooer[]> {
    const tattooers = await this.firestore.getQuery<Tattooer>('tattooers', queries);

    return tattooers;
  }

  async createOne(tattooerRaw: UpdateTattooerDto): Promise<Tattooer | null> {
    console.log('tattooerRaw', tattooerRaw)
    const tattooer: Tattooer = {
      instagram: tattooerRaw.instagram,
      approved: false,

      aboutRaw: tattooerRaw.aboutRaw,
      about: tattooerRaw.about
    };

    if (tattooerRaw.postIds && tattooerRaw.postIds.length) {
      const instagramPosts = await Promise.all(tattooerRaw.postIds.map(postId => this.instagramService.getPost(postId)));

      instagramPosts.forEach(instagramPost => {
        if (instagramPost && instagramPost.thumbnail_url) {
          if (tattooer.postURIs) {
            tattooer.postURIs.push(instagramPost.thumbnail_url);
          } else {
            tattooer.postURIs = [ instagramPost.thumbnail_url ];
          }
        }
      })
    }
  
    await this.firestore.addOne('tattooers', tattooer.instagram, tattooer);

    return tattooer;
  }
}
