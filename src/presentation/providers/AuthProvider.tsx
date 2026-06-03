'use client';

import { useEffect } from 'react';
import { getCurrentSession } from '../../infrastructure/di/container';
import { useAuthStore } from '../stores/authStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setAuth = useAuthStore((s) => s.setAuth);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    const session = getCurrentSession.execute();
    if (session) setAuth(session.user, session.token);
    setInitialized();
  }, [setAuth, setInitialized]);

  return <>{children}</>;
}
