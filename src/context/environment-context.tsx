'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type EnvironmentContextType = {
  environmentUri: string | null;
  setEnvironmentUri: Dispatch<SetStateAction<string | null>>;
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environmentUri, setEnvironmentUri] = useState<string | null>(null);

  return (
    <EnvironmentContext.Provider value={{ environmentUri, setEnvironmentUri }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}
