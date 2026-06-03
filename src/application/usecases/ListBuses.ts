import type { IBusRepository } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';

export class ListBuses {
  constructor(private readonly busRepo: IBusRepository) {}

  async execute(): Promise<Bus[]> {
    return this.busRepo.getAll();
  }
}
