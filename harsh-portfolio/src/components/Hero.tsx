'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { ProductCard } from './hero/ProductCard';
import { SystemDiagram } from './hero/SystemDiagram';
import { AgentTerminal } from './hero/AgentTerminal';

// Content for each lens
const HERO_CONTENT = {
  product: {
    headline: 'Building Award-Winning Web3 & AI Experiences.',
    subtitle: 'HackIndia Spark-2 Winner.',
    cta: 'View Case Study',
    component: ProductCard,
  },
  engineering: {
    headline: 'Architecting Scalable Cloud Pipelines.',
    subtitle: 'Reduced process time by 36% at Infosys.',
    cta: 'View Architecture',
    component: SystemDiagram,
  },
  agentic: {
    headline: 'Designing Intelligent Agents & NLP Systems.',
    subtitle: 'Researching Text Summarization & Transformers.',
    cta: 'Ask the Agent',
    component: AgentTerminal,
  },
};

export const Hero = () => {
  const { lens } = useLens();
  const content = HERO_CONTENT[lens];
  const Component = content.component;

  return (
    <section
      className={`relative min-h-screen overflow-hidden py-20 px-4 transition-colors duration-700 ${
        lens === 'product'
          ? 'bg-white'
          : lens === 'engineering'
          ? 'bg-slate-950'
          : 'bg-[#0a0a0f]'
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {lens === 'product' ? (
          <>
            {/* Product: Subtle gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50/20 rounded-full blur-3xl" />
          </>
        ) : lens === 'engineering' ? (
          <>
            {/* Engineering: Grid pattern and subtle cyan accents */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
              }}
            />
            <div className="absolute top-20 right-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            {/* Agentic: Futuristic floating orbs and grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(168, 85, 247, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(168, 85, 247, 0.4) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-32 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -30, 0],
                y: [0, 30, 0],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-32 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-3xl"
            />
          </>
        )}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={lens}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col justify-center space-y-6 ${
                lens === 'product' ? 'max-w-xl' : ''
              }`}
            >
              {/* Lens label */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-none text-sm font-mono mb-4 uppercase tracking-widest ${
                    lens === 'product'
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                      : lens === 'engineering'
                      ? 'bg-slate-900 border border-slate-800 text-cyan-400'
                      : 'bg-purple-900/30 border border-violet-500/50 text-violet-300 shadow-lg shadow-violet-500/20'
                  }`}
                >
                  {lens.charAt(0).toUpperCase() + lens.slice(1)} Lens
                </span>
              </motion.div>

              {/* Main headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`font-bold leading-tight ${
                  lens === 'product'
                    ? 'text-5xl lg:text-6xl text-slate-900 tracking-tight'
                    : lens === 'engineering'
                    ? 'text-5xl lg:text-6xl text-white font-mono tracking-wider'
                    : 'text-5xl lg:text-6xl text-purple-50 tracking-tight'
                }`}
              >
                {lens === 'product' ? (
                  <span>{content.headline}</span>
                ) : lens === 'engineering' ? (
                  <span className="text-cyan-400">{content.headline}</span>
                ) : (
                  <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
                    {content.headline}
                  </span>
                )}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className={`text-xl leading-relaxed max-w-lg ${
                  lens === 'product'
                    ? 'text-slate-600'
                    : lens === 'engineering'
                    ? 'text-slate-300 font-mono text-base'
                    : 'text-purple-200/80'
                }`}
              >
                {content.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={
                    lens === 'product'
                      ? { scale: 1.02 }
                      : lens === 'engineering'
                      ? { borderColor: 'rgb(34, 211, 238)' }
                      : { boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' }
                  }
                  whileTap={{ scale: 0.96 }}
                  className={`px-8 py-4 rounded-none font-semibold font-mono text-lg border transition-all uppercase tracking-widest text-sm ${
                    lens === 'product'
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700 shadow-sm hover:shadow-md'
                      : lens === 'engineering'
                      ? 'bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/50'
                      : 'bg-gradient-to-r from-violet-600/40 to-pink-600/40 hover:from-violet-600/50 hover:to-pink-600/50 text-violet-200 border border-violet-500/50 hover:border-violet-400/80 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50'
                  }`}
                >
                  {content.cta}
                  <span className="ml-2 inline-block">→</span>
                </motion.button>
              </motion.div>

              {/* Decorative line */}
              {lens === 'product' ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100px' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 bg-indigo-600 mt-8"
                />
              ) : lens === 'engineering' ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100px' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 bg-cyan-500 mt-8"
                />
              ) : (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100px' }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-1 bg-gradient-to-r from-violet-500 to-pink-500 mt-8 shadow-lg shadow-violet-500/50"
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Right side - Visual component */}
          <AnimatePresence mode="wait">
            <motion.div
              key={lens}
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center"
            >
              <Component />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom stats/info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
          className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 ${
            lens === 'product'
              ? 'border-t border-gray-200'
              : lens === 'engineering'
              ? 'border-t border-slate-800'
              : 'border-t border-purple-500/20'
          }`}
        >
          {/* Stat 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2 group cursor-pointer"
          >
            <p
              className={`text-3xl font-bold font-mono ${
                lens === 'product'
                  ? 'text-slate-900'
                  : lens === 'engineering'
                  ? 'text-cyan-400'
                  : 'text-violet-400'
              }`}
            >
              36%
            </p>
            <p
              className={`font-mono text-sm ${
                lens === 'product'
                  ? 'text-slate-600'
                  : lens === 'engineering'
                  ? 'text-slate-400 uppercase tracking-widest text-xs'
                  : 'text-purple-300/80 uppercase tracking-widest text-xs'
              }`}
            >
              Process Time Reduction
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2 group cursor-pointer"
          >
            <p
              className={`text-3xl font-bold font-mono ${
                lens === 'product'
                  ? 'text-slate-900'
                  : lens === 'engineering'
                  ? 'text-emerald-400'
                  : 'text-pink-400'
              }`}
            >
              3
            </p>
            <p
              className={`font-mono text-sm ${
                lens === 'product'
                  ? 'text-slate-600'
                  : lens === 'engineering'
                  ? 'text-slate-400 uppercase tracking-widest text-xs'
                  : 'text-purple-300/80 uppercase tracking-widest text-xs'
              }`}
            >
              Award-Winning Projects
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="space-y-2 group cursor-pointer"
          >
            <p
              className={`text-3xl font-bold font-mono ${
                lens === 'product'
                  ? 'text-slate-900'
                  : lens === 'engineering'
                  ? 'text-cyan-400'
                  : 'text-cyan-400'
              }`}
            >
              AI/Web3
            </p>
            <p
              className={`font-mono text-sm ${
                lens === 'product'
                  ? 'text-slate-600'
                  : lens === 'engineering'
                  ? 'text-slate-400 uppercase tracking-widest text-xs'
                  : 'text-purple-300/80 uppercase tracking-widest text-xs'
              }`}
            >
              Tech Stack Focus
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-sm font-mono uppercase tracking-widest ${
          lens === 'product'
            ? 'text-slate-500'
            : lens === 'engineering'
            ? 'text-slate-600'
            : 'text-purple-400/60'
        }`}
      >
        Scroll to explore
      </motion.div>
    </section>
  );
};
