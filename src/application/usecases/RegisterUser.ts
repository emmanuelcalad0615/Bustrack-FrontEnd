import type { IAuthRepository } from '../../domain/repositories';
import type { User } from '../../domain/entities';

export class RegisterUser {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(email: string, password: string, name: string): Promise<User> {
    return this.authRepo.register(email, password, name);
  }
}
