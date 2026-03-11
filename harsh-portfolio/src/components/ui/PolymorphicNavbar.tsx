'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { ContactModal } from '@/components/ContactModal';

const NAVBAR_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
//   { label: 'Work', href: '/#work' },
//   { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

const resumeThemes = {
  product: {
    accent:
      'text-slate-700 bg-white/80 hover:bg-white border-slate-300/70 shadow-[0_0_15px_-3px_rgba(15,23,42,0.12)] hover:shadow-[0_0_20px_-3px_rgba(15,23,42,0.2)]',
  },
  engineering: {
    accent:
      'text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-400/30 shadow-[0_0_15px_-3px_rgba(34,211,238,0.25)] hover:shadow-[0_0_20px_-3px_rgba(34,211,238,0.35)]',
  },
  agentic: {
    accent:
      'text-fuchsia-200 bg-fuchsia-500/15 hover:bg-fuchsia-500/25 border-fuchsia-400/30 shadow-[0_0_15px_-3px_rgba(217,70,239,0.25)] hover:shadow-[0_0_20px_-3px_rgba(217,70,239,0.35)]',
  },
};

export const PolymorphicNavbar = () => {
  const { lens } = useLens();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const currentTheme = resumeThemes[lens] || resumeThemes.product;

  // Get styles based on lens
  const getNavbarStyles = () => {
    switch (lens) {
      case 'product':
        return {
          container:
            'bg-white/70 backdrop-blur-md border-white/20 shadow-lg text-slate-800',
          hover:
            'bg-slate-100/80 rounded-full',
          link: 'text-slate-800 font-medium',
          icon: 'text-indigo-600',
        };
      case 'engineering':
        return {
          container:
            'bg-slate-900/80 backdrop-blur-md border-slate-800 text-slate-200 font-mono',
          hover:
            'bg-slate-800 rounded-sm',
          link: 'text-slate-200 font-mono tracking-wider uppercase text-xs',
          icon: 'text-cyan-400',
        };
      case 'agentic':
        return {
          container:
            'bg-violet-900/10 backdrop-blur-xl border-violet-500/20 text-violet-100 shadow-lg shadow-violet-500/20',
          hover:
            'bg-violet-500/20 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.4)]',
          link: 'text-violet-100 font-medium',
          icon: 'text-violet-400',
        };
      default:
        return {
          container:
            'bg-white/70 backdrop-blur-md border-white/20 shadow-lg text-slate-800',
          hover:
            'bg-slate-100/80 rounded-full',
          link: 'text-slate-800 font-medium',
          icon: 'text-indigo-600',
        };
    }
  };

  const styles = getNavbarStyles();

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 px-3 py-2 md:px-6 md:py-3 w-[95vw] sm:w-auto max-w-fit overflow-x-auto hide-scrollbar flex items-center justify-center rounded-full border transition-all duration-700 ease-in-out ${styles.container}`}
      >
        <div className="flex items-center gap-2 md:gap-6">
          {NAVBAR_LINKS.map(({ label, href }) => (
            <motion.div
              key={label}
              className="relative shrink-0"
              onMouseEnter={() => setHoveredLink(label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {/* Hover background with layoutId for fluid animation */}
              <AnimatePresence mode="wait">
                {hoveredLink === label && (
                  <motion.div
                    layoutId="nav-hover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className={`absolute -inset-2 -z-10 ${styles.hover}`}
                  />
                )}
              </AnimatePresence>

              {/* Link text */}
              {href === '/#contact' ? (
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  className={`relative block text-[11px] sm:text-[13px] md:text-sm px-2 py-1 md:px-3 md:py-2 whitespace-nowrap transition-all cursor-pointer ${styles.link} bg-none border-none`}
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {label}
                </motion.button>
              ) : (
                <Link
                  href={href}
                  className={`relative block text-[11px] sm:text-[13px] md:text-sm px-2 py-1 md:px-3 md:py-2 whitespace-nowrap transition-all cursor-pointer ${styles.link}`}
                >
                  {label}
                </Link>
              )}
            </motion.div>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`group shrink-0 flex items-center gap-2 text-[11px] sm:text-[13px] md:text-sm px-3 py-1.5 md:px-5 md:py-2 whitespace-nowrap font-medium rounded-full transition-all duration-300 border backdrop-blur-md ${currentTheme.accent}`}
          >
            <span>Resume</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </motion.nav>
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};
