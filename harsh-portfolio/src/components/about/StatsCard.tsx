'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens, type LensType } from '@/context/LensContext';

type NumericMetric = {
  label: string;
  type: 'number';
  value: number;
  decimals?: number;
  suffix?: string;
};

type TextMetric = {
  label: string;
  type: 'text';
  value: string;
};

type Metric = NumericMetric | TextMetric;

const LENS_METRICS: Record<LensType, Metric[]> = {
  product: [
    { label: 'Hackathons Won', type: 'number', value: 1 },
    { label: 'Projects Shipped', type: 'number', value: 7 },
    { label: 'User Impact', type: 'text', value: 'High' },
  ],
  engineering: [
    { label: 'Commits', type: 'number', value: 500, suffix: '+' },
    { label: 'Uptime', type: 'number', value: 99.9, decimals: 1, suffix: '%' },
    { label: 'Coffee', type: 'text', value: 'Infinite' },
  ],
  agentic: [
    { label: 'Model Accuracy', type: 'number', value: 96.8, decimals: 1, suffix: '%' },
    { label: 'Papers Published', type: 'number', value: 3 },
    { label: 'GPU Temp', type: 'number', value: 75, suffix: '\u00B0C' },
  ],
};

const AnimatedCount = ({
  value,
  decimals = 0,
  suffix = '',
  animationKey,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  animationKey: string;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const durationMs = 900;
    const startTime = performance.now();

    const tick = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [value, animationKey]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const StatsCard = () => {
  const { lens } = useLens();
  const metrics = LENS_METRICS[lens];

  const getStyles = () => {
    switch (lens) {
      case 'product':
        return {
          section: 'bg-gradient-to-br from-indigo-50/70 to-white/80',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card: 'bg-white/50 border border-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)]',
          label: 'text-slate-600',
          value: 'text-indigo-700',
        };
      case 'engineering':
        return {
          section: 'bg-slate-950/90',
          title: 'text-slate-100',
          subtitle: 'text-slate-400',
          card: 'bg-slate-900/50 border border-slate-700/70 shadow-[0_12px_30px_rgba(0,0,0,0.35)]',
          label: 'text-slate-400 font-mono uppercase tracking-wider text-xs',
          value: 'text-cyan-400 font-mono',
        };
      case 'agentic':
        return {
          section: 'bg-[#0a0a0f]',
          title: 'text-purple-100',
          subtitle: 'text-purple-400/70',
          card: 'bg-purple-900/20 border border-purple-500/30 shadow-[0_12px_30px_rgba(124,58,237,0.25)]',
          label: 'text-purple-300/70 uppercase tracking-wider text-xs',
          value: 'text-violet-300',
        };
      default:
        return {
          section: 'bg-gradient-to-br from-indigo-50/70 to-white/80',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card: 'bg-white/50 border border-white/80 shadow-[0_12px_30px_rgba(15,23,42,0.08)]',
          label: 'text-slate-600',
          value: 'text-indigo-700',
        };
    }
  };

  const styles = getStyles();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`px-6 py-16 rounded-2xl transition-all duration-700 ${styles.section}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${styles.title}`}>Live Metrics</h2>
          <p className={`mt-2 text-base md:text-lg ${styles.subtitle}`}>
            Snapshot of impact through the current lens.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lens}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {metrics.map((metric, index) => (
              <motion.article
                key={`${metric.label}-${lens}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={`rounded-2xl p-6 backdrop-blur-md ${styles.card}`}
              >
                <p className={styles.label}>{metric.label}</p>
                <p className={`mt-3 text-3xl md:text-4xl font-bold ${styles.value}`}>
                  {metric.type === 'number' ? (
                    <AnimatedCount
                      value={metric.value}
                      decimals={metric.decimals}
                      suffix={metric.suffix}
                      animationKey={lens}
                    />
                  ) : (
                    <motion.span
                      key={`${metric.value}-${lens}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {metric.value}
                    </motion.span>
                  )}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
};
