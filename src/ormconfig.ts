import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
} = process.env;

export default {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  logger: 'file',
  entities: ['dist/**/*.entity{ .ts,.js}'],
  migrationsRun: false,
  dropSchema: true,
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
} as DataSourceOptions;
