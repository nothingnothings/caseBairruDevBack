import { Repository } from 'typeorm';
import { List } from '../database/typeorm/entity/List';
import { AppDataSource } from '../database/typeorm/data-source';
import {
  CreateListParams,
  FinishListParams,
  ListRepositoryInterface,
  UpdateListParams,
} from './interfaces/ListRepository.interface';

export class ListRepository implements ListRepositoryInterface {
  private repository: Repository<List>;

  constructor() {
    this.repository = AppDataSource.getRepository(List);
  }

  async findLists(userId: number): Promise<List[]> {
    try {
      const lists = await this.repository.find({ where: { userId }, relations: ['tasks'] }); // 'relations' é uma propriedade que força inner joins na nossa query, com tasks, nesse caso.

      return lists;
    } catch (error) {
      throw new Error('Error finding lists');
    }
  }

  async updateList({ id, label }: UpdateListParams): Promise<void> {
    try {
      const lists = await this.repository.update(id, { label });
    } catch (error) {
      throw new Error('Error updating list');
    }
  }

  async deleteList(listId: number): Promise<void> {
    try {
      await this.repository.softDelete(listId);
    } catch (error) {
      throw new Error('Error deleting list');
    }
  }

  async createList({ label, userId }: CreateListParams): Promise<List> {
    try {
      const list = await this.repository.save({
        label,
        userId,
        finishedAt: null,
      });

      return list;
    } catch (error) {
      throw new Error('Error creating list');
    }
  }

  async finishList({ finishedAt, id }: FinishListParams): Promise<void> {
    try {
      const lists = await this.repository.update({ id }, { finishedAt });
    } catch (error) {
      throw new Error('Error updating list');
    }
  }
}
