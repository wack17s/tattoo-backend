import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res, UseGuards } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { In } from 'typeorm';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { CreateStyleDto } from './dto/create.style.dto';
import { StyleService } from './style.service';

@Controller('style')
export class StyleController {
  constructor(private styleService: StyleService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string, id?: string | string; }, @Res() res: any) {
    const { _end, _order, _sort, _start, id } = params;

    if (id) {
      const styles = await this.styleService.getList({
        where: { id: In(typeof id === 'string' ? [id] : id) },
        order: { name: "ASC" },
    });

      res.set('X-Total-Count', styles.length);

      return res.send(JSON.stringify(styles));
    }

    const allStyles = await this.styleService.getList();

    res.set('X-Total-Count', allStyles.length);

    if (!params || isEmpty(params)) {
      return res.send(JSON.stringify(allStyles));
    }

    const styles = await this.styleService.getList({
      order: _sort && _order ? { [_sort]: _order } : undefined,
      skip: _start ? Number(_start) : undefined,
      take: _end && _start ? Number(_end) - Number(_start) : undefined
    });

    return res.send(JSON.stringify(styles));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async findOne(@Param('id') id: string) {
    return (await this.styleService.getOne(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createOne(@Body() createStyleDto: CreateStyleDto) {
    const style = await this.styleService.createOne(createStyleDto);

    return JSON.stringify(style);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateOne(@Param('id') id: string, @Body() createStyleDto: CreateStyleDto) {
    const style = await this.styleService.updateOne(id, { ...createStyleDto });

    return JSON.stringify(style);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async deleteOne(@Param('id') id: string) {
    const style = await this.styleService.deleteOne(id);

    return JSON.stringify(style);
  }
}
