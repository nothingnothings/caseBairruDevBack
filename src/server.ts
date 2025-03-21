import 'dotenv/config'; // Import dotenv to load the .env file
import fastify from 'fastify';
import fastifyCors = require('@fastify/cors');
import { AppDataSource } from '../src/database/typeorm/data-source';
import * as Routes from './routes';

(async () => {
  const app = fastify();

  app.register(fastifyCors, {
    origin: '*', // Only for testing.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  });

  await AppDataSource.initialize();

  Routes.register(app);

  app.listen(
    {
      port: 3001,
    },
    () => {
      console.log('SERVER RUNNING ON PORT 3001');
    }
  );
})();
