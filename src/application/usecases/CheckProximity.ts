import type { IAlertRepository } from '../../domain/repositories';
import type { ProximityResult } from '../../domain/entities';

export class CheckProximity {
  constructor(private readonly alertRepo: IAlertRepository) {}

  async execute(
    latitude: number,
    longitude: number,
    thresholdMeters?: number,
  ): Promise<ProximityResult> {
    return this.alertRepo.checkProximity(latitude, longitude, thresholdMeters);
  }
}
