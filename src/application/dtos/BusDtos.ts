import { z } from 'zod';

export const createBusSchema = z.object({
  plate: z.string().min(2, 'Mínimo 2 caracteres'),
  model: z.string().min(2, 'Mínimo 2 caracteres'),
  capacity: z.number().min(1, 'Mínimo 1'),
  routeId: z.number().min(1, 'Selecciona una ruta'),
  active: z.boolean(),
});

export type CreateBusDto = z.infer<typeof createBusSchema>;
