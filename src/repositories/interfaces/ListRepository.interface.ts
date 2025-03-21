import { List } from '../../database/typeorm/entity/List';

export interface UpdateListParams {
  id: number;
  label: string;
}

export interface CreateListParams {
  userId: number;
  label: string;
}

export interface FinishListParams {
  id: number;
  finishedAt: Date | null;
}

export interface ListRepositoryInterface {
  findLists(userId: number): Promise<List[]>;

  updateList(params: UpdateListParams): Promise<void>;

  deleteList(listId: number): Promise<void>;

  createList(params: CreateListParams): Promise<List>;

  finishList(params: FinishListParams): Promise<void>;
}
