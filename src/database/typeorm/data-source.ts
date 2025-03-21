import path = require('path');
import 'reflect-metadata';
import { DataSource } from 'typeorm';

console.log(process.env.DB_HOST, 'THE_DB_HOST');

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  // todas as entidades do folder entity serão adicionadas.
  entities: [path.resolve(__dirname, 'entity', '*.{ts,js}')],
  migrations: [
    // todas as migrations do folder migrations serão adicionadas.
    path.resolve(__dirname, 'migrations', '*{.ts,.js}'),
  ],
  subscribers: [],
});
