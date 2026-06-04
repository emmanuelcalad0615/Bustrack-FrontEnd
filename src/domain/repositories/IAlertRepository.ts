import type { Alert, ProximityResult } from '../entities';

export type RandomLocation = {
  latitude: number;
  longitude: number;
  nearBusId: number;
  strategy: string;
};

export interface IAlertRepository {
  getMine(): Promise<Alert[]>;
  create(busId: number, message: string): Promise<Alert>;
  markRead(id: number): Promise<Alert>;
  delete(id: number): Promise<void>;
  checkProximity(latitude: number, longitude: number, thresholdMeters?: number): Promise<ProximityResult>;
  getRandomLocation(): Promise<RandomLocation>;
}
