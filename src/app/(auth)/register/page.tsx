'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterDto } from '../../../application/dtos/AuthDtos';
import { useAuth } from '../../../presentation/hooks/useAuth';

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterDto>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(data: RegisterDto) {
    try {
      await registerUser(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError('root', { message });
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-[#1E293B] border border-[#475569] rounded-xl p-8 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-[#F1F5F9]">Crear cuenta</h1>
          <p className="text-sm text-[#94A3B8]">Únete a BusTrack</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-[#F1F5F9]">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              {...register('name')}
              className="w-full rounded-lg bg-[#0F172A] border border-[#475569] px-3 py-2 text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
              placeholder="Tu nombre"
            />
            {errors.name && (
              <p className="text-xs text-[#EF4444]">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#F1F5F9]">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              className="w-full rounded-lg bg-[#0F172A] border border-[#475569] px-3 py-2 text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
              placeholder="usuario@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-[#EF4444]">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-[#F1F5F9]">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              className="w-full rounded-lg bg-[#0F172A] border border-[#475569] px-3 py-2 text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
              placeholder="Mínimo 6 caracteres"
            />
            {errors.password && (
              <p className="text-xs text-[#EF4444]">{errors.password.message}</p>
            )}
          </div>

          {errors.root && (
            <p className="text-xs text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-lg px-3 py-2">
              {errors.root.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-sm text-center text-[#94A3B8]">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
