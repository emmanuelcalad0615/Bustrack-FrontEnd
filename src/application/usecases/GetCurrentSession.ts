import type { ITokenStorage, IUserSessionStorage } from '../ports';
import type { User } from '../../domain/entities';

export class GetCurrentSession {
  constructor(
    private readonly tokenStorage: ITokenStorage,
    private readonly userStorage: IUserSessionStorage,
  ) {}

  execute(): { token: string; user: User } | null {
    const token = this.tokenStorage.get();
    const user = this.userStorage.get();
    if (!token || !user) return null;
    return { token, user };
  }
}
