import 'reflect-metadata';
import { DataSource } from 'typeorm';
// import { User } from './entity/User';
import path = require('path');

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'todo_dev_db',
  password: 'todo_dev_db',
  database: 'todo_dev_db',
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
