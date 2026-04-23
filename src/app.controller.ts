//路由入口
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //处理get请求，访问首页执行函数
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
