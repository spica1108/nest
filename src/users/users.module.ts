import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController], //接请求
  providers: [UsersService], //提供业务能力
})
export class UsersModule {}
