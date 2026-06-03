import type { IBusRepository, CreateBusDto, UpdateBusDto } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';
import { httpClient } from '../http/httpClient';

type ApiResponse<T> = { ok: boolean; data: T };

export class HttpBusRepository implements IBusRepository {
  async getAll(): Promise<Bus[]> {
    const { data } = await httpClient.get<ApiResponse<Bus[]>>('/buses');
    return data.data;
  }

  async getById(id: number): Promise<Bus> {
    const { data } = await httpClient.get<ApiResponse<Bus>>(`/buses/${id}`);
    return data.data;
  }

  async create(dto: CreateBusDto): Promise<Bus> {
    const { data } = await httpClient.post<ApiResponse<Bus>>('/buses', dto);
    return data.data;
  }

  async update(id: number, dto: UpdateBusDto): Promise<Bus> {
    const { data } = await httpClient.put<ApiResponse<Bus>>(`/buses/${id}`, dto);
    return data.data;
  }

  async delete(id: number): Promise<Bus> {
    const { data } = await httpClient.delete<ApiResponse<Bus>>(`/buses/${id}`);
    return data.data;
  }
}
