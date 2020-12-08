import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Style } from '../model/style.entity';

import { StyleController } from './style.controller';
import { StyleService } from './style.service';

@Module({
  providers: [StyleService],
  controllers: [StyleController],
  imports: [TypeOrmModule.forFeature([Style])],
  exports: [StyleService]
})
export class StyleModule {}
