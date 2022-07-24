import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
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
