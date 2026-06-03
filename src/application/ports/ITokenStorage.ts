export interface ITokenStorage {
  get(): string | null;
  set(token: string): void;
  clear(): void;
}
