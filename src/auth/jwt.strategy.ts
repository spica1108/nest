//JWT 的校验规则
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  //JWT 密钥不再写死在代码里，而是通过 Nest 的 ConfigService 从环境变量里读取。
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ?? 'nest-learning-secret',
    });
  }

  validate(payload: { userId: string; username: string }) {
    return {
      userId: payload.userId,
      username: payload.username,
    };
  }
}
