import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from './myLogger.service';

@Catch()
export class MyExceptionFilter implements ExceptionFilter {
  constructor(private readonly myLoggerService: MyLogger) {
    this.myLoggerService.setContext(MyExceptionFilter.name);
  }

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const res = JSON.parse(JSON.stringify(exception.getResponse()));

    response.status(status).json({
      message: 'Internal Server Error',
      ...res,
      statusCode: status || 500,
      path: request.url,
    });
  }
}
