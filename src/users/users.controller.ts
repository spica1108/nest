import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

//表示路径是 /users
@Controller('users')
export class UsersController {
  //这个 UsersController 需要一个 UsersService，请 Nest 创建好后给我
  //所以不是自己写const usersService = new UsersService();而是 Nest帮你准备，这就是依赖注入
  constructor(private readonly usersService: UsersService) {}

  //表示处理的是get请求
  @Get()
  getAll(): string[] {
    return this.usersService.getAll();
  }

  //@Post()：处理 POST /users
  @Post()
  //旧写法：直接从请求体中单独取 name
  // createOld(@Body('name') name: string): string {
  //   return this.usersService.create(name);
  // }
  //新写法：用 DTO 接收整个请求体对象
  //@Body()：把整个请求体拿进来
  //createUserDto：用一个 DTO 对象来接收它，CreateUserDto：定义请求体应该有哪些字段
  create(@Body() createUserDto: CreateUserDto): string {
    return this.usersService.create(createUserDto.name);
  }

  @Put(':id')
  update(
    //@Param('id')：从路径里取用户 id
    @Param('id') id: string,
    //@Body()：从请求体里取更新数据
    @Body() updateUserDto: UpdateUserDto,
  ): string {
    return this.usersService.update(id, updateUserDto.name);
  }

  @Get('search')
  //取“问号后面的参数”，/users/search?name=张
  search(@Query('name') name: string): string[] {
    return this.usersService.searchByName(name ?? '');
  }

  @Delete(':id')
  //@Param('id')：从路径里拿到 id
  remove(@Param('id') id: string): string {
    return this.usersService.remove(id);
  }

  ///users/:id
  @Get(':id')
  getById(@Param('id') id: string): string {
    return this.usersService.getById(id);
  }
}
//两者拼起来就是：GET /users
//当请求进来时，会执行 getAll()
