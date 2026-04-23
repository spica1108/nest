import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string) {
    const user = {
      userId: '1',
      username,
    };

    const accessToken = this.jwtService.sign(user);
    //意思是把这个用户对象，签成一个 JWT 字符串，再返回给前端
    //生成 token 的人是 AuthService，用来生成 token 的工具是 JwtService

    return {
      accessToken,
      user,
    };
  }
}
