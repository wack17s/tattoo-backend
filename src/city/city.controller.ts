import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res } from '@nestjs/common';
import { isEmpty } from 'lodash';

import { CreateCityDto } from './dto/create.city.dto';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string }, @Res() res: any) {
    const { _end, _order, _sort, _start } = params;

    const allStyles = await this.cityService.getList();

    res.set('X-Total-Count', allStyles.length);

    if (!params || isEmpty(params)) {
      return res.send(JSON.stringify(allStyles));
    }

    const cities = await this.cityService.getList({
      order: _sort && _order ? { [_sort]: _order } : undefined,
      skip: _start ? Number(_start) : undefined,
      take: _end && _start ? Number(_end) - Number(_start) : undefined
    });

    return res.send(JSON.stringify(cities));
  }

  @Post()
  public async createOne(@Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.createOne(createCityDto);

    return JSON.stringify(city);
  }

  @Put(':name')
  public async updateOne(@Param('name') name: CreateCityDto['name'], @Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.createOne({ name, ...createCityDto });

    return JSON.stringify(city);
  }

  @Delete(':name')
  public async deleteOne(@Param('name') name: CreateCityDto['name']) {
    const city = await this.cityService.deleteOne(name);

    return JSON.stringify(city);
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