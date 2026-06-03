'use client';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { loginUser, logoutUser, registerUser } from '../../infrastructure/di/container';
import { useAuthStore } from '../stores/authStore';
import type { LoginDto, RegisterDto } from '../../application/dtos/AuthDtos';

export function useAuth() {
  const { user, token, isInitialized, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  async function login(dto: LoginDto) {
    const result = await loginUser.execute(dto.email, dto.password);
    setAuth(result.user, result.token);
    toast.success(`Bienvenido, ${result.user.name}`);
    router.replace('/dashboard');
  }

  async function register(dto: RegisterDto) {
    await registerUser.execute(dto.email, dto.password, dto.name);
    toast.success('Cuenta creada. Inicia sesión.');
    router.replace('/login');
  }

  function logout() {
    logoutUser.execute();
    clearAuth();
    router.replace('/login');
  }

  return { user, token, isInitialized, login, register, logout };
}
