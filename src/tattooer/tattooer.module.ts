import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tattooer } from '../model/tattooer.entity';
import { InstagramModule } from '../instagram/instagram.module';

import { TattooerService } from './tattooer.service';
import { TattooerController } from './tattooer.controller';
import { TattooerReadyController } from './tattooer-ready.controller';
import { TattooerNotReadyController } from './tattooer-not-ready.controller';

@Module({
  providers: [TattooerService],
  controllers: [TattooerController, TattooerReadyController, TattooerNotReadyController],
  imports: [TypeOrmModule.forFeature([Tattooer]), InstagramModule],
  exports: []
})
export class TattooerModule {}
