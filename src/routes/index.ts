import { FastifyInstance } from 'fastify';

import * as authRoutes from './auth.routes';
import * as listRoutes from './list.routes';
import * as taskRoutes from './task.routes';

// this will register all of our routes.
export const register = (fastify: FastifyInstance) => {
  fastify.register((instance, _, done) => {
    // add your routes here, all additional routes.
    authRoutes.configure(instance);
    listRoutes.configure(instance);
    taskRoutes.configure(instance);

    done();
  });
};
