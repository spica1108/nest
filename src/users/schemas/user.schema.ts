//定义 MongoDB 里 User 这类数据长什么样。
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
//@nestjs/mongoose 提供 Nest 风格的 schema 装饰器
//mongoose 提供底层数据库能力
///HydratedDocument 可以理解成“从数据库查出来后的文档对象类型”

//以后 User 这类数据在数据库里查出来，对应的文档类型就叫 UserDocument
export type UserDocument = HydratedDocument<User>;

// 这一层相当于在告诉 Mongoose：用户数据长什么样。
//@Schema() 的意思就是：“这个类不是普通类，我要把它变成 Mongoose 的 schema。”
// timestamps: true 的意思是：Mongoose 会自动帮你加 createdAt 和 updatedAt。

@Schema({ timestamps: true })
export class User {
  //这是一个数据库字段，名字叫 username，类型是 string，必须有，不能重复
  @Prop({ required: true, unique: true })
  username: string;

  //这是一个数据库字段，名字叫 nickname，类型是 string，必须有
  @Prop({ required: true })
  nickname: string;

  //这是一个数据库字段，名字叫 age，类型是 number，不必须，默认值是 18
  @Prop({ default: 18 })
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
