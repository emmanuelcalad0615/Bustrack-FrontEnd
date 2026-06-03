export type Alert = {
  id: number;
  userId: number;
  busId: number;
  message: string;
  read: boolean;
  createdAt: string;
};

export type ProximityResult = {
  alertsCreated: number;
  alerts: Alert[];
};
