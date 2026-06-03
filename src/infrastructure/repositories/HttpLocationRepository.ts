import type { ILocationRepository } from '../../domain/repositories';
import type { BusLocation } from '../../domain/entities';
import { httpClient } from '../http/httpClient';
import { NotFoundError } from '../../domain/errors';

type ApiResponse<T> = { ok: boolean; data: T };

export class HttpLocationRepository implements ILocationRepository {
  async getByBusId(busId: number): Promise<BusLocation | null> {
    try {
      const { data } = await httpClient.get<ApiResponse<BusLocation>>(`/locations/${busId}`);
      return data.data;
    } catch (err) {
      if (err instanceof NotFoundError) return null;
      throw err;
    }
  }

  async update(busId: number, latitude: number, longitude: number): Promise<BusLocation> {
    const { data } = await httpClient.post<ApiResponse<BusLocation>>(
      `/locations/${busId}`,
      { latitude, longitude },
    );
    return data.data;
  }

  async simulate(busId: number): Promise<BusLocation> {
    const { data } = await httpClient.post<ApiResponse<BusLocation>>(
      `/locations/${busId}/simulate`,
    );
    return data.data;
  }
}
