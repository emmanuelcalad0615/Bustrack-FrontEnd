import type { HttpSyncRepository } from '../../infrastructure/repositories/HttpSyncRepository';

export class SyncRoutes {
  constructor(private readonly syncRepo: HttpSyncRepository) {}
  async execute(): Promise<unknown> {
    return this.syncRepo.syncRoutes();
  }
}
