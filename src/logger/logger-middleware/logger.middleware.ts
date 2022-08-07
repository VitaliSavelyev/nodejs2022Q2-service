import { HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common/services/logger.service';
import { Request, Response, NextFunction } from 'express';
import { MyLogger } from '../myLogger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private myLoggerService: MyLogger;

  constructor(private configService: ConfigService) {
    this.myLoggerService = new MyLogger(this.configService);
    this.myLoggerService.setContext(LoggerMiddleware.name);
  }

  // private getLogLevelsMiddleware(level: string): LogLevel[] {
  //   switch (this.levels[level]) {
  //     case 'debug':
  //       return ['debug'];
  //     case 'verbose':
  //       return ['debug', 'verbose'];
  //     case 'log':
  //       return ['debug', 'verbose', 'log'];
  //     case 'warn':
  //       return ['debug', 'verbose', 'log', 'warn'];
  //     case 'error':
  //       return ['debug', 'verbose', 'log', 'warn', 'error'];
  //   }
  // }

  use(request: Request, response: Response, next: NextFunction): void {
    const { body, query, ip, method, originalUrl, params } = request;

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;

      if (statusCode >= HttpStatus.BAD_REQUEST) return;

      const message = `
        Response Code: ${statusCode}
        Method: ${method} 
        URL: ${originalUrl}
        IP: ${ip}
        Body: ${JSON.stringify(body)}
        Params: ${JSON.stringify(params)}
        Query params: ${JSON.stringify(query)}
        StatusCode: ${statusCode} StatusMessage: ${statusMessage}
      `;

      this.myLoggerService.log(message, LoggerMiddleware.name);
    });

    next();
  }
}
