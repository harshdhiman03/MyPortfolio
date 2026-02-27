'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AbstractDataLoop = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative w-[320px] h-[320px] mx-auto flex items-center justify-center">
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute inset-0"
          viewBox="0 0 320 320"
          aria-hidden
        >
          <circle
            cx="160"
            cy="160"
            r="140"
            fill="none"
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
        </motion.svg>

        <motion.svg
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className="absolute inset-0"
          viewBox="0 0 320 320"
          aria-hidden
        >
          <circle
            cx="160"
            cy="160"
            r="108"
            fill="none"
            stroke="rgba(6, 182, 212, 0.3)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
        </motion.svg>

        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          className="absolute inset-0"
          viewBox="0 0 320 320"
          aria-hidden
        >
          <circle
            cx="160"
            cy="160"
            r="76"
            fill="none"
            stroke="rgba(168, 85, 247, 0.3)"
            strokeWidth="1"
            strokeDasharray="4 12"
          />
        </motion.svg>

        <div className="absolute w-14 h-14 rounded-full bg-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.4)] blur-md" />
        <div className="absolute w-2 h-2 rounded-full bg-cyan-300/80" />
      </div>
    </div>
  );
};

