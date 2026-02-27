'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Link2 } from 'lucide-react';

const REASONING_STEPS = [
  'Analyzing market conditions...',
  'Pattern matched: 98.4%',
  'Generating optimal route...',
];

const CYCLE_MS = 6000;

export const NeuralLedgerHero = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % REASONING_STEPS.length);
    }, CYCLE_MS / REASONING_STEPS.length);

    const cycleTimer = setInterval(() => {
      setIsConfirmed(false);
      setTimeout(() => setIsConfirmed(true), 5200);
    }, CYCLE_MS);

    const initialConfirmTimer = setTimeout(() => setIsConfirmed(true), 5200);

    return () => {
      clearInterval(stepTimer);
      clearInterval(cycleTimer);
      clearTimeout(initialConfirmTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-white/60 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-4 relative overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        <div className="absolute -top-10 -left-10 w-56 h-56 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -bottom-12 -right-10 w-56 h-56 rounded-full bg-blue-300/20 blur-3xl" />
      </motion.div>

      <div className="relative z-10">
        <div className="bg-white/80 border border-indigo-100 rounded-2xl p-4 shadow-sm min-h-[132px] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-4 h-4 text-indigo-500" />
            <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
              Agentic Inference
            </p>
          </div>

          <div className="min-h-[28px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={REASONING_STEPS[stepIndex]}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="text-sm text-slate-600 font-medium"
              >
                {REASONING_STEPS[stepIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="w-0.5 h-8 bg-slate-200 mx-auto relative my-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-indigo-500 absolute -left-[3px] shadow-[0_0_12px_rgba(99,102,241,0.7)]"
            animate={{ y: [0, 32] }}
            transition={{ repeat: Infinity, duration: CYCLE_MS / 1000, ease: 'easeInOut' }}
          />
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md text-slate-300">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4 text-cyan-400" />
            <p className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
              Smart Contract Settlement
            </p>
          </div>

          <p className="text-xs text-slate-400 font-mono mb-3">Tx: 0x4f...9a2</p>

          <motion.div
            animate={isConfirmed ? { scale: [0.98, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              isConfirmed
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
          >
            {isConfirmed ? '[ Block Confirmed ]' : '[ Pending... ]'}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

