import type { IRouteRepository, ListRoutesParams, PaginatedResult } from '../../domain/repositories';
import type { Route } from '../../domain/entities';

export class ListRoutes {
  constructor(private readonly routeRepo: IRouteRepository) {}

  async execute(params?: ListRoutesParams): Promise<PaginatedResult<Route>> {
    return this.routeRepo.getAll(params);
  }
}
