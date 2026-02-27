'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Link2, Sparkles } from 'lucide-react';

export const HeroGenerativeCore = () => {
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="relative w-full max-w-[620px] h-[360px] rounded-3xl overflow-hidden border border-white/10 bg-[#070912]/80 backdrop-blur-xl">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [-20, 30, -10, -20], y: [-10, 20, -5, -10], scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
            className="absolute -top-16 -left-8 w-72 h-72 bg-purple-400/30 blur-[80px] rounded-full"
          />
          <motion.div
            animate={{ x: [10, -25, 20, 10], y: [15, -20, 10, 15], scale: [1.1, 0.95, 1.1] }}
            transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut', delay: 0.8 }}
            className="absolute -bottom-20 left-32 w-72 h-72 bg-cyan-400/30 blur-[80px] rounded-full"
          />
          <motion.div
            animate={{ x: [0, 15, -10, 0], y: [-10, 10, -20, -10], scale: [0.95, 1.1, 0.95] }}
            transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut', delay: 1.2 }}
            className="absolute top-8 right-4 w-72 h-72 bg-indigo-500/20 blur-[80px] rounded-full"
          />
        </div>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M50 50 Q58 40 68 30"
            fill="none"
            stroke="rgba(168, 85, 247, 0.35)"
            strokeWidth="0.35"
            strokeDasharray="2 3"
            animate={{ strokeDashoffset: [0, -10] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          />
          <motion.path
            d="M50 50 Q42 62 30 72"
            fill="none"
            stroke="rgba(34, 211, 238, 0.3)"
            strokeWidth="0.35"
            strokeDasharray="2 3"
            animate={{ strokeDashoffset: [0, -12] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
          />
        </svg>

        <div className="absolute inset-0">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-32 h-32 rotate-45 rounded-[2rem] backdrop-blur-xl bg-white/5 border border-white/20 shadow-[0_0_40px_rgba(168,85,247,0.2)] flex items-center justify-center">
              <div className="-rotate-45 w-7 h-7 rounded-full bg-purple-500 shadow-[0_0_20px_#a855f7]" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8], x: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.4 }}
            className="absolute right-[18%] top-[18%]"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
              <Sparkles className="w-3.5 h-3.5 text-white/70" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], x: [4, -4, 4] }}
            transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.8 }}
            className="absolute left-[14%] bottom-[16%]"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-3 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(196,113,255,0.9)]" />
              <Link2 className="w-3.5 h-3.5 text-white/70" />
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [-6, 9, -6], x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 0.3 }}
            className="absolute right-[8%] top-[48%]"
          >
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-3 py-2">
              <span className="block w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.95)]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

