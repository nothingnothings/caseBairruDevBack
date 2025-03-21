import { Repository } from 'typeorm';
import { AppDataSource } from '../database/typeorm/data-source';
import { Task } from '../database/typeorm/entity/Task';
import {
  CreateTaskParams,
  FinishTaskParams,
  TaskRepositoryInterface,
  UpdateTaskParams,
} from './interfaces/TaskRepository.interface';

export class TaskRepository implements TaskRepositoryInterface {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }
  async findTasks(listId: number): Promise<Task[]> {
    try {
      const tasks = await this.repository.find({ where: { listId } });

      return tasks;
    } catch (error) {
      throw new Error('Error finding tasks');
    }
  }
  async createTask(params: CreateTaskParams): Promise<Task> {
    try {
      const task = await this.repository.save({
        listId: params.listId,
        label: params.label,
        finishedAt: null,
      });

      return task;
    } catch (error) {
      throw new Error('Error creating task');
    }
  }
  async deleteTask(taskId: number): Promise<void> {
    try {
      await this.repository.softDelete(taskId);
    } catch (error) {
      throw new Error('Error deleting task');
    }
  }
  async updateTask({ id, label }: UpdateTaskParams): Promise<void> {
    try {
      await this.repository.save({
        id,
        label,
      });
    } catch (error) {
      throw new Error('Error updating task');
    }
  }
  async finishTask({ finishedAt, id }: FinishTaskParams): Promise<void> {
    try {
      await this.repository.save({ id, finishedAt });
    } catch (error) {
      throw new Error('Error updating task');
    }
  }
}
