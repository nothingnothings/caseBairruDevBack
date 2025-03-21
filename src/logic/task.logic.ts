import { Task } from '../database/typeorm/entity/Task';
import { CreateTaskParams, FinishTaskParams, UpdateTaskParams } from '../repositories/interfaces/TaskRepository.interface';
import { TaskRepository } from '../repositories/task.repository';

export class TaskLogic {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async findTasks(listId: number): Promise<Task[]> {
    const tasks = await this.taskRepository.findTasks(listId);

    return tasks;
  }

  async createTask(params: CreateTaskParams): Promise<Task> {
    const task = await this.taskRepository.createTask(params);
    return task;
  }

  async deleteTask(taskId: number): Promise<void> {
    await this.taskRepository.deleteTask(taskId);
  }

  async updateTask(params: UpdateTaskParams): Promise<void> {
    await this.taskRepository.updateTask(params);
  }

  async finishTask(taskToFinish: FinishTaskParams): Promise<void> {
    await this.taskRepository.finishTask(taskToFinish);
  }
}
