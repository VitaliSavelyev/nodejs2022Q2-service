import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from './myLogger.service';

@Module({
  imports: [ConfigModule],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
