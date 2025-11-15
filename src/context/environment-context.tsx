'use client';

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type EnvironmentContextType = {
  environmentScript: string | null;
  setEnvironmentScript: Dispatch<SetStateAction<string | null>>;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
};

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [environmentScript, setEnvironmentScript] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <EnvironmentContext.Provider value={{ environmentScript, setEnvironmentScript, isGenerating, setIsGenerating }}>
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
