import type { IBusRepository, ListBusesParams, PaginatedResult } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';

export class ListBuses {
  constructor(private readonly busRepo: IBusRepository) {}

  async execute(params?: ListBusesParams): Promise<PaginatedResult<Bus>> {
    return this.busRepo.getAll(params);
  }
}
