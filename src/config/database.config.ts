import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'mssql',
  host: process.env.DB_NAME,
  database: process.env.DBNAME,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  options: {
    trustServerCertificate: true,
  },
  synchronize: true,
  autoLoadEntities: true,
  migrations: ['**/**/migrations/*.js'],
};

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.DB_NAME,
  database: process.env.DBNAME,
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  options: {
    trustServerCertificate: true,
  },
  synchronize: true,
  migrations: ['**/**/migrations/*.js'],
});
