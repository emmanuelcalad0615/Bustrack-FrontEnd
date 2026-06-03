'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../stores/authStore';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isInitialized = useAuthStore((s) => s.isInitialized);
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && (!user || user.role !== 'ADMIN')) {
      router.replace('/dashboard');
    }
  }, [isInitialized, user, router]);

  if (!isInitialized || !user || user.role !== 'ADMIN') return null;
  return <>{children}</>;
}
