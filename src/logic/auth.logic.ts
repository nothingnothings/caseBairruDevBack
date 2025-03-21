import { User } from '../database/typeorm/entity/User';
import { AuthLoginRequest } from '../interfaces/authLoginRequest';
import { AuthResponse } from '../interfaces/authResponse';
import { AuthTypeOrmRepository } from '../repositories/auth.repository';
import { CreateUserParams } from '../repositories/interfaces/AuthRepository.interface';
import { hashSync, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuthLogic {
  private authRepository: AuthTypeOrmRepository;

  constructor() {
    this.authRepository = new AuthTypeOrmRepository();
  }

  async createUser(user: CreateUserParams): Promise<AuthResponse> {
    const userAlreadyExists = await this.authRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error('E-mail is already in use');
    }

    const encryptedPassword = await hashSync(user.password, 12);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    // create jsonwebtoken to send in the response of our route.

    const token = sign(
      // 1o param --> objeto com dados a serem criptografados no token.
      {
        userId: userCreated.id,
        email: userCreated.email,
      },
      process.env.JWT_SECRET, // chave secreta.
      {
        expiresIn: '5m',
        algorithm: 'HS256',
      }
    );

    delete userCreated.password; // WE DELETE THE USER'S PASSWORD IN THE RETURNED OBJECT TO THE USER, SO THAT THE USER'S PASSWORD DOESN'T GET SENT TO THE FRONTEND.

    return {
      user: userCreated,
      token,
    };
  }

  async login({ email, password }: AuthLoginRequest): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Password is incorrect');
    }

    delete user.password; // WE DELETE THE USER'S PASSWORD IN THE RETURNED OBJECT TO THE USER, SO THAT THE USER'S PASSWORD DOESN'T GET SENT TO THE FRONTEND.

    // create jsonwebtoken to send in the response of our route.

    const token = sign(
      // 1o param --> objeto com dados a serem criptografados no token.
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET, // chave secreta.
      {
        expiresIn: '365d',
        algorithm: 'HS256',
      }
    );

    return {
      user,
      token,
    };
  }

  async deleteUser(
    userId: number
  ): Promise<{ message: string; userId: number }> {
    const user = await this.authRepository.deleteUser(userId);

    return user;
  }
}
