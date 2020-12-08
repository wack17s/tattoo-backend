import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { City } from '../model/city.entity';

import { CreateCityDto } from './dto/create.city.dto';

@Injectable()
export class CityService {
  constructor(@InjectRepository(City) private readonly cityModel: Repository<City>) {}

  public async getList(params?: FindManyOptions) {
    return (await this.cityModel.find(params));
  }

  public async getOne(name: CreateCityDto['name']) {
    return await this.cityModel.findOne({ name });
  }

  public async createOne(createCityDto: CreateCityDto) {
    try {
      const createdCity = this.cityModel.create({ ...createCityDto });

      await this.cityModel.save(createdCity);

      return createdCity;
    } catch (error) {
      console.log('CityService createOne: ', error);
    }
  }

  public async deleteOne(name: CreateCityDto['name']) {
    return await this.cityModel.delete({ name });
  }
}