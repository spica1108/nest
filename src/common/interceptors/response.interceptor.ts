//·全局响应拦截器
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T = unknown> {
  code: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  ResponseFormat<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const http = context.switchToHttp();
    const request = http.getRequest();

    return next.handle().pipe(
      map((data) => ({
        code: HttpStatus.OK,
        message: '操作成功',
        data,
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
