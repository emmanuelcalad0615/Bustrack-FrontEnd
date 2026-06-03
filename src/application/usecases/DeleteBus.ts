import type { IBusRepository } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';

export class DeleteBus {
  constructor(private readonly busRepo: IBusRepository) {}
  async execute(id: number): Promise<Bus> {
    return this.busRepo.delete(id);
  }
}
