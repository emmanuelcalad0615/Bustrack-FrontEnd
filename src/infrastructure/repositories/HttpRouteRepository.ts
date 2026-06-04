import type { IRouteRepository, CreateRouteDto, UpdateRouteDto, ListRoutesParams, PaginatedResult } from '../../domain/repositories';
import type { Route } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type RouteListEnvelope = { ok: boolean; data: Route[]; total: number; page: number; limit: number };
type RouteEnvelope = { ok: boolean; data: Route };

export class HttpRouteRepository implements IRouteRepository {
  async getAll(params: ListRoutesParams = {}): Promise<PaginatedResult<Route>> {
    const { page = 1, pageSize = 10, q, active } = params;
    const query: Record<string, unknown> = { page, pageSize };
    if (q?.trim()) query.q = q.trim();
    if (active !== undefined) query.active = active;

    const { data } = await httpClient.get<RouteListEnvelope>('/routes', { params: query });
    return { data: data.data, total: data.total, page: data.page, limit: data.limit };
  }

  async getById(id: number): Promise<Route> {
    const { data } = await httpClient.get<RouteEnvelope>(`/routes/${id}`);
    return data.data;
  }

  async create(dto: CreateRouteDto): Promise<Route> {
    const { data } = await httpClient.post<RouteEnvelope>('/routes', dto);
    return data.data;
  }

  async update(id: number, dto: UpdateRouteDto): Promise<Route> {
    const { data } = await httpClient.put<RouteEnvelope>(`/routes/${id}`, dto);
    return data.data;
  }

  async delete(id: number): Promise<Route> {
    const { data } = await httpClient.delete<RouteEnvelope>(`/routes/${id}`);
    return data.data;
  }
}
