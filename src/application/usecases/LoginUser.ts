import type { IAuthRepository } from '../../domain/repositories';
import type { ITokenStorage, IUserSessionStorage } from '../ports';
import type { User } from '../../domain/entities';

export class LoginUser {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly tokenStorage: ITokenStorage,
    private readonly userStorage: IUserSessionStorage,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string; user: User }> {
    const result = await this.authRepo.login(email, password);
    this.tokenStorage.set(result.token);
    this.userStorage.set(result.user);
    return result;
  }
}
