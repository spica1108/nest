//专门管 users 数据
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll(): string[] {
    return ['张三', '李四', '王五'];
  }

  create(name: string): string {
    return `创建用户: ${name}`;
  }

  remove(id: string): string {
    const user = this.getById(id);
    return `删除用户 ${id}: ${user}`;
  }

  update(id: string, name: string): string {
    this.getById(id);

    return `更新用户 ${id}: ${name}`;
  }

  searchByName(name: string): string[] {
    return this.getAll().filter((user) => user.includes(name));
  }

  getById(id: string): string {
    const users = this.getAll();
    const index = Number(id) - 1;
    const user = users[index];

    if (!user) {
      throw new NotFoundException('用户不存在');
    }

    return user;
  }
}
//@Injectable()：这个类可以被注入
//providers: [UsersService]：把它注册到 Nest 容器里
//constructor(private readonly usersService: UsersService)：把它拿出来用
