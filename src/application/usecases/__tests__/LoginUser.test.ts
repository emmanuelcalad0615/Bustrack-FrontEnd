import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginUser } from '../LoginUser';
import type { IAuthRepository } from '../../../domain/repositories';
import type { ITokenStorage, IUserSessionStorage } from '../../ports';
import type { User } from '../../../domain/entities';

const mockUser: User = { id: 1, email: 'test@test.com', name: 'Test User', role: 'USER' };
const mockToken = 'jwt.token.here';

function makeRepo(overrides?: Partial<IAuthRepository>): IAuthRepository {
  return {
    login: vi.fn().mockResolvedValue({ token: mockToken, user: mockUser }),
    register: vi.fn(),
    ...overrides,
  };
}

function makeTokenStorage(): ITokenStorage {
  return { get: vi.fn(), set: vi.fn(), clear: vi.fn() };
}

function makeUserStorage(): IUserSessionStorage {
  return { get: vi.fn(), set: vi.fn(), clear: vi.fn() };
}

describe('LoginUser', () => {
  let tokenStorage: ITokenStorage;
  let userStorage: IUserSessionStorage;

  beforeEach(() => {
    tokenStorage = makeTokenStorage();
    userStorage = makeUserStorage();
  });

  it('calls repo with correct credentials', async () => {
    const repo = makeRepo();
    const usecase = new LoginUser(repo, tokenStorage, userStorage);

    await usecase.execute('test@test.com', 'password123');

    expect(repo.login).toHaveBeenCalledOnce();
    expect(repo.login).toHaveBeenCalledWith('test@test.com', 'password123');
  });

  it('stores token in token storage', async () => {
    const usecase = new LoginUser(makeRepo(), tokenStorage, userStorage);

    await usecase.execute('test@test.com', 'password123');

    expect(tokenStorage.set).toHaveBeenCalledWith(mockToken);
  });

  it('stores user in session storage', async () => {
    const usecase = new LoginUser(makeRepo(), tokenStorage, userStorage);

    await usecase.execute('test@test.com', 'password123');

    expect(userStorage.set).toHaveBeenCalledWith(mockUser);
  });

  it('returns token and user from repo', async () => {
    const usecase = new LoginUser(makeRepo(), tokenStorage, userStorage);

    const result = await usecase.execute('test@test.com', 'password123');

    expect(result).toEqual({ token: mockToken, user: mockUser });
  });

  it('propagates error when repo rejects — does NOT store anything', async () => {
    const error = new Error('Credenciales inválidas');
    const repo = makeRepo({ login: vi.fn().mockRejectedValue(error) });
    const usecase = new LoginUser(repo, tokenStorage, userStorage);

    await expect(usecase.execute('bad@email.com', 'wrong')).rejects.toThrow('Credenciales inválidas');
    expect(tokenStorage.set).not.toHaveBeenCalled();
    expect(userStorage.set).not.toHaveBeenCalled();
  });
});
