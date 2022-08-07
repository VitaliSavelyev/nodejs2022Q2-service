import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogLevel } from '@nestjs/common/services/logger.service';
import * as fs from 'fs/promises';
import { EOL } from 'os';

@Injectable()
export class MyLogger extends ConsoleLogger {
  fileName = '';
  fileSize = 2000;

  constructor(private readonly configService: ConfigService) {
    super();
    const logLevels: LogLevel[] =
      this.configService.get('NODE_ENV') === 'production'
        ? ['log', 'warn', 'error']
        : ['error', 'warn', 'log', 'verbose', 'debug'];

    this.setLogLevels(logLevels);
    if (configService.get('MAX_LOGGER_FILE')) {
      this.fileSize = Number(configService.get('MAX_LOGGER_FILE'));
    }
  }

  async log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    await this.createLog(message, context, 'log');
  }

  async error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);

    await this.createLog(message, context, 'error');
  }

  async warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    await this.createLog(message, context, 'warn');
  }

  async debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    await this.createLog(message, context, 'debug');
  }

  async verbose(message: string, context?: string) {
    super.verbose.apply(this, [message, context]);

    await this.createLog(message, context, 'verbose');
  }

  async createLog(message, context, type): Promise<void> {
    const saveMessage = `[NEST] ${new Date().toUTCString()} [Level: ${type}] Context: ${context} Message: ${message}${EOL}`;
    try {
      const files = await fs.readdir('src/logs');
      const currentFile = files.some((elem) => elem === this.fileName);
      if (!currentFile) {
        this.fileName = `${type}_${context}_${Date.now()}.log`;
        await this.createFile(saveMessage);
      } else {
        const lastFileStat = await fs.stat(`src/logs/${this.fileName}`);
        if (lastFileStat.size >= this.fileSize) {
          this.fileName = `${type}_${context}_${Date.now()}.log`;
          await this.createFile(saveMessage);
        } else {
          await this.addedLog(saveMessage);
        }
      }
    } catch (error) {
      await fs.mkdir('src/logs');
      await this.createFile(saveMessage);
    }
  }

  async createFile(message): Promise<void> {
    try {
      await fs.writeFile(`src/logs/${this.fileName}`, message);
    } catch (error) {
      console.error(error);
    }
  }

  async addedLog(message): Promise<void> {
    try {
      await fs.appendFile(`src/logs/${this.fileName}`, message);
    } catch (error) {
      console.error(error);
    }
  }
}
