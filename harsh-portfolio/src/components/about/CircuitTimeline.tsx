'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { experiences, type Experience } from '@/lib/data';

type CircuitStop = {
  id: string;
  company: string;
  role: string;
  summary: string;
  badge: string;
  experience: Experience;
  top: number;
  side: 'left' | 'right';
};

const TRACK_PATH =
  'M 50 6 C 73 15, 27 24, 50 33 C 73 42, 27 51, 50 60 C 73 69, 27 78, 50 87 C 65 92, 40 96, 50 98';

export const CircuitTimeline = () => {
  const { lens } = useLens();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const pulseX = useMotionValue(50);
  const pulseY = useMotionValue(6);
  const stops: CircuitStop[] = useMemo(
    () =>
      experiences.map((exp, index) => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        summary: exp.shortDesc,
        badge: exp.badge,
        experience: exp,
        top: [16, 42, 68][index] ?? 68 + index * 14,
        side: index % 2 === 0 ? 'left' : 'right',
      })),
    [],
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const pathFill = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
  });

  useEffect(() => {
    if (!selectedExp) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExp]);

  useAnimationFrame((time) => {
    const path = pathRef.current;
    if (!path) return;

    const totalLength = path.getTotalLength();
    const cycleMs = 3600;
    const progress = (time % cycleMs) / cycleMs;
    const point = path.getPointAtLength(progress * totalLength);

    pulseX.set(point.x);
    pulseY.set(point.y);
  });

  const getStyles = () => {
    switch (lens) {
      case 'product':
        return {
          section: 'bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          trackBase: '#cbd5e1',
          trackActive: '#64748b',
          pulse: '#64748b',
          card:
            'bg-white/85 border border-slate-200 text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.10)]',
          chip:
            'bg-slate-100 text-slate-700 border border-slate-300 font-mono',
          connector: 'bg-slate-300',
          readMore:
            'text-slate-700 border border-slate-300/90 bg-white/80 hover:bg-white hover:border-slate-400/90 hover:shadow-[0_8px_20px_rgba(15,23,42,0.14)]',
          modalOverlay: 'bg-black/40',
          modalCard: 'bg-white text-slate-900 border border-slate-200',
          modalMeta: 'text-slate-500',
          modalClose: 'hover:bg-slate-100',
        };
      case 'engineering':
        return {
          section: 'bg-slate-950 border border-slate-800',
          title: 'text-slate-100 font-mono',
          subtitle: 'text-slate-400 font-mono text-xs uppercase tracking-widest',
          trackBase: '#0f172a',
          trackActive: '#22d3ee',
          pulse: '#22d3ee',
          card:
            'bg-slate-900 border border-cyan-500/45 text-slate-200 shadow-[0_10px_22px_rgba(0,0,0,0.45)]',
          chip:
            'bg-slate-800 text-cyan-300 border border-cyan-500/60 font-mono',
          connector: 'bg-cyan-500/70',
          readMore:
            'text-cyan-200 border border-cyan-400/50 bg-cyan-400/10 hover:bg-cyan-400/20 hover:border-cyan-300/70 hover:shadow-[0_0_18px_rgba(34,211,238,0.28)]',
          modalOverlay: 'bg-slate-950/70',
          modalCard: 'bg-slate-900 text-slate-100 border border-cyan-500/40',
          modalMeta: 'text-slate-400',
          modalClose: 'hover:bg-slate-800',
        };
      case 'agentic':
        return {
          section: 'bg-[#0a0a0f] border border-violet-500/35',
          title: 'text-violet-100',
          subtitle: 'text-violet-300/70',
          trackBase: '#2e1065',
          trackActive: '#a855f7',
          pulse: '#c084fc',
          card:
            'bg-violet-900/20 border border-violet-400/45 text-violet-100 shadow-[0_12px_28px_rgba(168,85,247,0.28)]',
          chip:
            'bg-[#120a1f] text-violet-200 border border-violet-400/70 font-mono shadow-[0_0_18px_rgba(168,85,247,0.45)]',
          connector: 'bg-violet-400/80',
          readMore:
            'text-violet-100 border border-violet-400/60 bg-violet-500/15 hover:bg-violet-500/25 hover:border-violet-300/80 hover:shadow-[0_0_20px_rgba(167,139,250,0.35)]',
          modalOverlay: 'bg-black/60',
          modalCard: 'bg-[#120a1f] text-violet-100 border border-violet-400/45',
          modalMeta: 'text-violet-300/70',
          modalClose: 'hover:bg-violet-500/15',
        };
      default:
        return {
          section: 'bg-gradient-to-b from-slate-50 to-slate-100/70 border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          trackBase: '#cbd5e1',
          trackActive: '#64748b',
          pulse: '#64748b',
          card:
            'bg-white/85 border border-slate-200 text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.10)]',
          chip:
            'bg-slate-100 text-slate-700 border border-slate-300 font-mono',
          connector: 'bg-slate-300',
          readMore:
            'text-slate-700 border border-slate-300/90 bg-white/80 hover:bg-white hover:border-slate-400/90 hover:shadow-[0_8px_20px_rgba(15,23,42,0.14)]',
          modalOverlay: 'bg-black/40',
          modalCard: 'bg-white text-slate-900 border border-slate-200',
          modalMeta: 'text-slate-500',
          modalClose: 'hover:bg-slate-100',
        };
    }
  };

  const styles = getStyles();

  return (
    <section className={`px-4 md:px-6 py-12 md:py-16 rounded-2xl ${styles.section}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${styles.title}`}>Circuit Timeline</h2>
          <p className={`mt-2 text-sm md:text-base ${styles.subtitle}`}>
            Experience path rendered as a live circuit map.
          </p>
        </div>

        <div className="md:hidden relative px-4 md:px-0">
          <div className={`absolute left-4 top-0 bottom-0 w-[2px] ${styles.connector}`} />
          <div className="space-y-6 pl-8">
            {stops.map((stop, index) => (
              <motion.article
                key={stop.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`relative rounded-xl p-4 backdrop-blur-sm ${styles.card}`}
              >
                <span
                  className={`absolute left-[-23px] top-6 w-3 h-3 rounded-full ${styles.connector}`}
                />
                <h3 className="text-base font-bold break-words whitespace-normal">
                  {stop.company} <span className="opacity-70">({stop.role})</span>
                </h3>
                <p className="mt-1 text-xs opacity-70">{stop.experience.date}</p>
                <p className="mt-2 text-sm opacity-90 break-words whitespace-normal">{stop.summary}</p>
                <div className={`mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${styles.chip}`}>
                  <span>{stop.badge}</span>
                </div>
                <button
                  onClick={() => setSelectedExp(stop.experience)}
                  className={`group mt-4 inline-flex items-center gap-4 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${styles.readMore}`}
                >
                  <span>Read More</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="relative hidden md:block h-[980px] w-full overflow-hidden rounded-2xl">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <path
              d={TRACK_PATH}
              fill="none"
              stroke={styles.trackBase}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
            <motion.path
              ref={pathRef}
              d={TRACK_PATH}
              fill="none"
              stroke={styles.trackActive}
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: pathFill }}
            />
            <motion.circle
              r="1.2"
              fill={styles.pulse}
              style={{ cx: pulseX, cy: pulseY }}
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="2.1"
              fill={styles.pulse}
              style={{ cx: pulseX, cy: pulseY }}
              animate={{ opacity: [0.12, 0.35, 0.12] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          {stops.map((stop, index) => {
            const isLeft = stop.side === 'left';

            return (
              <motion.article
                key={stop.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`absolute w-[37%] rounded-xl p-5 backdrop-blur-sm ${styles.card} ${
                  isLeft ? 'left-[9%]' : 'right-[9%]'
                }`}
                style={{ top: `${stop.top}%` }}
              >
                <span
                  className={`absolute top-1/2 h-[2px] w-9 -translate-y-1/2 ${styles.connector} ${
                    isLeft ? '-right-9' : '-left-9'
                  }`}
                />
                <h3 className="text-lg font-bold">
                  {stop.company} <span className="opacity-70">({stop.role})</span>
                </h3>
                <p className="mt-1 text-xs opacity-70">{stop.experience.date}</p>
                <p className="mt-2 text-base opacity-90">{stop.summary}</p>
                <div className={`mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${styles.chip}`}>
                  <span>{stop.badge}</span>
                </div>
                <button
                  onClick={() => setSelectedExp(stop.experience)}
                  className={`group mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-300 ${styles.readMore}`}
                >
                  <span>Read More</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${styles.modalOverlay}`}
            onClick={() => setSelectedExp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              data-lenis-prevent="true"
              className={`relative w-full max-w-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 dark:scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500 rounded-2xl p-6 md:p-8 shadow-2xl ${styles.modalCard}`}
            >
              <button
                onClick={() => setSelectedExp(null)}
                className={`absolute right-4 top-4 rounded-full p-2 transition-colors ${styles.modalClose}`}
                aria-label="Close experience details"
              >
                &times;
              </button>

              <h3 className="mb-1 pr-10 text-xl font-bold md:text-2xl">{selectedExp.role}</h3>
              <p className={`mb-6 text-sm ${styles.modalMeta}`}>
                {selectedExp.company} &bull; {selectedExp.date}
              </p>

              <ul className="space-y-4">
                {selectedExp.details.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed md:text-base">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

