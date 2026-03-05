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
    headline: 'I architect end-to-end systems.',
    subtext:
      'From Azure data workflows to robust ML backends, I build the secure foundations that power intelligent applications.',
  },
  agentic: {
    headline: 'I explore intelligent systems.',
    subtext:
      'Researching NLP, fine-tuning Transformers, and building autonomous AI agents that reason and act.',
  },
};

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/harsh-dhiman-2a111422b/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/harshdhiman03',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    ),
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/dhimanharsh142003/',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
  },
];

const bubbleThemes = {
  product:
    'bg-white text-slate-600 border-slate-200 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10',
  engineering:
    'bg-slate-900 text-cyan-500 border-cyan-500/30 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-400/60 hover:shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]',
  agentic:
    'bg-fuchsia-950/30 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-900/40 hover:text-fuchsia-300 hover:border-fuchsia-400/60 hover:shadow-[0_0_15px_-3px_rgba(217,70,239,0.4)]',
};

export const AboutHero = () => {
  const { lens } = useLens();
  const content = HERO_CONTENT[lens];
  const currentBubbleTheme = bubbleThemes[lens] || bubbleThemes.product;

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
          <div className="flex flex-col items-center">
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

            <div className="flex items-center justify-center gap-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center w-12 h-12 rounded-full border transition-colors duration-300 backdrop-blur-sm ${currentBubbleTheme}`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
