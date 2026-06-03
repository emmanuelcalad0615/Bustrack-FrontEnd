import type { Bus } from '../entities';

export type CreateBusDto = { plate: string; model: string; capacity: number; routeId: number; active?: boolean };
export type UpdateBusDto = Partial<CreateBusDto>;

export interface IBusRepository {
  getAll(): Promise<Bus[]>;
  getById(id: number): Promise<Bus>;
  create(data: CreateBusDto): Promise<Bus>;
  update(id: number, data: UpdateBusDto): Promise<Bus>;
  delete(id: number): Promise<Bus>;
}
