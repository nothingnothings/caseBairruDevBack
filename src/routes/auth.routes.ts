import { FastifyInstance } from 'fastify';
import { AuthController } from '../controller/auth.controller';
import { AlterNameSchema, LoginSchema, RegisterSchema } from './schemas/auth.schema';

export const configure = (fastify: FastifyInstance) => {
  const authController = new AuthController();

  fastify.route({
    url: '/auth/register',
    method: 'POST',
    handler: authController.createUser,
    schema: RegisterSchema,
  });

  fastify.route({
    url: '/auth/login',
    method: 'POST',
    handler: authController.login,
    schema: LoginSchema,
  });

  fastify.route({
    url: '/auth/delete',
    method: 'DELETE',
    handler: authController.deleteUser,
  });

  fastify.route({
    url: '/auth/alterName',
    method: 'PUT',
    handler: authController.alterName,
    schema: AlterNameSchema,
  });
};
