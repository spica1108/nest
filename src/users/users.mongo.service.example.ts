import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

// 这是一个教学版 service，专门演示 InjectModel() 和常见 Mongoose 写法。
@Injectable()
export class UsersMongoServiceExample {
  //把刚才在模块里注册好的 User model 注入进来，命名为 userModel
  constructor(
    @InjectModel(User.name)
    //类比成 usersService: UsersService
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(username: string, nickname: string) {
    //先创建一个 Mongoose 文档对象
    const user = new this.userModel({
      username,
      nickname,
    });
    //把它存到数据库里
    return user.save();
  }
  //`findOneByUsername()：根据用户名查用户
  //findOne()在真实项目里特别常见，比如：登录时按用户名查用户 ，按邮箱查用户 ，按 openid 查用户
  //.exec() ： “把这个查询真正执行掉，并返回 Promise。”
  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  //去 MongoDB 按 id 找这条用户记录
  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }
}
