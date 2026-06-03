import type { Route } from '../entities';

export type CreateRouteDto = { name: string; origin: string; destination: string; active?: boolean };
export type UpdateRouteDto = Partial<CreateRouteDto>;

export interface IRouteRepository {
  getAll(): Promise<Route[]>;
  getById(id: number): Promise<Route>;
  create(data: CreateRouteDto): Promise<Route>;
  update(id: number, data: UpdateRouteDto): Promise<Route>;
  delete(id: number): Promise<Route>;
}
