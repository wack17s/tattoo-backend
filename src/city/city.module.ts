import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { City } from '../model/city.entity';

import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  providers: [CityService],
  controllers: [CityController],
  imports: [TypeOrmModule.forFeature([City])],
  exports: [CityService]
})
export class CityModule {}
