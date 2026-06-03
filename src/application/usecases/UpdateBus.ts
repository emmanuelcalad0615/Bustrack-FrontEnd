import type { IBusRepository, UpdateBusDto } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';

export class UpdateBus {
  constructor(private readonly busRepo: IBusRepository) {}
  async execute(id: number, dto: UpdateBusDto): Promise<Bus> {
    return this.busRepo.update(id, dto);
  }
}
