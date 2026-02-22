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
  const [lens, setLens] = useState<LensType>('product');

  // Simple toggle: cycles through the three lens types
  const toggleLens = () => {
    setLens(prev => {
      if (prev === 'product') return 'engineering';
      if (prev === 'engineering') return 'agentic';
      return 'product';
    });
  };

  return (
    <LensContext.Provider value={{ lens, setLens, toggleLens }}>
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
