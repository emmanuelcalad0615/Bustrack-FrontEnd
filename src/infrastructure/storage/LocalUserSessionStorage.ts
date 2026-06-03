import type { IUserSessionStorage } from '../../application/ports';
import type { User } from '../../domain/entities';

const KEY = 'bustrack_user';

export class LocalUserSessionStorage implements IUserSessionStorage {
  get(): User | null {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  set(user: User): void {
    localStorage.setItem(KEY, JSON.stringify(user));
  }

  clear(): void {
    localStorage.removeItem(KEY);
  }
}
