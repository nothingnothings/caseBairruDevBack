import { User } from '../database/typeorm/entity/User';

export interface AuthResponse {
  user: User; // IDEALMENTE, DEVEMOS CRIAR 1 INTERFACE ESPECÍFICA PARA O USER DENTRO DE NOSSO APP (para deixar mais desacoplado do banco de dados)
  token: string;
}
