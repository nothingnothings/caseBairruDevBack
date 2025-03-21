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
      throw new Error('Error creating user: ' + error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      
      return user;
    } catch (error) {
      throw new Error('Error finding user:' + error);
    }
  }

  async alterName(userId: number, newName: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      
      user.name = newName;
      await this.userRepository.save(user);

      delete user.password;

      return user;
    } catch (error) {
      throw new Error('Error altering name:' + error);
    }
  }

  async deleteUser(userId: number): Promise<{
    message: string;
    userId: number;
  }> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      await this.userRepository.softDelete({ id: userId });

      return {
        message: 'User soft deleted successfully',
        userId,
      };
    } catch (error) {
      throw new Error('Error deleting user:' + error);
    }
  }
}
