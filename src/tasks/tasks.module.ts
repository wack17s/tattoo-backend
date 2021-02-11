import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VercelModule } from '../vercel/vercel.module';
import { Tattooer } from '../model/tattooer.entity';
import { InstagramModule } from '../instagram/instagram.module';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tattooer]), InstagramModule, VercelModule],
  providers: [TasksService],
  controllers: [TasksController],
  exports: []
})
export class TasksModule {}
