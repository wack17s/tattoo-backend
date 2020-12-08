import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Style } from '../model/style.entity';

import { CreateStyleDto } from './dto/create.style.dto';

@Injectable()
export class StyleService {
  constructor(@InjectRepository(Style) private readonly styleModel: Repository<Style>) {}

  public async getList(params?: FindManyOptions) {
    return (await this.styleModel.find(params));
  }

  public async getOne(name: CreateStyleDto['name']) {
    return await this.styleModel.findOne({ name });
  }

  public async createOne(createStyleDto: CreateStyleDto) {
    try {
      const createdStyle = this.styleModel.create({ ...createStyleDto });

      await this.styleModel.save(createdStyle);

      return createdStyle;
    } catch (error) {
      console.log('StyleService createOne: ', error);
    }
  }

  public async deleteOne(name: CreateStyleDto['name']) {
    return await this.styleModel.delete({ name });
  }
}