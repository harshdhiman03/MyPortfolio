'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

const LENS_OPTIONS = ['Product', 'Engineering', 'Agentic'] as const;
type LensType = 'product' | 'engineering' | 'agentic';

const lensMap: Record<string, LensType> = {
  'Product': 'product',
  'Engineering': 'engineering',
  'Agentic': 'agentic',
};

export const LensToggle = () => {
  const { lens, setLens } = useLens();

  // Get container styles based on lens
  const getContainerStyles = () => {
    switch (lens) {
      case 'product':
        return {
          container: 'bg-white/70 backdrop-blur-md border-white/20 shadow-2xl',
          borderRadius: 'rounded-full',
        };
      case 'engineering':
        return {
          container: 'bg-slate-900/80 backdrop-blur-md border border-slate-700',
          borderRadius: 'rounded-md',
        };
      case 'agentic':
        return {
          container: 'bg-black/80 backdrop-blur-xl border border-violet-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)]',
          borderRadius: 'rounded-full',
        };
      default:
        return {
          container: 'bg-white/70 backdrop-blur-md border-white/20 shadow-2xl',
          borderRadius: 'rounded-full',
        };
    }
  };

  // Get active indicator styles based on lens
  const getIndicatorStyles = () => {
    switch (lens) {
      case 'product':
        return {
          background: 'bg-white shadow-sm rounded-full',
          textColor: 'text-slate-800',
        };
      case 'engineering':
        return {
          background: 'bg-slate-800 border border-slate-600 rounded-sm',
          textColor: 'text-cyan-400 font-mono tracking-wider',
        };
      case 'agentic':
        return {
          background: 'bg-violet-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]',
          textColor: 'text-white font-medium drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]',
        };
      default:
        return {
          background: 'bg-white shadow-sm rounded-full',
          textColor: 'text-slate-800',
        };
    }
  };

  // Get inactive text color based on lens
  const getInactiveTextColor = () => {
    switch (lens) {
      case 'product':
        return 'text-slate-600 hover:text-slate-800';
      case 'engineering':
        return 'text-slate-400 font-mono tracking-wider hover:text-slate-200';
      case 'agentic':
        return 'text-violet-300/60 hover:text-violet-100';
      default:
        return 'text-slate-600 hover:text-slate-800';
    }
  };

  const containerStyles = getContainerStyles();
  const indicatorStyles = getIndicatorStyles();
  const inactiveTextColor = getInactiveTextColor();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lens}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 px-2 py-2 ${containerStyles.borderRadius} ${containerStyles.container} transition-all duration-700`}
      >
        <div className="flex items-center gap-2">
          {LENS_OPTIONS.map((option) => {
            const isActive = lens === lensMap[option];
            return (
              <motion.button
                key={option}
                onClick={() => setLens(lensMap[option])}
                className="relative px-6 py-2 text-sm font-medium transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator with layoutId for sliding pane effect */}
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      layoutId="active-lens"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className={`absolute inset-0 -z-10 ${indicatorStyles.background}`}
                    />
                  )}
                </AnimatePresence>

                {/* Text with color animation */}
                <motion.span
                  animate={{
                    color: isActive ? undefined : 'inherit',
                  }}
                  transition={{ duration: 0.3 }}
                  className={isActive ? indicatorStyles.textColor : inactiveTextColor}
                >
                  {option}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
