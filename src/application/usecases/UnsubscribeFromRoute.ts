import type { ISubscriptionRepository } from '../../domain/repositories';

export class UnsubscribeFromRoute {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async execute(subscriptionId: number): Promise<void> {
    return this.subscriptionRepo.unsubscribe(subscriptionId);
  }
}
