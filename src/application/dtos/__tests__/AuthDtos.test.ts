import { describe, it, expect } from 'vitest';
import { loginSchema, registerSchema } from '../AuthDtos';

describe('loginSchema', () => {
  it('acepta email y contraseña válidos', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'secret123' });
    expect(result.success).toBe(true);
  });

  it('rechaza email vacío', () => {
    const result = loginSchema.safeParse({ email: '', password: 'secret123' });
    expect(result.success).toBe(false);
  });

  it('rechaza email con formato inválido', () => {
    const result = loginSchema.safeParse({ email: 'noesuncorreo', password: 'secret123' });
    expect(result.success).toBe(false);
  });

  it('rechaza contraseña menor de 6 caracteres', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '123' });
    expect(result.success).toBe(false);
  });

  it('acepta contraseña de exactamente 6 caracteres (límite inferior)', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: '123456' });
    expect(result.success).toBe(true);
  });
});

describe('registerSchema', () => {
  const valid = { name: 'Juan', email: 'juan@example.com', password: 'mypassword' };

  it('acepta datos válidos', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true);
  });

  it('rechaza nombre menor de 2 caracteres', () => {
    const result = registerSchema.safeParse({ ...valid, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('acepta nombre de exactamente 2 caracteres (límite inferior)', () => {
    const result = registerSchema.safeParse({ ...valid, name: 'Jo' });
    expect(result.success).toBe(true);
  });

  it('rechaza email inválido', () => {
    const result = registerSchema.safeParse({ ...valid, email: 'bademail' });
    expect(result.success).toBe(false);
  });

  it('rechaza contraseña corta', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'abc' });
    expect(result.success).toBe(false);
  });
});
