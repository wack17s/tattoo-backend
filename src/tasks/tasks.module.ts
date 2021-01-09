import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tattooer } from '../model/tattooer.entity';
import { InstagramModule } from '../instagram/instagram.module';

import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tattooer]), InstagramModule],
  providers: [TasksService],
  exports: []
})
export class TasksModule {}
