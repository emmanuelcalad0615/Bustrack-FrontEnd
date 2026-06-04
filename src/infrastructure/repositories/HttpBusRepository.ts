import type { IBusRepository, CreateBusDto, UpdateBusDto, ListBusesParams, PaginatedResult } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type BusListEnvelope = { ok: boolean; data: Bus[]; total: number; page: number; limit: number };
type BusEnvelope = { ok: boolean; data: Bus };

export class HttpBusRepository implements IBusRepository {
  async getAll(params: ListBusesParams = {}): Promise<PaginatedResult<Bus>> {
    const { page = 1, pageSize = 10, q, active, routeId } = params;
    const query: Record<string, unknown> = { page, pageSize };
    if (q?.trim()) query.q = q.trim();
    if (active !== undefined) query.active = active;
    if (routeId !== undefined) query.routeId = routeId;

    const { data } = await httpClient.get<BusListEnvelope>('/buses', { params: query });
    return { data: data.data, total: data.total, page: data.page, limit: data.limit };
  }

  async getById(id: number): Promise<Bus> {
    const { data } = await httpClient.get<BusEnvelope>(`/buses/${id}`);
    return data.data;
  }

  async create(dto: CreateBusDto): Promise<Bus> {
    const { data } = await httpClient.post<BusEnvelope>('/buses', dto);
    return data.data;
  }

  async update(id: number, dto: UpdateBusDto): Promise<Bus> {
    const { data } = await httpClient.put<BusEnvelope>(`/buses/${id}`, dto);
    return data.data;
  }

  async delete(id: number): Promise<Bus> {
    const { data } = await httpClient.delete<BusEnvelope>(`/buses/${id}`);
    return data.data;
  }
}
