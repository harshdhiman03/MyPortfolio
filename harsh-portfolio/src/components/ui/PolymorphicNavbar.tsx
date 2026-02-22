'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

const NAVBAR_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
//   { label: 'Work', href: '/#work' },
//   { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
];

export const PolymorphicNavbar = () => {
  const { lens } = useLens();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      // Hash link - need to navigate to home first, then scroll
      const hash = href.substring(1);
      router.push('/' + hash);
    } else {
      // Regular page link
      router.push(href);
    }
  };

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
    <AnimatePresence mode="wait">
      <motion.nav
        key={lens}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-8 py-3 rounded-full border transition-all duration-700 ${styles.container}`}
      >
        <div className="flex items-center gap-8">
          {NAVBAR_LINKS.map(({ label, href }) => (
            <motion.div
              key={label}
              className="relative"
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
              <motion.button
                onClick={() => handleNavClick(href)}
                className={`relative block px-3 py-2 text-sm transition-colors cursor-pointer ${styles.link} bg-none border-none`}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};
