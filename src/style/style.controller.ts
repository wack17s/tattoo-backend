import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res } from '@nestjs/common';

import { CreateStyleDto } from './dto/create.style.dto';
import { StyleService } from './style.service';

@Controller('style')
export class StyleController {
  constructor(private styleService: StyleService) { }

  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string }, @Res() res: any) {
    // const { _end, _order, _sort, _start } = params;

    const allStyles = await this.styleService.getList();

    res.set('X-Total-Count', allStyles.length);

    return res.send(JSON.stringify(allStyles));
  }

  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return (await this.styleService.getOne(id));
  }

  @Post()
  public async createOne(@Body() createStyleDto: CreateStyleDto) {
    const style = await this.styleService.createOne(createStyleDto);

    return JSON.stringify(style);
  }

  @Put(':id')
  public async updateOne(@Param('id') id: string, @Body() createStyleDto: CreateStyleDto) {
    const style = await this.styleService.updateOne(id, { ...createStyleDto });

    return JSON.stringify(style);
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string) {
    const style = await this.styleService.deleteOne(id);

    return JSON.stringify(style);
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