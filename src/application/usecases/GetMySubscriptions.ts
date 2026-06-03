import type { ISubscriptionRepository } from '../../domain/repositories';
import type { Subscription } from '../../domain/entities';

export class GetMySubscriptions {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async execute(): Promise<Subscription[]> {
    return this.subscriptionRepo.getMine();
  }
}
