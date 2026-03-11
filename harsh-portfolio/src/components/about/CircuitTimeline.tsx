'use client';

import React, { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
} from 'framer-motion';
import { useLens } from '@/context/LensContext';

type CircuitStop = {
  id: string;
  company: string;
  role: string;
  summary: string;
  chipLabel: string;
  chipValue: string;
  top: number;
  side: 'left' | 'right';
};

const TRACK_PATH =
  'M 50 6 C 73 15, 27 24, 50 33 C 73 42, 27 51, 50 60 C 73 69, 27 78, 50 87 C 65 92, 40 96, 50 98';

const STOPS: CircuitStop[] = [
  {
    id: 'infosys-se',
    company: 'Infosys',
    role: 'System Engineer',
    summary: 'Automated Workflows (36% Faster).',
    chipLabel: 'EFFICIENCY',
    chipValue: '+36%',
    top: 16,
    side: 'left',
  },
  {
    id: 'infosys-intern',
    company: 'Infosys',
    role: 'Intern',
    summary: 'React Mailing System.',
    chipLabel: 'DELIVERY',
    chipValue: '60% Faster',
    top: 38,
    side: 'right',
  },
  {
    id: 'ravvio',
    company: 'Ravvio Labs',
    role: 'ML Intern',
    summary: 'ML Noise Reduction (38% Boost).',
    chipLabel: 'BOOST',
    chipValue: '+38%',
    top: 61,
    side: 'left',
  },
  {
    id: 'hackindia',
    company: 'HackIndia Winner',
    role: 'Hackathon',
    summary: 'Runic Realm Web3.',
    chipLabel: 'ACHIEVEMENT',
    chipValue: 'Winner',
    top: 84,
    side: 'right',
  },
];

export const CircuitTimeline = () => {
  const { lens } = useLens();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const pulseX = useMotionValue(50);
  const pulseY = useMotionValue(6);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });
  const pathFill = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
  });

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
            {STOPS.map((stop, index) => (
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
                <p className="mt-2 text-sm opacity-90 break-words whitespace-normal">{stop.summary}</p>
                <div className={`mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${styles.chip}`}>
                  <span>[{stop.chipLabel}:</span>
                  <span>{stop.chipValue}]</span>
                </div>
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

          {STOPS.map((stop, index) => {
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
                <p className="mt-2 text-base opacity-90">{stop.summary}</p>
                <div className={`mt-4 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs ${styles.chip}`}>
                  <span>[{stop.chipLabel}:</span>
                  <span>{stop.chipValue}]</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
