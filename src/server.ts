import 'dotenv/config'; // Import dotenv to load the .env file
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import { AppDataSource } from '../src/database/typeorm/data-source';
import * as Routes from './routes';

(async () => {
  const app = fastify();

  app.register(fastifyCors, {
    origin: 'http://localhost:8081', // React Native app URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (cookies, etc.)
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
