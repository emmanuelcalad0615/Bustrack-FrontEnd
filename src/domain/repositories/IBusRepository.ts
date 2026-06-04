import type { Bus } from '../entities';
import type { PaginatedResult } from './IRouteRepository';

export type ListBusesParams = {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
  routeId?: number;
};

export type CreateBusDto = { plate: string; model: string; capacity: number; routeId: number; active?: boolean };
export type UpdateBusDto = Partial<CreateBusDto>;

export interface IBusRepository {
  getAll(params?: ListBusesParams): Promise<PaginatedResult<Bus>>;
  getById(id: number): Promise<Bus>;
  create(data: CreateBusDto): Promise<Bus>;
  update(id: number, data: UpdateBusDto): Promise<Bus>;
  delete(id: number): Promise<Bus>;
}
