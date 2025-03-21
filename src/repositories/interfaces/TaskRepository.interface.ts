import { Task } from '../../database/typeorm/entity/Task';

export interface CreateTaskParams {
  listId: number;
  label: string;
}

export interface UpdateTaskParams {
  id: number;
  label: string;
}

export interface FinishTaskParams {
  id: number;
  finishedAt: Date | null;
}

export interface TaskRepositoryInterface {
  findTasks(listId: number): Promise<Task[]>;

  createTask(params: CreateTaskParams): Promise<Task>;

  deleteTask(taskId: number): Promise<void>;

  updateTask(params: UpdateTaskParams): Promise<void>;

  finishTask(params: FinishTaskParams): Promise<void>;
}
