'use client';

import type { ReactNode } from 'react';
import ReactLenis from 'lenis/react';

interface SmoothScrollingProps {
  children: ReactNode;
}

export const SmoothScrolling = ({ children }: SmoothScrollingProps) => {
  return <ReactLenis root>{children}</ReactLenis>;
};

