import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateTattooerDto } from './dto/tattooer.create.dto';
import { TattooerService } from './tattooer.service';

@Controller('tattooer')
export class TattooerController {
  constructor(private tattooerService: TattooerService) { }

  @Get()
  public async getAll() {
    return await this.tattooerService.getAll();
  }

  @Post()
  public async createOne(@Body() createTattooerDto: CreateTattooerDto) {
    const tattooer = await this.tattooerService.createOne(createTattooerDto);

    return JSON.stringify(tattooer);
  }
}
