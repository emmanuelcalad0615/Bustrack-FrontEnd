import type { IRouteRepository, UpdateRouteDto } from '../../domain/repositories';
import type { Route } from '../../domain/entities';

export class UpdateRoute {
  constructor(private readonly routeRepo: IRouteRepository) {}
  async execute(id: number, dto: UpdateRouteDto): Promise<Route> {
    return this.routeRepo.update(id, dto);
  }
}
