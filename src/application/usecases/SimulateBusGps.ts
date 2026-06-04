import type { ILocationRepository } from '../../domain/repositories';
import type { BusLocation } from '../../domain/entities';

export class SimulateBusGps {
  constructor(private readonly locationRepo: ILocationRepository) {}

  async execute(busId: number): Promise<BusLocation> {
    return this.locationRepo.simulate(busId);
  }
}
