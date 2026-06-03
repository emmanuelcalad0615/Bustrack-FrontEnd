import { httpClient } from '../http/httpClient';

export class HttpSyncRepository {
  async syncRoutes(): Promise<unknown> {
    const { data } = await httpClient.get('/sync/routes');
    return data;
  }

  async seedBuses(busesPerRoute = 2): Promise<unknown> {
    const { data } = await httpClient.post(`/sync/buses?busesPerRoute=${busesPerRoute}`);
    return data;
  }
}
