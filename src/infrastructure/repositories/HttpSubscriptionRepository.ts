import type { ISubscriptionRepository } from '../../domain/repositories';
import type { Subscription } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type ApiResponse<T> = { ok: boolean; data: T };

export class HttpSubscriptionRepository implements ISubscriptionRepository {
  async getMine(): Promise<Subscription[]> {
    const { data } = await httpClient.get<ApiResponse<Subscription[]>>('/subscriptions/me');
    return data.data;
  }

  async subscribe(routeId: number): Promise<Subscription> {
    const { data } = await httpClient.post<ApiResponse<Subscription>>('/subscriptions', { routeId });
    return data.data;
  }

  async unsubscribe(id: number): Promise<void> {
    await httpClient.delete(`/subscriptions/${id}`);
  }
}
