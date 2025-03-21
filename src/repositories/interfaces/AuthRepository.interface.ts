import { User } from '../../database/typeorm/entity/User';

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface AuthRepository {
  createUser(user: CreateUserParams): Promise<User>;

  findByEmail(email: string): Promise<User>;

  alterName(userId: number, newName: string): Promise<User>;

  deleteUser(userId: number): Promise<{ message: string; userId: number }>;
}
