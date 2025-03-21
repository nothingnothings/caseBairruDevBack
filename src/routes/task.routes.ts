import { FastifyInstance } from 'fastify';
import { TaskController } from '../controller/task.controller';
import { CheckAuthenticationMiddleware } from '../middlewares/check-authentication';
import {
  CreateTaskSchema,
  DeleteTaskSchema,
  FindTasksSchema,
  FinishTaskSchema,
  UpdateTaskSchema,
} from './schemas/task.schema';

export const configure = (fastify: FastifyInstance) => {
  const taskController = new TaskController();

  const checkAuthMiddleware = new CheckAuthenticationMiddleware();

  fastify.route({
    url: '/tasks/create',
    method: 'POST',
    preHandler: checkAuthMiddleware.execute,
    handler: taskController.createTask,
    schema: CreateTaskSchema,
  });

  fastify.route({
    url: '/tasks/update',
    method: 'PUT',
    preHandler: checkAuthMiddleware.execute,
    handler: taskController.updateTask,
    schema: UpdateTaskSchema,
  });

  fastify.route({
    url: '/tasks/delete/:taskId',
    method: 'DELETE',
    preHandler: checkAuthMiddleware.execute,
    handler: taskController.deleteTask,
    schema: DeleteTaskSchema,
  });

  fastify.route({
    url: '/tasks/:listId',
    method: 'GET',
    preHandler: checkAuthMiddleware.execute,
    handler: taskController.findTasks,
    schema: FindTasksSchema,
  });

  fastify.route({
    url: '/tasks/finish',
    method: 'PATCH',
    preHandler: checkAuthMiddleware.execute,
    handler: taskController.finishTask,
    schema: FinishTaskSchema,
  });
};
