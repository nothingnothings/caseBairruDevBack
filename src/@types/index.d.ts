import 'fastify';
import { User } from '../database/typeorm/entity/User';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
