import { describe, it, expect, vi } from 'vitest';
import { SubscribeToRoute } from '../SubscribeToRoute';
import { ConflictError, NetworkError } from '../../../domain/errors';
import type { ISubscriptionRepository } from '../../../domain/repositories';
import type { Subscription } from '../../../domain/entities';

const mockSub: Subscription = {
  id: 10,
  userId: 1,
  routeId: 3,
  createdAt: '2024-01-01T00:00:00.000Z',
};

function makeRepo(overrides?: Partial<ISubscriptionRepository>): ISubscriptionRepository {
  return {
    getMine: vi.fn(),
    subscribe: vi.fn().mockResolvedValue(mockSub),
    unsubscribe: vi.fn(),
    ...overrides,
  };
}

describe('SubscribeToRoute', () => {
  it('returns the subscription on success', async () => {
    const usecase = new SubscribeToRoute(makeRepo());

    const result = await usecase.execute(3);

    expect(result).toEqual(mockSub);
  });

  it('calls repo with the given routeId', async () => {
    const repo = makeRepo();
    const usecase = new SubscribeToRoute(repo);

    await usecase.execute(7);

    expect(repo.subscribe).toHaveBeenCalledWith(7);
  });

  it('returns null when subscription already exists (ConflictError)', async () => {
    const repo = makeRepo({
      subscribe: vi.fn().mockRejectedValue(new ConflictError()),
    });
    const usecase = new SubscribeToRoute(repo);

    const result = await usecase.execute(3);

    expect(result).toBeNull();
  });

  it('rethrows non-conflict errors', async () => {
    const repo = makeRepo({
      subscribe: vi.fn().mockRejectedValue(new NetworkError()),
    });
    const usecase = new SubscribeToRoute(repo);

    await expect(usecase.execute(3)).rejects.toBeInstanceOf(NetworkError);
  });

  it('rethrows generic errors that are not ConflictError', async () => {
    const repo = makeRepo({
      subscribe: vi.fn().mockRejectedValue(new Error('Unexpected')),
    });
    const usecase = new SubscribeToRoute(repo);

    await expect(usecase.execute(3)).rejects.toThrow('Unexpected');
  });
});
