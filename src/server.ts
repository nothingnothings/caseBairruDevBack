import fastify from 'fastify';
import { AppDataSource } from '../src/database/typeorm/data-source';
import * as Routes from './routes';
import 'dotenv/config';

// app.get('/', async (req, res) => {
//   //   return 'Hello World';

//   res.send('Está funcionando.');
// });

(async () => {
  const app = fastify();

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
