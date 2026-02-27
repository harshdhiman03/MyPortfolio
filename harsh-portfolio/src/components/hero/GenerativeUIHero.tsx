'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GenerativeUIHero = () => {
  return (
    <div className="w-full max-w-lg aspect-[4/3] bg-white/40 backdrop-blur-3xl border border-white/80 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(139,92,246,0.15)] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-14 -left-10 w-52 h-52 rounded-full bg-violet-200/35 blur-3xl" />
        <div className="absolute -bottom-16 -right-12 w-56 h-56 rounded-full bg-cyan-200/35 blur-3xl" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 rounded-full border border-slate-200/60"
          animate={{ scale: [0.98, 1.02, 0.98], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-56 h-56 rounded-full border border-slate-200/60"
          animate={{ scale: [1.02, 0.98, 1.02], opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
        <motion.div
          className="absolute w-40 h-40 rounded-full border border-slate-200/60"
          animate={{ scale: [0.98, 1.03, 0.98], opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />

        <svg className="absolute w-72 h-72" viewBox="0 0 288 288" aria-hidden>
          <path
            d="M48 210 L96 176 L138 188 L184 148 L236 164"
            fill="none"
            stroke="rgba(148,163,184,0.55)"
            strokeWidth="1.2"
          />
          <circle cx="210" cy="96" r="18" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="1.2" />
          <path
            d="M86 104 L122 118 L162 96"
            fill="none"
            stroke="rgba(148,163,184,0.5)"
            strokeWidth="1.1"
          />
          <circle cx="86" cy="104" r="2" fill="rgba(148,163,184,0.8)" />
          <circle cx="122" cy="118" r="2" fill="rgba(148,163,184,0.8)" />
          <circle cx="162" cy="96" r="2" fill="rgba(148,163,184,0.8)" />
        </svg>
      </div>

      <motion.div
        className="w-24 h-24 rotate-45 rounded-2xl bg-gradient-to-tr from-cyan-400 via-violet-500 to-fuchsia-500 border-2 border-white/50 relative z-10"
        animate={{
          scale: [1, 1.15, 1],
          rotate: [45, 50, 40, 45],
          boxShadow: [
            '0px 0px 0px rgba(139,92,246,0)',
            '0px 0px 60px rgba(139,92,246,0.6)',
            '0px 0px 0px rgba(139,92,246,0)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-[10%] rounded-xl bg-gradient-to-tr from-white/35 to-transparent" />
        <motion.span
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
          animate={{ x: [12, 66, 52, 12], y: [10, 30, 68, 10], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.95)]"
          animate={{ x: [44, 78, 26, 44], y: [6, 42, 74, 6], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.span
          className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          animate={{ x: [30, 12, 62, 30], y: [2, 40, 66, 2], opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        />
      </motion.div>

      <motion.div
        className="absolute top-10 left-8 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl p-3 shadow-xl shadow-slate-200/50 flex flex-col gap-1 z-20"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <span className="bg-violet-500 w-2 h-2 rounded-full" />
          <span className="text-[10px] font-semibold text-slate-700">Architecture: Scaled</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-8 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl p-3 shadow-xl shadow-slate-200/50 flex flex-col gap-1 z-20"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-2">
          <span className="bg-cyan-500 w-2 h-2 rounded-full" />
          <span className="text-[10px] font-semibold text-slate-700">Latency: 12ms</span>
        </div>
      </motion.div>
    </div>
  );
};

