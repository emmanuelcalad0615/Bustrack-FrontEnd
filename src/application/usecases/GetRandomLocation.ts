import type { IAlertRepository, RandomLocation } from '../../domain/repositories';

export class GetRandomLocation {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async execute(): Promise<RandomLocation> {
    return this.alertRepo.getRandomLocation();
  }
}
