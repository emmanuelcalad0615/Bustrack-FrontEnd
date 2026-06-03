import type { IAlertRepository } from '../../domain/repositories';
import type { Alert } from '../../domain/entities';

export class GetMyAlerts {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async execute(): Promise<Alert[]> {
    return this.alertRepo.getMine();
  }
}
