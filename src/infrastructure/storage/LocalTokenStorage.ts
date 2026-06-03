import type { ITokenStorage } from '../../application/ports';

const KEY = 'bustrack_token';

export class LocalTokenStorage implements ITokenStorage {
  get(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(KEY);
  }

  set(token: string): void {
    localStorage.setItem(KEY, token);
  }

  clear(): void {
    localStorage.removeItem(KEY);
  }
}
