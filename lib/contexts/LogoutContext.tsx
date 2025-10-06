'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import LottieLoader from '@/components/LottieLoader';

interface LogoutContextType {
  showLogoutLoading: () => void;
  hideLogoutLoading: () => void;
}

const LogoutContext = createContext<LogoutContextType | undefined>(undefined);

export function LogoutProvider({ children }: { children: ReactNode }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const showLogoutLoading = () => setIsLoggingOut(true);
  const hideLogoutLoading = () => setIsLoggingOut(false);

  return (
    <LogoutContext.Provider value={{ showLogoutLoading, hideLogoutLoading }}>
      {children}
      {/* Global Logout Loading Screen */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center z-[9999]">
          <LottieLoader size={280} text="Logging out of Synk..." />
        </div>
      )}
    </LogoutContext.Provider>
  );
}

export function useLogout() {
  const context = useContext(LogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within LogoutProvider');
  }
  return context;
}

