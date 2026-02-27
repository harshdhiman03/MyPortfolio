'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

// Dynamic content based on lens
const HERO_CONTENT = {
  product: {
    headline: 'I build experiences that matter.',
    subtext:
      'Focusing on user-centric design, seamless interfaces, and solving real human problems through technology.',
  },
  engineering: {
    headline: 'I architect scalable systems.',
    subtext:
      'From Azure pipelines to low-latency backends, I build the foundations that keep complex applications running.',
  },
  agentic: {
    headline: 'I explore intelligent systems.',
    subtext:
      'Researching NLP, fine-tuning Transformers, and building autonomous AI agents that reason and act.',
  },
};

export const AboutHero = () => {
  const { lens } = useLens();
  const content = HERO_CONTENT[lens];

  // Get polymorphic styles for the avatar container
  const getAvatarStyles = () => {
    switch (lens) {
      case 'product':
        return {
          container:
            'rounded-[3rem] bg-slate-50/50 backdrop-blur-md border-4 border-white shadow-2xl',
          badge: 'absolute bottom-4 left-4 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg',
          badgeText: ' Say Hello',
        };
      case 'engineering':
        return {
          container:
            'rounded-sm bg-slate-900 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
          badge:
            'absolute top-4 right-4 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-sm text-xs font-mono border border-cyan-500/50',
          badgeText: ' STATUS: ONLINE',
        };
      case 'agentic':
        return {
          container:
            'rounded-3xl bg-purple-900/20 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.5)]',
          badge: 'hidden',
          badgeText: '',
        };
      default:
        return {
          container:
            'rounded-[3rem] bg-slate-50/50 backdrop-blur-md border-4 border-white shadow-2xl',
          badge: 'absolute bottom-4 left-4 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg',
          badgeText: ' Say Hello',
        };
    }
  };

  const avatarStyles = getAvatarStyles();

  return (
    <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 py-20 md:py-32">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Dynamic Typography */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={lens}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h1
                  className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight transition-colors duration-700 ${
                    lens === 'product'
                      ? 'text-slate-900'
                      : lens === 'engineering'
                      ? 'text-cyan-400 font-mono'
                      : 'text-purple-100'
                  }`}
                >
                  {content.headline}
                </h1>
                <p
                  className={`text-lg md:text-xl leading-relaxed transition-colors duration-700 ${
                    lens === 'product'
                      ? 'text-slate-600'
                      : lens === 'engineering'
                      ? 'text-slate-400 font-mono'
                      : 'text-purple-200/80'
                  }`}
                >
                  {content.subtext}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive Avatar */}
          <div className="relative flex items-center justify-center">
            {/* Agentic AI Aura Background */}
            {lens === 'agentic' && (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-magenta-600 rounded-3xl blur-3xl"
              />
            )}

            {/* Avatar Container */}
<motion.div
  animate={{ y: [0, -15, 0] }}
  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  className={`relative w-80 h-96 overflow-hidden ${avatarStyles.container}`}
>
              {/* Video */}
              <video
                src="/hdvid2.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {lens !== 'agentic' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className={avatarStyles.badge}
                >
                  {avatarStyles.badgeText}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
