import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tattooer } from '../model/tattooer.entity';
import { InstagramModule } from '../instagram/instagram.module';

import { TattooerService } from './tattooer.service';
import { TattooerController } from './tattooer.controller';

@Module({
  providers: [TattooerService],
  controllers: [TattooerController],
  imports: [TypeOrmModule.forFeature([Tattooer]), InstagramModule],
  exports: []
})
export class TattooerModule {}
