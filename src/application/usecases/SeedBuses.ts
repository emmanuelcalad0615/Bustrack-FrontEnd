import type { HttpSyncRepository } from '../../infrastructure/repositories/HttpSyncRepository';

export class SeedBuses {
  constructor(private readonly syncRepo: HttpSyncRepository) {}
  async execute(busesPerRoute = 2): Promise<unknown> {
    return this.syncRepo.seedBuses(busesPerRoute);
  }
}
