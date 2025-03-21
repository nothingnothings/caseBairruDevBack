import { FastifyInstance } from 'fastify';

import * as authRoutes from './auth.routes';
// this will register all of our routes.
export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    // add your routes here, all additional routes.
    authRoutes.configure(instance);

    done();
  });
};
