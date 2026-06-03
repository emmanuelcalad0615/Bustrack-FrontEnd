import type { User } from '../../domain/entities';

export interface IUserSessionStorage {
  get(): User | null;
  set(user: User): void;
  clear(): void;
}
