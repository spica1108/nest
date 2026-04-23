//总入口
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // 读取 .env，让配置通过 ConfigService 注入到项目里
    //让整个项目都能用 ConfigService 读配置。
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  //提供全局服务和全局中间件
  providers: [
    AppService,
    {
      //全局响应包装
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      //全局异常处理
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
