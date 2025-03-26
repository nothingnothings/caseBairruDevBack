import { UserDTO } from '../dtos/UserDTO';
import { AuthLoginRequest } from '../interfaces/authLoginRequest';
import { AuthResponse } from '../interfaces/authResponse';
import { AuthTypeOrmRepository } from '../repositories/auth.repository';
import { CreateUserParams } from '../repositories/interfaces/AuthRepository.interface';
import { hashSync, compare } from 'bcrypt';
import { generateToken } from '../utils/auth';

export class AuthLogic {
  private authRepository: AuthTypeOrmRepository;

  constructor() {
    this.authRepository = new AuthTypeOrmRepository();
  }

  async createUser(user: CreateUserParams): Promise<AuthResponse> {
    const userAlreadyExists = await this.authRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error('O e-mail inserido já encontra-se em uso.');
    }

    const encryptedPassword = await hashSync(user.password, 12);

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
    });

    // Create user DTO to send only non-sensitive data (no passwords and api_keys) to the frontend.
    const userDTO = new UserDTO(userCreated);

    // Create jsonwebtoken to send in the response of our route.
    const token = generateToken(userCreated.id, userCreated.email);

    return {
      user: userDTO,
      token,
    };
  }

  async login({ email, password }: AuthLoginRequest): Promise<AuthResponse> {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Senha incorreta.');
    }

    // Create user DTO to send only non-sensitive data (no passwords and api_keys) to the frontend.
    const userDTO = new UserDTO(user);

    // Create jsonwebtoken to send in the response of our route.
    const token = generateToken(user.id, user.email);

    return {
      user: userDTO,
      token,
    };
  }

  async getUser(userId: number): Promise<UserDTO> {
    const user = await this.authRepository.getUser(userId);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Create user DTO to send only non-sensitive data (no passwords and api_keys) to the frontend.
    const userDTO = new UserDTO(user);

    return userDTO;
  }

  async alterName(userId: number, newName: string): Promise<UserDTO> {
    const user = await this.authRepository.alterName(userId, newName);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Create user DTO to send only non-sensitive data (no passwords and api_keys) to the frontend.
    const userDTO = new UserDTO(user);

    return userDTO;
  }

  // Soft Delete Method
  async deleteUser(
    userId: number
  ): Promise<{ message: string; userId: number }> {
    const data = await this.authRepository.deleteUser(userId);

    if (!data) {
      throw new Error('Usuário não encontrado.');
    }
    // We return an object containing a message and the deleted user's id
    return data;
  }

  async validate(session: string): Promise<boolean> {
    const isValid = await this.authRepository.validate(session);

    return isValid;
  }
}
