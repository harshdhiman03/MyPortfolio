'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

export const AboutHero = () => {
  const { lens } = useLens();

  // Hero content based on lens
  const heroContent = useMemo(() => {
    switch (lens) {
      case 'product':
        return {
          headline: 'I build experiences that matter.',
          subtext: 'Focusing on user-centric design, seamless interfaces, and solving real human problems through technology.',
        };
      case 'engineering':
        return {
          headline: 'I architect scalable systems.',
          subtext: 'From Azure pipelines to low-latency backends, I build the foundations that keep complex applications running.',
        };
      case 'agentic':
        return {
          headline: 'I explore intelligent systems.',
          subtext: 'Researching NLP, fine-tuning Transformers, and building autonomous AI agents that reason and act.',
        };
      default:
        return {
          headline: 'I build experiences that matter.',
          subtext: 'Focusing on user-centric design, seamless interfaces, and solving real human problems through technology.',
        };
    }
  }, [lens]);

  // Styling based on lens
  const getHeroStyles = () => {
    switch (lens) {
      case 'product':
        return {
          headlineColor: 'text-slate-900',
          subtextColor: 'text-slate-600',
          gridBg: 'bg-gradient-to-b from-blue-50/30 to-white',
        };
      case 'engineering':
        return {
          headlineColor: 'text-slate-100',
          subtextColor: 'text-cyan-300/90',
          gridBg: 'bg-gradient-to-b from-slate-900 to-slate-950',
        };
      case 'agentic':
        return {
          headlineColor: 'text-violet-100',
          subtextColor: 'text-violet-300/80',
          gridBg: 'bg-gradient-to-b from-[#0f0a1a] to-[#05050a]',
        };
      default:
        return {
          headlineColor: 'text-slate-900',
          subtextColor: 'text-slate-600',
          gridBg: 'bg-gradient-to-b from-blue-50/30 to-white',
        };
    }
  };

  // Avatar container styling based on lens
  const getAvatarContainerStyles = () => {
    switch (lens) {
      case 'product':
        return {
          container: 'rounded-[3rem] bg-slate-50/50 backdrop-blur-md border-4 border-white shadow-2xl',
          overlay: null,
          aura: null,
        };
      case 'engineering':
        return {
          container: 'rounded-sm bg-slate-900 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
          overlay: 'absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-slate-800/80 border border-cyan-500/30 backdrop-blur-sm',
          aura: null,
        };
      case 'agentic':
        return {
          container: 'rounded-2xl bg-violet-900/10 border border-violet-500/30 shadow-[0_0_40px_rgba(168,85,247,0.5)]',
          overlay: null,
          aura: 'absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 blur-2xl -z-10',
        };
      default:
        return {
          container: 'rounded-[3rem] bg-slate-50/50 backdrop-blur-md border-4 border-white shadow-2xl',
          overlay: null,
          aura: null,
        };
    }
  };

  const heroStyles = getHeroStyles();
  const avatarStyles = getAvatarContainerStyles();

  return (
    <section className={`relative min-h-screen flex items-center px-4 md:px-8 pt-20 md:pt-24 pb-16 ${heroStyles.gridBg}`}>
      {/* Background gradient effect for agentic lens */}
      {lens === 'agentic' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left Column: Dynamic Typography */}
        <div className="flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`headline-${lens}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className={`text-5xl md:text-7xl font-bold leading-tight ${heroStyles.headlineColor}`}
              >
                {heroContent.headline}
              </h1>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`subtext-${lens}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                className={`text-lg md:text-xl leading-relaxed max-w-xl ${heroStyles.subtextColor}`}
              >
                {heroContent.subtext}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Optional CTA Button */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`cta-${lens}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-4"
            >
              {lens === 'product' && (
                <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg">
                  Let's Create Together
                </button>
              )}
              {lens === 'engineering' && (
                <button className="px-8 py-3 rounded-sm bg-cyan-600 text-slate-900 font-mono font-semibold hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] uppercase text-sm tracking-wider">
                  View Infrastructure
                </button>
              )}
              {lens === 'agentic' && (
                <button className="px-8 py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                  Explore AI Research
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Interactive Avatar Video */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          {/* AI Aura background (agentic lens only) */}
          {lens === 'agentic' && (
            <motion.div
              className={`absolute inset-0 rounded-2xl ${avatarStyles.aura}`}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Avatar Container */}
          <motion.div
            key={`avatar-${lens}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className={`relative w-full h-full max-w-md max-h-md overflow-hidden ${avatarStyles.container}`}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full"
            >
              {/* Video Element */}
              <video
                src="/hdvid.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Lens Badge */}
            {lens === 'product' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-white shadow-lg"
              >
                <span className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  👋 Say Hello
                </span>
              </motion.div>
            )}

            {/* Engineering Lens Badge */}
            {lens === 'engineering' && (
              <motion.div
                className="absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-sm bg-slate-800/90 border border-cyan-500/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs font-mono text-cyan-300 tracking-wider uppercase">
                  Status: Online
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
