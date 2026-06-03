const ROUTE_PALETTE = [
  '#4E79A7', '#F28E2B', '#E15759', '#B07AA1', '#9C755F',
  '#76B7B2', '#59A14F', '#EDC948', '#FF9DA7', '#BAB0AC',
];

export function routeColor(routeId: number): string {
  return ROUTE_PALETTE[routeId % ROUTE_PALETTE.length];
}
