'use client';

import { Session } from 'next-auth';

interface AuthSessionProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  // For now, we'll just pass through children since we're using server-side auth
  // In v5, session handling is more integrated with the server
  return <>{children}</>;
}
