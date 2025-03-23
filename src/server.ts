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
      // host: '192.168.0.137', // If you wish to test the app on a phone, locally, you need to run 'ipconfig' on your terminal and then put the IPV4 address of the machine running the backend here.
      port: 3001,
    },
    () => {
      console.log('SERVER RUNNING ON PORT 3001');
    }
  );
})();
