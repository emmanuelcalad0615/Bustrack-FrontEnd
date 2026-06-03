import type { IRouteRepository } from '../../domain/repositories';
import type { Route } from '../../domain/entities';

export class ListRoutes {
  constructor(private readonly routeRepo: IRouteRepository) {}

  async execute(): Promise<Route[]> {
    return this.routeRepo.getAll();
  }
}
