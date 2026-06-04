'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginDto } from '../../../application/dtos/AuthDtos';
import { useAuth } from '../../../presentation/hooks/useAuth';
import { Logo } from '../../../presentation/components/Logo';

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginDto>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginDto) {
    try {
      await login(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError('root', { message });
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-[#1E293B] border border-[#475569] rounded-xl p-8 space-y-6">
        <div className="space-y-3">
          <Logo size={32} />
          <p className="text-sm text-[#94A3B8]">Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
              autoComplete="current-password"
              {...register('password')}
              className="w-full rounded-lg bg-[#0F172A] border border-[#475569] px-3 py-2 text-[#F1F5F9] placeholder-[#475569] focus:outline-none focus:border-[#2563EB] transition-colors"
              placeholder="••••••"
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
            {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <p className="text-sm text-center text-[#94A3B8]">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-[#2563EB] hover:text-[#1D4ED8] font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
