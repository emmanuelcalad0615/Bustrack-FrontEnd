import type { IAlertRepository } from '../../domain/repositories';

export class DeleteAlert {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async execute(id: number): Promise<void> {
    return this.alertRepo.delete(id);
  }
}
