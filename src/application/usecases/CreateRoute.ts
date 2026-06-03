import type { IRouteRepository, CreateRouteDto } from '../../domain/repositories';
import type { Route } from '../../domain/entities';

export class CreateRoute {
  constructor(private readonly routeRepo: IRouteRepository) {}
  async execute(dto: CreateRouteDto): Promise<Route> {
    return this.routeRepo.create(dto);
  }
}
