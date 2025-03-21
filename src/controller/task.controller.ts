import { FastifyReply, FastifyRequest } from 'fastify';
import { TaskLogic } from '../logic/task.logic';
import {
  CreateTaskParams,
  FinishTaskParams,
  UpdateTaskParams,
} from '../repositories/interfaces/TaskRepository.interface';

export class TaskController {
  private taskLogic: TaskLogic;

  constructor() {
    this.taskLogic = new TaskLogic();
  }

  findTasks = async (
    request: FastifyRequest<{ Params: { listId: number } }>,
    reply: FastifyReply
  ) => {
    const listId = request.params.listId;

    const tasks = await this.taskLogic.findTasks(listId);

    reply.send(tasks);
  };

  updateTask = async (
    request: FastifyRequest<{ Body: UpdateTaskParams }>,
    reply: FastifyReply
  ) => {
    const updateParams = request.body;
  
    await this.taskLogic.updateTask(updateParams);

    reply.send({ message: 'Task updated successfully' });
  };

  deleteTask = async (
    request: FastifyRequest<{ Params: { taskId: number } }>,
    reply: FastifyReply
  ) => {
    const taskId = request.params.taskId;

    await this.taskLogic.deleteTask(taskId);

    reply.send({
      message: 'Task deleted successfully',
    });
  };

  createTask = async (
    request: FastifyRequest<{ Body: CreateTaskParams }>,
    reply: FastifyReply
  ) => {
    const taskData = request.body as CreateTaskParams;

    const taskCreated = await this.taskLogic.createTask(taskData);

    reply.send(taskCreated);
  };

  finishTask = async (
    request: FastifyRequest<{ Body: FinishTaskParams }>,
    reply: FastifyReply
  ) => {
    const finishParams = request.body;
    await this.taskLogic.finishTask(finishParams);

    reply.send({
      message: 'Task finished successfully',
    });
  };
}
