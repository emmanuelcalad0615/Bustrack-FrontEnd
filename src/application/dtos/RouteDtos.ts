import { z } from 'zod';

export const createRouteSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  origin: z.string().min(2, 'Mínimo 2 caracteres'),
  destination: z.string().min(2, 'Mínimo 2 caracteres'),
  active: z.boolean(),
});

export type CreateRouteFormDto = z.infer<typeof createRouteSchema>;
