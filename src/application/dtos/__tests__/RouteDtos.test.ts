import { describe, it, expect } from 'vitest';
import { createRouteSchema } from '../RouteDtos';

const valid = { name: 'Ruta Norte', origin: 'Chapinero', destination: 'Usaquén', active: true };

describe('createRouteSchema', () => {
  it('acepta datos válidos', () => {
    expect(createRouteSchema.safeParse(valid).success).toBe(true);
  });

  it('rechaza nombre menor de 2 caracteres', () => {
    const result = createRouteSchema.safeParse({ ...valid, name: 'R' });
    expect(result.success).toBe(false);
  });

  it('acepta nombre de exactamente 2 caracteres', () => {
    const result = createRouteSchema.safeParse({ ...valid, name: 'R1' });
    expect(result.success).toBe(true);
  });

  it('rechaza origen menor de 2 caracteres', () => {
    const result = createRouteSchema.safeParse({ ...valid, origin: 'A' });
    expect(result.success).toBe(false);
  });

  it('rechaza destino menor de 2 caracteres', () => {
    const result = createRouteSchema.safeParse({ ...valid, destination: 'Z' });
    expect(result.success).toBe(false);
  });

  it('acepta active: false', () => {
    const result = createRouteSchema.safeParse({ ...valid, active: false });
    expect(result.success).toBe(true);
  });

  it('rechaza cuando falta el campo active', () => {
    const { active: _, ...withoutActive } = valid;
    const result = createRouteSchema.safeParse(withoutActive);
    expect(result.success).toBe(false);
  });
});
