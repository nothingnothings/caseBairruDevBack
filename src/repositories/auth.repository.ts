import { Repository } from 'typeorm';
import { User } from '../database/typeorm/entity/User';
import {
  AuthRepository,
  CreateUserParams,
} from './interfaces/AuthRepository.interface';
import { AppDataSource } from '../database/typeorm/data-source';

export class AuthTypeOrmRepository implements AuthRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(user: CreateUserParams): Promise<User> {
    try {
      const userCreated = await this.userRepository.save(user);
      return userCreated;
    } catch (error) {
      throw new Error('Error creating user');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error('Error finding user');
    }
  }
}
