import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLogic } from '../logic/auth.logic';
import { CreateUserParams } from '../repositories/interfaces/AuthRepository.interface';
import { AuthLoginRequest } from '../interfaces/authLoginRequest';
import { AuthDeleteRequest } from '../interfaces/authDeleteRequest';
import { AuthAlterNameRequest } from '../interfaces/authAlterNameRequest';

export class AuthController {
  private authLogic: AuthLogic;

  constructor() {
    this.authLogic = new AuthLogic();
  }

  // o fastify sempre nos fornece 'request' e 'reply', desses types aí, nos controllers.
  createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userData = request.body as CreateUserParams;

    const user = await this.authLogic.createUser(userData);

    reply.send(user);
  };

  login = async (request: FastifyRequest, reply: FastifyReply) => {
    // request.user
    const userData = request.body as AuthLoginRequest;

    const user = await this.authLogic.login(userData);

    reply.send(user);
  };

  deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const userData = request.body as AuthDeleteRequest;

    const userId = userData.userId;

    const user = await this.authLogic.deleteUser(userId);

    reply.send(user);
  };

  alterName = async (request: FastifyRequest, reply: FastifyReply) => {
    const userData = request.body as AuthAlterNameRequest;

    const userId = userData.userId;
    const newName = userData.newName;

    const user = await this.authLogic.alterName(userId, newName);

    reply.send(user);
  };

  validate = async (request: FastifyRequest, reply: FastifyReply) => {
    const session = request.headers.authorization.split(' ')[1];
    const isValid = await this.authLogic.validate(session);

    reply.send({
      isValid,
    });
  };
}
