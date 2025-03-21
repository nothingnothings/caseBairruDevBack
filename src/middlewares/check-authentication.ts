import { FastifyRequest } from 'fastify';
import { AuthTypeOrmRepository } from '../repositories/auth.repository';
import jwt from 'jsonwebtoken';

export class CheckAuthenticationMiddleware {
  private authRepository: AuthTypeOrmRepository;

  constructor() {
    this.authRepository = new AuthTypeOrmRepository();
  }

  execute = async (request: FastifyRequest) => {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('Authorization header is missing');
    }

    // Bearer '<token>'
    const token = authorizationHeader.split(' ')[1];

    if (!token || token === '') {
      throw new Error('Token is missing');
    }

    const { email } = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const user = await this.authRepository.findByEmail(email);

      request.user = user;
    } catch (error) {
      throw new Error('User not found');
    }
  };
}
