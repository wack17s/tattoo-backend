import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res } from '@nestjs/common';

import { CreateCityDto } from './dto/create.city.dto';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private cityService: CityService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string }, @Res() res: any) {
    // const { _end, _order, _sort, _start } = params;

    const allStyles = await this.cityService.getList();

    res.set('X-Total-Count', allStyles.length);

    return res.send(JSON.stringify(allStyles));
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return (await this.cityService.getOne(id));
  }

  @Post()
  public async createOne(@Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.createOne(createCityDto);

    return JSON.stringify(city);
  }

  @Put(':id')
  public async updateOne(@Param('id') id: string, @Body() createCityDto: CreateCityDto) {
    const city = await this.cityService.updateOne(id, { ...createCityDto });

    return JSON.stringify(city);
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string) {
    const city = await this.cityService.deleteOne(id);

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