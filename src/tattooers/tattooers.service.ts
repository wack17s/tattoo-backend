import { Injectable } from '@nestjs/common';

import { firestoreService } from '../services/firestore/firestore.service';

import { Tattooer } from './interfaces/tattooer.interface';

@Injectable()
export class TattooersService {
  // private readonly tattooers: Tattooer[] = [];

  // create(tattooer: Tattooer) {
  //   this.tattooers.push(tattooer);
  // }

  async findAll(): Promise<Tattooer[]> {
    const tattooers = await firestoreService.getAll<Tattooer>('tattooers');

    return tattooers;
  }

  async getOne(tattooerId: string): Promise<Tattooer> {
    const tattooer = await firestoreService.getOne<Tattooer>('tattooers', tattooerId);

    return tattooer;
  }

  async findQuery(queries: ({ key: string, value: string } | { array: string, value: string[] })[]): Promise<Tattooer[]> {
    const tattooers = await firestoreService.getQuery<Tattooer>('tattooers', queries);

    return tattooers;
  }
}