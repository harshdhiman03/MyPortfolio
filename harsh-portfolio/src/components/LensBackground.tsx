'use client';

import React from 'react';
import { useLens } from '@/context/LensContext';

export const LensBackground = ({ children }: { children: React.ReactNode }) => {
  const { lens } = useLens();

  const getBackgroundPattern = () => {
    switch (lens) {
      case 'product':
        return (
          <div className="fixed inset-0 pointer-events-none opacity-40 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-slate-50" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="product-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#product-grid)" />
            </svg>
          </div>
        );
      case 'engineering':
        return (
          <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
            <div className="absolute inset-0 bg-slate-950" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="engineering-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0f172a" strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.5" fill="#06b6d4" opacity="0.4" />
                  <circle cx="60" cy="60" r="1.5" fill="#06b6d4" opacity="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#engineering-grid)" />
            </svg>
          </div>
        );
      case 'agentic':
        return (
          <div className="fixed inset-0 pointer-events-none opacity-50 z-0">
            <div className="absolute inset-0 bg-[#0a0a0f]" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="agentic-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#6b21a8" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="0" cy="0" r="2" fill="#ec4899" opacity="0.2" />
                  <circle cx="80" cy="80" r="2" fill="#a855f7" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#agentic-grid)" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {getBackgroundPattern()}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
