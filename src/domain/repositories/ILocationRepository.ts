import type { BusLocation } from '../entities';

export interface ILocationRepository {
  getByBusId(busId: number): Promise<BusLocation>;
  update(busId: number, latitude: number, longitude: number): Promise<BusLocation>;
  simulate(busId: number): Promise<BusLocation>;
}
