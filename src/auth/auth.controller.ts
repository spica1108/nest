import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
//auth 这个控制器下面的接口，默认都要先经过 JwtAuthGuard
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  //POST /auth/login 本来也会受保护，但它额外加了 @Public()，
  // 所以被放行，不需要 JWT 认证就能访问
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username);
  }

  //GET /auth/profile默认受保护
  @Get('profile')
  profile(
    @Req() req: Request & { user: { userId: string; username: string } },
  ) {
    return {
      message: '这是受保护接口',
      user: req.user,
    };
  }
}
