//把用户 schema 注册成 model
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersMongoServiceExample } from './users.mongo.service.example';

// 这是一个教学版模块，用来演示 forFeature() 在模块里怎么注册 schema。
// 它暂时没有接到 AppModule 里，目的是让你先看懂结构，再决定什么时候真正接数据库。
@Module({
  imports: [
    //model 名字叫 User，它对应的数据结构就是我们刚定义的那个 schema
    // Nest 是模块化的。你不是全局到处乱用 model，而是在哪个模块里要用，就把哪个 model 注册进去。
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersMongoServiceExample],
  exports: [UsersMongoServiceExample],
})
export class UsersMongoModuleExample {}
