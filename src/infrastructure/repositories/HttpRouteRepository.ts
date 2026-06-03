import type { IRouteRepository, CreateRouteDto, UpdateRouteDto } from '../../domain/repositories';
import type { Route } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type ApiResponse<T> = { ok: boolean; data: T };

export class HttpRouteRepository implements IRouteRepository {
  async getAll(): Promise<Route[]> {
    const { data } = await httpClient.get<ApiResponse<Route[]>>('/routes');
    return data.data;
  }

  async getById(id: number): Promise<Route> {
    const { data } = await httpClient.get<ApiResponse<Route>>(`/routes/${id}`);
    return data.data;
  }

  async create(dto: CreateRouteDto): Promise<Route> {
    const { data } = await httpClient.post<ApiResponse<Route>>('/routes', dto);
    return data.data;
  }

  async update(id: number, dto: UpdateRouteDto): Promise<Route> {
    const { data } = await httpClient.put<ApiResponse<Route>>(`/routes/${id}`, dto);
    return data.data;
  }

  async delete(id: number): Promise<Route> {
    const { data } = await httpClient.delete<ApiResponse<Route>>(`/routes/${id}`);
    return data.data;
  }
}
