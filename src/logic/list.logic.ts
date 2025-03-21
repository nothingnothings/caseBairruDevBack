import { List } from '../database/typeorm/entity/List';
import {
  CreateListParams,
  FinishListParams,
  UpdateListParams,
} from '../repositories/interfaces/ListRepository.interface';
import { ListRepository } from '../repositories/list.repository';

export default class ListLogic {
  private listRepository: any;

  constructor() {
    this.listRepository = new ListRepository();
  }

  async findLists(userId: number): Promise<List[]> {
    const lists = this.listRepository.findLists(userId);

    return lists;
  }

  async createList(params: CreateListParams): Promise<List> {
    const list = await this.listRepository.createList(params);
    return list;
  }

  async updateList(params: UpdateListParams): Promise<void> {
    return this.listRepository.updateList(params);
  }

  async deleteList(listId: number): Promise<void> {
    await this.listRepository.deleteList(listId);
  }

  async finishList(list: FinishListParams): Promise<void> {
    await this.listRepository.finishList(list);
  }
}
