import type { ISubscriptionRepository } from '../../domain/repositories';
import type { Subscription } from '../../domain/entities';
import { ConflictError } from '../../domain/errors';

export class SubscribeToRoute {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async execute(routeId: number): Promise<Subscription | null> {
    try {
      return await this.subscriptionRepo.subscribe(routeId);
    } catch (err) {
      // Already subscribed — treat as no-op instead of crashing
      if (err instanceof ConflictError) return null;
      throw err;
    }
  }
}
