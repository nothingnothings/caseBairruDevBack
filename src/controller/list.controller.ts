import { FastifyReply, FastifyRequest } from 'fastify';
import ListLogic from '../logic/list.logic';
import {
  CreateListParams,
  FinishListParams,
  UpdateListParams,
} from '../repositories/interfaces/ListRepository.interface';

export class ListController {
  private listLogic: ListLogic;

  constructor() {
    this.listLogic = new ListLogic();
  }

  findLists = async (
    request: FastifyRequest<{ Params: { userId: number } }>, // podemos definir o que será recebido, nesse controller, no request
    reply: FastifyReply
  ) => {
    const userId = request.user.id;

    const lists = await this.listLogic.findLists(userId);

    reply.send(lists);
  };

  updateList = async (
    request: FastifyRequest<{ Body: UpdateListParams }>,
    reply: FastifyReply
  ) => {
    const updateParams = request.body;

    const updatedList = await this.listLogic.updateList(updateParams);

    reply.send(updatedList);
  };

  deleteList = async (
    request: FastifyRequest<{ Params: { listId: number } }>,
    reply: FastifyReply
  ) => {
    const listId = request.params.listId;

    await this.listLogic.deleteList(listId);

    reply.send({
      message: 'List deleted successfully',
    });
  };

  // o fastify sempre nos fornece 'request' e 'reply', desses types aí, nos controllers.
  createList = async (
    request: FastifyRequest<{ Body: CreateListParams }>,
    reply: FastifyReply
  ) => {
    const listData = request.body as CreateListParams;

    const listCreated = await this.listLogic.createList(listData);

    reply.send(listCreated);
  };

  finishList = async (
    request: FastifyRequest<{ Body: FinishListParams }>,
    reply: FastifyReply
  ) => {
    const finishParams = request.body;
    await this.listLogic.finishList(finishParams);

    reply.send({
      message: 'List finished successfully',
    });
  };
}
