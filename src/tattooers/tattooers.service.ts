import { Inject, Injectable } from '@nestjs/common';

import { Tattooer } from './interfaces/tattooer.interface';
import { Firestore } from 'src/firestore/firestore';

@Injectable()
export class TattooersService {
  private firestore: Firestore;

  public constructor(@Inject('FIRESTORE') firestore: Firestore) {
    this.firestore = firestore;
  }

  async findAll(): Promise<Tattooer[]> {
    const tattooers = await this.firestore.getAll<Tattooer>('tattooers');

    return tattooers;
  }

  async getOne(tattooerId: string): Promise<Tattooer> {
    const tattooer = await this.firestore.getOne<Tattooer>('tattooers', tattooerId);

    return tattooer;
  }

  async findQuery(queries: ({ key: string, value: string } | { array: string, value: string[] })[]): Promise<Tattooer[]> {
    const tattooers = await this.firestore.getQuery<Tattooer>('tattooers', queries);

    return tattooers;
  }
}