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

  public async getOne(id: string) {
    return await this.styleModel.findOne({ id });
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

  public async updateOne(id: string, createStyleDto: CreateStyleDto) {
    try {
      await this.styleModel.update({ id }, { ...createStyleDto });
    } catch (error) {
      console.log('StyleService updateOne: ', error);
    }
  }

  public async deleteOne(id: string) {
    return await this.styleModel.delete({ id });
  }
}