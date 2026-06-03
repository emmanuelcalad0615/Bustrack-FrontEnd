import type { IRouteRepository } from '../../domain/repositories';
import type { Route } from '../../domain/entities';

export class DeleteRoute {
  constructor(private readonly routeRepo: IRouteRepository) {}
  async execute(id: number): Promise<Route> {
    return this.routeRepo.delete(id);
  }
}
