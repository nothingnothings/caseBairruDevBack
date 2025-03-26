export class UserDTO {
  id: number;
  name: string;
  email: string;

  constructor(user: Partial<UserDTO>) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
