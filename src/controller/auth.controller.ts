import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthLogic } from '../logic/auth.logic';
import { CreateUserParams } from '../repositories/interfaces/AuthRepository.interface';
import { AuthLoginRequest } from '../interfaces/authLoginRequest';

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
}
