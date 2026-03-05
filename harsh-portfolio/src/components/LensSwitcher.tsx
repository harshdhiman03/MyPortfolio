'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';

const LENS_OPTIONS = [
  { label: 'Product', value: 'product' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Agentic', value: 'agentic' },
] as const;

export const LensSwitcher = () => {
  const { lens, setLens } = useLens();

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      {/* Glassmorphism container */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-2 py-2 shadow-lg">
        {/* Segmented control wrapper */}
        <div className="relative flex gap-2">
          {/* Animated background pill */}
          {LENS_OPTIONS.map((option) => (
            <motion.div
              key={option.value}
              layoutId="activeTab"
              className={`absolute inset-0 rounded-full transition-colors ${
                lens === option.value ? 'bg-white/20' : ''
              }`}
              initial={false}
              animate={{
                opacity: lens === option.value ? 1 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 30,
              }}
            />
          ))}

          {/* Tab buttons */}
          {LENS_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setLens(option.value)}
              className={`relative px-6 py-2 rounded-full font-medium text-sm transition-colors z-10 ${
                lens === option.value
                  ? 'text-white'
                  : 'text-white/60 hover:text-white/80'
              }`}
            >
              <motion.span
                initial={false}
                animate={{
                  scale: lens === option.value ? 1.05 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 380,
                  damping: 30,
                }}
              >
                {option.label}
              </motion.span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
