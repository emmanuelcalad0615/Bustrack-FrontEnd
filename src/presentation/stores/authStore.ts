'use client';

import { create } from 'zustand';
import type { User } from '../../domain/entities';

type AuthState = {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setInitialized: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isInitialized: false,
  setAuth: (user, token) => set({ user, token }),
  clearAuth: () => set({ user: null, token: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
