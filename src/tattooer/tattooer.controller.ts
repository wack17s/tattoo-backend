import { Header, Controller, Get, Post, Body, Put, Delete, Param, Res, Query } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { CreateTattooerDto } from './dto/tattooer.create.dto';
import { TattooerService } from './tattooer.service';

@Controller('tattooer')
export class TattooerController {
  constructor(private tattooerService: TattooerService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string }, @Res() res: any) {
    const { _end, _order, _sort, _start } = params;

    const allTattooers = await this.tattooerService.getList();

    res.set('X-Total-Count', allTattooers.length);

    if (!params || isEmpty(params)) {
      return res.send(JSON.stringify(allTattooers));
    }

    const tattooers = await this.tattooerService.getList({
      order: _sort && _order ? { [_sort]: _order } : undefined,
      skip: _start ? Number(_start) : undefined,
      take: _end && _start ? Number(_end) - Number(_start) : undefined
    });

    return res.send(JSON.stringify(tattooers));
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return (await this.tattooerService.getOne(id));
  }

  @Post(':id')
  public async createOne(@Param('id') id: string, @Body() createTattooerDto: CreateTattooerDto) {
    const tattooer = await this.tattooerService.createOne({ ...createTattooerDto });

    return JSON.stringify(tattooer);
  }

  @Put(':id')
  public async updateOne(@Param('id') id: string, @Body() createTattooerDto: CreateTattooerDto) {
    const tattooer = await this.tattooerService.updateOne(id, { ...createTattooerDto });

    console.warn('wtf', tattooer)

    return JSON.stringify(tattooer);
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string) {
    const tattooer = await this.tattooerService.deleteOne(id);

    return JSON.stringify(tattooer);
  }
}

// getList	GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24&title=bar
// getOne	GET http://my.api.url/posts/123
// getMany	GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
// getManyReference	GET http://my.api.url/posts?author_id=345
// create	POST http://my.api.url/posts/123
// update	PUT http://my.api.url/posts/123
// updateMany	PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
// delete	DELETE http://my.api.url/posts/123