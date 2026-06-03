import type { IBusRepository, CreateBusDto } from '../../domain/repositories';
import type { Bus } from '../../domain/entities';

export class CreateBus {
  constructor(private readonly busRepo: IBusRepository) {}
  async execute(dto: CreateBusDto): Promise<Bus> {
    return this.busRepo.create(dto);
  }
}
