import { FastifyInstance } from 'fastify';
import { ListController } from '../controller/list.controller';
import {
  CreateListSchema,
  DeleteListSchema,
  FindListsSchema,
  FinishListSchema,
  UpdateListSchema,
} from './schemas/list.schema';
import { CheckAuthenticationMiddleware } from '../middlewares/check-authentication';

export const configure = (fastify: FastifyInstance) => {
  const listController = new ListController();

  const checkAuthMiddleware = new CheckAuthenticationMiddleware();

  fastify.route({
    url: '/lists/create',
    method: 'POST',
    preHandler: checkAuthMiddleware.execute,
    handler: listController.createList,
    schema: CreateListSchema,
  });

  fastify.route({
    url: '/lists/update',
    method: 'PUT',
    preHandler: checkAuthMiddleware.execute,
    handler: listController.updateList,
    schema: UpdateListSchema,
  });

  fastify.route({
    url: '/lists/delete/:listId',
    method: 'DELETE',
    preHandler: checkAuthMiddleware.execute,
    handler: listController.deleteList,
    schema: DeleteListSchema,
  });

  fastify.route({
    url: '/lists/:userId',
    method: 'GET',
    preHandler: checkAuthMiddleware.execute,
    handler: listController.findLists,
    schema: FindListsSchema,
  });

  fastify.route({
    url: '/lists/finish',
    method: 'PATCH',
    preHandler: checkAuthMiddleware.execute,
    handler: listController.finishList,
    schema: FinishListSchema
  });
};
