import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res, UseGuards } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { In } from 'typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateCityDto } from './dto/create.city.dto';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string, id?: string | string[] }, @Res() res: any) {
    const { _end, _order, _sort, _start, id } = params;

    if (id) {
      const cities = await this.cityService.getList({
        where: { id: In(typeof id === 'string' ? [id] : id) },
        order: { name: "ASC" },
    });

      res.set('X-Total-Count', cities.length);

      return res.send(JSON.stringify(cities));
    }

    const allCities = await this.cityService.getList();

    res.set('X-Total-Count', allCities.length);

    if (!params || isEmpty(params)) {
      return res.send(JSON.stringify(allCities));
    }

    const cities = await this.cityService.getList({
      order: _sort && _order ? { [_sort]: _order } : undefined,
      skip: _start ? Number(_start) : undefined,
      take: _end && _start ? Number(_end) - Number(_start) : undefined
    });

    return res.send(JSON.stringify(cities));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('id') id: string) {
    return (await this.cityService.getOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createOne(@Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.createOne(createCityDto);

    return JSON.stringify(city);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateOne(@Param('id') id: string, @Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.updateOne(id, { ...createCityDto });

    return JSON.stringify(city);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteOne(@Param('id') id: string) {
    const city = await this.cityService.deleteOne(id);

    return JSON.stringify(city);
  }
}
