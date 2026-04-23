//入口文件
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
//用 AppModule 作为整个应用的根模块，创建 Nest 应用实例，并启动它监听指定的端口。
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //开启全局校验：所有走 DTO 的请求都会先按规则检查
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
