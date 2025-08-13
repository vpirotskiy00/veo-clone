'use client';

import type { Session } from 'next-auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AuthAPI,
  type AuthStatusResponse,
  pollAuthStatus,
} from '@/lib/api/auth';

interface AuthContextValue {
  isAuthenticated: boolean;
  jwt: string | null;
  user: unknown | null;
  loading: boolean;
  startTelegramAuth: () => Promise<void>;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthSessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('veo_jwt');
      if (saved) setJwt(saved);
    } catch {}
  }, []);

  const clearSession = useCallback(() => {
    setJwt(null);
    setUser(null);
    try {
      localStorage.removeItem('veo_jwt');
    } catch {}
  }, []);

  const startTelegramAuth = useCallback(async () => {
    setLoading(true);
    try {
      const { url, token } = await AuthAPI.getAuthLink();
      window.open(url, '_blank', 'noopener,noreferrer');
      const status: AuthStatusResponse = await pollAuthStatus(token, {
        intervalMs: 2500,
        timeoutMs: 5 * 60 * 1000,
      });
      if (status.jwt) {
        setJwt(status.jwt);
        try {
          localStorage.setItem('veo_jwt', status.jwt);
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(jwt),
      jwt,
      user,
      loading,
      startTelegramAuth,
      clearSession,
    }),
    [jwt, user, loading, startTelegramAuth, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthSessionProvider');
  return ctx;
}
