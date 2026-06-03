import type { Route } from './Route';

export type Subscription = {
  id: number;
  userId: number;
  routeId: number;
  createdAt: string;
  route?: Route;
};
