import type { ILocationRepository } from '../../domain/repositories';
import type { BusLocation } from '../../domain/entities';

export class GetBusLocation {
  constructor(private readonly locationRepo: ILocationRepository) {}

  async execute(busId: number): Promise<BusLocation | null> {
    return this.locationRepo.getByBusId(busId);
  }
}
