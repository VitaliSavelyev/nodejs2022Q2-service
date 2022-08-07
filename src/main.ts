import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import * as fs from 'fs/promises';
import { MyLogger } from './logger/myLogger.service';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const configService = app.get(ConfigService);
  app.useLogger(new MyLogger(configService));

  const customLoggerService = new MyLogger(configService);
  customLoggerService.setContext(bootstrap.name);

  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;

    customLoggerService.warn(errorLog, bootstrap.name);
  });

  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;

    customLoggerService.warn(errorLog, bootstrap.name);
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const rootDirname = path.dirname(__dirname);
  const DOC_API = await fs.readFile(
    path.join(rootDirname, 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);
  await app.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
  });
}
bootstrap();
