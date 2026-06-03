import type { ITokenStorage, IUserSessionStorage } from '../ports';

export class LogoutUser {
  constructor(
    private readonly tokenStorage: ITokenStorage,
    private readonly userStorage: IUserSessionStorage,
  ) {}

  execute(): void {
    this.tokenStorage.clear();
    this.userStorage.clear();
  }
}
