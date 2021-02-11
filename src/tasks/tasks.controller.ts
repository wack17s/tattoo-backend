import { Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Post('update-photos')
  @UseGuards(JwtAuthGuard)
  public async updatePhoto() {
    await this.tasksService.updateTattooersPosts();

    return JSON.stringify({ status: 1 });
  }
}
