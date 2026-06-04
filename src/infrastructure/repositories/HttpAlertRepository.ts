import type { IAlertRepository, RandomLocation } from '../../domain/repositories';
import type { Alert, ProximityResult } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type ApiResponse<T> = { ok: boolean; data: T };

export class HttpAlertRepository implements IAlertRepository {
  async getMine(): Promise<Alert[]> {
    const { data } = await httpClient.get<ApiResponse<Alert[]>>('/alerts/me');
    return data.data;
  }

  async create(busId: number, message: string): Promise<Alert> {
    const { data } = await httpClient.post<ApiResponse<Alert>>('/alerts', { busId, message });
    return data.data;
  }

  async markRead(id: number): Promise<Alert> {
    const { data } = await httpClient.patch<ApiResponse<Alert>>(`/alerts/${id}/read`);
    return data.data;
  }

  async delete(id: number): Promise<void> {
    await httpClient.delete(`/alerts/${id}`);
  }

  async checkProximity(
    latitude: number,
    longitude: number,
    thresholdMeters?: number,
  ): Promise<ProximityResult> {
    const { data } = await httpClient.post<ApiResponse<ProximityResult>>('/alerts/proximity', {
      latitude,
      longitude,
      ...(thresholdMeters !== undefined && { thresholdMeters }),
    });
    return data.data;
  }

  async getRandomLocation(): Promise<RandomLocation> {
    const { data } = await httpClient.get<ApiResponse<RandomLocation>>('/alerts/random-location');
    return data.data;
  }
}
