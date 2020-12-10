// import { Controller, Get, Post, Body, Put, Delete, Param, Header, Query, Res } from '@nestjs/common';

// import { CreateUserDto } from './dto/create.user.dto';
// import { UserService } from './user.service';

// @Controller('user')
// export class UserController {
//   constructor(private userService: UserService) { }

//   @Get()
//   @Header('Access-Control-Expose-Headers', 'X-Total-Count')
//   public async getList(@Query() params: { _end?: string, _order?: 'ASC' | 'DESC', _sort?: string, _start?: string }, @Res() res: any) {
//     // const { _end, _order, _sort, _start } = params;

//     const allStyles = await this.userService.getList();

//     res.set('X-Total-Count', allStyles.length);

//     return res.send(JSON.stringify(allStyles));
//   }

//   @Get(':id')
//   public async findOne(@Param('id') id: string) {
//     return (await this.userService.getOne(id));
//   }

//   @Post()
//   public async createOne(@Body() createUserDto: CreateUserDto) {
//     const user = await this.userService.createOne(createUserDto);

//     return JSON.stringify(user);
//   }

//   @Put(':id')
//   public async updateOne(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
//     const user = await this.userService.updateOne(id, { ...createUserDto });

//     return JSON.stringify(user);
//   }

//   @Delete(':id')
//   public async deleteOne(@Param('id') id: string) {
//     const user = await this.userService.deleteOne(id);

//     return JSON.stringify(user);
//   }
// }

// // getList	GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24&title=bar
// // getOne	GET http://my.api.url/posts/123
// // getMany	GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
// // getManyReference	GET http://my.api.url/posts?author_id=345
// // create	POST http://my.api.url/posts/123
// // update	PUT http://my.api.url/posts/123
// // updateMany	PUT http://my.api.url/posts/123, PUT http://my.api.url/posts/456, PUT http://my.api.url/posts/789
// // delete	DELETE http://my.api.url/posts/123