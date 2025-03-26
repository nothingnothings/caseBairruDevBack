import { UserDTO } from '../dtos/UserDTO';

export interface AuthResponse {
  user: UserDTO; // We use a DTO instead of the entire User entity, for increased security
  token: string;
}
