import type { Route } from '../entities';

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type ListRoutesParams = {
  page?: number;
  pageSize?: number;
  q?: string;
  active?: boolean;
};

export type CreateRouteDto = { name: string; origin: string; destination: string; active?: boolean };
export type UpdateRouteDto = Partial<CreateRouteDto>;

export interface IRouteRepository {
  getAll(params?: ListRoutesParams): Promise<PaginatedResult<Route>>;
  getById(id: number): Promise<Route>;
  create(data: CreateRouteDto): Promise<Route>;
  update(id: number, data: UpdateRouteDto): Promise<Route>;
  delete(id: number): Promise<Route>;
}
