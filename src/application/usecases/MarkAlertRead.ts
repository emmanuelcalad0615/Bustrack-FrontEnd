import type { IAlertRepository } from '../../domain/repositories';
import type { Alert } from '../../domain/entities';

export class MarkAlertRead {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async execute(id: number): Promise<Alert> {
    return this.alertRepo.markRead(id);
  }
}
