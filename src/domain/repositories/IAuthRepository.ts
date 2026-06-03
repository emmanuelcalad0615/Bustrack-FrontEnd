import type { User } from '../entities';

export interface IAuthRepository {
  login(email: string, password: string): Promise<{ token: string; user: User }>;
  register(email: string, password: string, name: string): Promise<User>;
}
