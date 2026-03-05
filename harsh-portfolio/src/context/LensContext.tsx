'use client';

// LensContext.tsx
// React Context for managing the current lens

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Step 2: Define the LensType type
export type LensType = 'product' | 'engineering' | 'agentic';

// Step 3: Implement the LensContext and LensProvider
interface LensContextProps {
  lens: LensType;
  setLens: (lens: LensType) => void;
  toggleLens: () => void;
}

const LensContext = createContext<LensContextProps | undefined>(undefined);

export const LensProvider = ({ children }: { children: ReactNode }) => {
  const [lens, setLensState] = useState<LensType>('product');

  // On mount, read from localStorage
  React.useEffect(() => {
    const savedLens = localStorage.getItem('activeLens') as LensType | null;
    if (
      savedLens === 'product' ||
      savedLens === 'engineering' ||
      savedLens === 'agentic'
    ) {
      setLensState(savedLens);
    }
  }, []);

  const handleSetLens = (newLens: LensType) => {
    setLensState(newLens);
    localStorage.setItem('activeLens', newLens);
  };

  // Simple toggle: cycles through the three lens types
  const toggleLens = () => {
    setLensState((prev) => {
      const nextLens =
        prev === 'product'
          ? 'engineering'
          : prev === 'engineering'
          ? 'agentic'
          : 'product';
      localStorage.setItem('activeLens', nextLens);
      return nextLens;
    });
  };

  return (
    <LensContext.Provider value={{ lens, setLens: handleSetLens, toggleLens }}>
      {children}
    </LensContext.Provider>
  );
};

// Step 4: Implement the useLens custom hook
export const useLens = () => {
  const context = useContext(LensContext);
  if (!context) {
    throw new Error('useLens must be used within a LensProvider');
  }
  return context;
};
