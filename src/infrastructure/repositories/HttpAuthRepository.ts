import type { IAuthRepository } from '../../domain/repositories';
import type { User } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

export class HttpAuthRepository implements IAuthRepository {
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const { data } = await httpClient.post<{ ok: boolean; data: { token: string; user: User } }>(
      '/auth/login',
      { email, password },
    );
    return data.data;
  }

  async register(email: string, password: string, name: string): Promise<User> {
    const { data } = await httpClient.post<{ ok: boolean; data: User }>(
      '/auth/register',
      { email, password, name },
    );
    return data.data;
  }
}
