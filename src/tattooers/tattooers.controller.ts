import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

import { TattooersService } from './tattooers.service';
import { CreateTattooerDto, UpdateTattooerDto, QueryParams } from './dto';

@Controller('tattooers')
export class TattooersController {
  constructor(private tattooersService: TattooersService) {}

  @Get()
  async findAll(@Query() query: QueryParams) {
    let queries = [];

    if (query.city) {
      queries.push({ key: 'city', value: query.city });
      
    }

    if (query.styles) {
      queries.push({ array: 'styles', value: query.styles.split(',') });
      
    }

    if (queries.length) {
      const tattooers = await this.tattooersService.findQuery(queries);

      if (!tattooers.length) {
        return `No tattooers with such city ${query.city}`;
      }

      return tattooers;
    }

    const tattooers = await this.tattooersService.findAll();

    return tattooers;
  }

  @Get(':id')
  async findOne(@Param() params) {
    const tattooer = await this.tattooersService.getOne(params.id);

    if (!tattooer) {
      return `No tattooers with such name ${params.id}`;
    }

    return tattooer;
  }

  @Post()
  create(@Body() createTattooerDto: CreateTattooerDto) {
    return 'This action adds a new tattooer';
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTattooerDto: UpdateTattooerDto) {
    return `This action updates a #${id} tattooer`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} tattooer`;
  }
}
