import { Header, Controller, Get, Post, Body, Put, Delete, Param, Res, Query, UseGuards } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { In } from 'typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateTattooerDto } from './dto/tattooer.create.dto';
import { TattooerService } from './tattooer.service';

@Controller('tattooer-ready')
export class TattooerReadyController {
  constructor(private tattooerService: TattooerService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string, id?: string }, @Res() res: any) {
    const { _end, _order, _sort, _start, id } = params;

    if (id) {
      const tattooer = await this.tattooerService.getList({
        where: { id: In(typeof id === 'string' ? [id] : id) },
        order: { name: "ASC" },
    });

      res.set('X-Total-Count', 1);

      return res.send(JSON.stringify([tattooer]));
    }

    const allTattooers = await this.tattooerService.getList({ where: { readyToShow: true } });

    console.log('allTattooers', allTattooers)

    res.set('X-Total-Count', allTattooers.length);

    if (!params || isEmpty(params)) {
      return res.send(JSON.stringify(allTattooers));
    }

    const tattooers = await this.tattooerService.getList({
      where: { readyToShow: true },
      order: _sort && _order ? { [_sort]: _order } : undefined,
      skip: _start ? Number(_start) : undefined,
      take: _end && _start ? Number(_end) - Number(_start) : undefined
    });

    return res.send(JSON.stringify(tattooers));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('id') id: string) {
    return (await this.tattooerService.getOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createOne(@Body() createTattooerDto: CreateTattooerDto) {
    const tattooer = await this.tattooerService.createOne({ ...createTattooerDto });

    return JSON.stringify(tattooer);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateOne(@Param('id') id: string, @Body() createTattooerDto: CreateTattooerDto) {
    const tattooer = await this.tattooerService.updateOne(id, { ...createTattooerDto });

    return JSON.stringify(tattooer);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteOne(@Param('id') id: string) {
    const deleteResult = await this.tattooerService.deleteOne(id);

    return JSON.stringify(deleteResult);
  }
}
