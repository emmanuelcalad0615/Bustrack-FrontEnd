import type { Subscription } from '../entities';

export interface ISubscriptionRepository {
  getMine(): Promise<Subscription[]>;
  subscribe(routeId: number): Promise<Subscription>;
  unsubscribe(id: number): Promise<void>;
}
