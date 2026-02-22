'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';

type Paper = {
  id: string;
  title: string;
  venue: string;
  badge: 'IEEE' | 'Springer';
  summary: string;
  abstract: string;
};

const PAPERS: Paper[] = [
  {
    id: 'foodoptima',
    title: 'FoodOptima (Springer/Scopus)',
    venue: 'Springer',
    badge: 'Springer',
    summary: 'AI Waste Reduction using EfficientNetB0.',
    abstract:
      'Designed a post-meal waste estimation pipeline using EfficientNetB0 and computer vision processing to quantify food residue and support sustainable reduction planning.',
  },
  {
    id: 'ieee-nlp',
    title: 'IEEE Paper 1 (NLP)',
    venue: 'IEEE',
    badge: 'IEEE',
    summary: 'Text Summarization using Active Learning.',
    abstract:
      'Explored active learning strategies for selecting informative text samples, improving summarization quality with reduced labeling effort.',
  },
  {
    id: 'ieee-uav',
    title: 'IEEE Paper 2 (UAV Networks)',
    venue: 'IEEE',
    badge: 'IEEE',
    summary: 'Routing Performance Optimization.',
    abstract:
      'Analyzed routing tradeoffs in UAV communication networks and evaluated optimization paths to increase throughput and reliability.',
  },
  {
    id: 'ieee-health',
    title: 'IEEE Paper 3 (Healthcare)',
    venue: 'IEEE',
    badge: 'IEEE',
    summary: 'ML Applications in Analytics.',
    abstract:
      'Studied practical machine learning use-cases in healthcare analytics, covering predictive trends and decision-support system design.',
  },
];

const SYMBOL_TEXTURE = [
  { symbol: 'Σ', left: '8%', top: '12%' },
  { symbol: 'λ', left: '26%', top: '24%' },
  { symbol: '∇', left: '71%', top: '18%' },
  { symbol: 'π', left: '84%', top: '33%' },
  { symbol: 'μ', left: '16%', top: '68%' },
  { symbol: 'Δ', left: '43%', top: '78%' },
  { symbol: '∫', left: '74%', top: '74%' },
];

export const ResearchLab = () => {
  const { lens } = useLens();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getStyles = () => {
    switch (lens) {
      case 'product':
        return {
          section:
            'bg-gradient-to-b from-slate-50 to-white border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card:
            'bg-white/75 border border-slate-200 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.09)]',
          badgeSpringer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeIEEE: 'bg-blue-50 text-blue-700 border-blue-200',
          button:
            'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
          abstract: 'text-slate-600',
          texture: 'text-slate-300/40',
        };
      case 'engineering':
        return {
          section: 'bg-slate-950 border border-slate-800',
          title: 'text-slate-100 font-mono',
          subtitle:
            'text-slate-400 font-mono text-xs uppercase tracking-widest',
          card:
            'bg-slate-900/85 border border-cyan-500/30 text-slate-200 shadow-[0_12px_28px_rgba(0,0,0,0.45)]',
          badgeSpringer:
            'bg-emerald-500/10 text-emerald-300 border-emerald-400/40',
          badgeIEEE: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/40',
          button:
            'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/50 font-mono',
          abstract: 'text-slate-300',
          texture: 'text-cyan-500/20',
        };
      case 'agentic':
        return {
          section: 'bg-[#0a0a0f] border border-violet-500/25',
          title: 'text-violet-100',
          subtitle: 'text-violet-300/70',
          card:
            'bg-violet-900/20 border border-violet-400/35 text-violet-100 shadow-[0_12px_28px_rgba(168,85,247,0.28)]',
          badgeSpringer:
            'bg-emerald-500/15 text-emerald-200 border-emerald-300/45',
          badgeIEEE: 'bg-violet-500/15 text-violet-200 border-violet-300/45',
          button:
            'bg-[#150a24] hover:bg-[#1b1130] text-violet-200 border border-violet-400/55 shadow-[0_0_14px_rgba(168,85,247,0.45)] font-mono',
          abstract: 'text-violet-200',
          texture: 'text-violet-400/20',
        };
      default:
        return {
          section:
            'bg-gradient-to-b from-slate-50 to-white border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card:
            'bg-white/75 border border-slate-200 text-slate-700 shadow-[0_12px_28px_rgba(15,23,42,0.09)]',
          badgeSpringer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeIEEE: 'bg-blue-50 text-blue-700 border-blue-200',
          button:
            'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
          abstract: 'text-slate-600',
          texture: 'text-slate-300/40',
        };
    }
  };

  const styles = getStyles();

  return (
    <section className={`relative overflow-hidden px-6 py-16 rounded-2xl ${styles.section}`}>
      <div className="pointer-events-none absolute inset-0">
        {SYMBOL_TEXTURE.map((item) => (
          <span
            key={`${item.symbol}-${item.left}-${item.top}`}
            className={`absolute text-xl md:text-2xl ${styles.texture}`}
            style={{ left: item.left, top: item.top }}
          >
            {item.symbol}
          </span>
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className={`text-3xl md:text-4xl font-bold ${styles.title}`}>
            Published Research & Innovation.
          </h2>
          <p className={`mt-2 text-sm md:text-base ${styles.subtitle}`}>
            Papers and academic experiments across AI, networks, and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAPERS.map((paper, index) => {
            const isExpanded = expandedId === paper.id;

            return (
              <motion.article
                key={paper.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className={`relative rounded-xl p-5 md:p-6 backdrop-blur-md ${styles.card}`}
              >
                <span
                  className={`absolute top-4 right-4 rounded-md border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
                    paper.badge === 'IEEE'
                      ? styles.badgeIEEE
                      : styles.badgeSpringer
                  }`}
                >
                  {paper.badge}
                </span>

                <h3 className="pr-20 text-lg md:text-xl font-bold">{paper.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider opacity-70">{paper.venue}</p>
                <p className="mt-4 text-sm md:text-base opacity-90">{paper.summary}</p>

                <button
                  type="button"
                  onClick={() =>
                    setExpandedId((current) =>
                      current === paper.id ? null : paper.id
                    )
                  }
                  className={`mt-5 rounded-md px-3 py-2 text-xs md:text-sm transition-colors ${styles.button}`}
                >
                  Read Abstract
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`${paper.id}-abstract`}
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 14 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.24, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className={`text-sm leading-relaxed ${styles.abstract}`}>
                        {paper.abstract}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
