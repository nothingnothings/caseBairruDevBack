import { FastifyInstance } from 'fastify';
import { AuthController } from '../controller/auth.controller';
import {
  AlterNameSchema,
  GetNameSchema,
  LoginSchema,
  RegisterSchema,
} from './schemas/auth.schema';
import { CheckAuthenticationMiddleware } from '../middlewares/check-authentication';

const checkAuthenticationMiddleware = new CheckAuthenticationMiddleware();

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
    preHandler: checkAuthenticationMiddleware.execute,
    url: '/auth/delete',
    method: 'DELETE',
    handler: authController.deleteUser,
  });

  fastify.route({
    preHandler: checkAuthenticationMiddleware.execute,
    url: '/auth/user/:userId',
    method: 'GET',
    handler: authController.getName,
    schema: GetNameSchema,
  });

  fastify.route({
    preHandler: checkAuthenticationMiddleware.execute,
    url: '/auth/alterName',
    method: 'PUT',
    handler: authController.alterName,
    schema: AlterNameSchema,
  });

  fastify.route({
    preHandler: checkAuthenticationMiddleware.execute,
    url: '/auth/validate',
    method: 'GET',
    handler: authController.validate,
  });
};
