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
  link?: string;
};

const PAPERS: Paper[] = [
  // {
  //   id: 'foodoptima',
  //   title: 'FoodOptima (Springer/Scopus)',
  //   venue: 'Springer',
  //   badge: 'Springer',
  //   summary: 'AI Waste Reduction using EfficientNetB0.',
  //   abstract:
  //     'Designed a post-meal waste estimation pipeline using EfficientNetB0 and computer vision processing to quantify food residue and support sustainable reduction planning.',
  // },
  {
    id: 'ieee-nlp',
    title: 'Analysing Text Summarization Techniques: Extractive & Abstractive Methods',
    venue: 'IEEE',
    badge: 'IEEE',
    link: 'https://ieeexplore.ieee.org/document/11211425',
    summary: 'Text Summarization using Active Learning.',
    abstract:
      `Efficiently distilling extensive content into clear and impactful summaries is a critical task in natural language processing. In the study, we conducted inclusive evaluation of multiple text-summarization models, assessing them across a range of criteria, including perplexity, grammatical coherence, semantic consistency, length control, computational complexity, cross-sentence dependencies, and ROUGE scores. Our results indicate that the Active Learning Model achieved superior performance compared to all other evaluated approaches. Consequently, such models serve as valuable tools for addressing realworld challenges. These findings underscore meaningful progress in fields such as journalism and education, supporting the creation of more efficient summarization systems suited for today's information-concentrated landscape.`,
  },
  {
    id: 'ieee-uav',
    title: `Critical Analysis and Performance Assessment of Reactive Ad Hoc Routing Protocols in Unmanned Aerial Vehicle Network's`,
    venue: 'IEEE',
    badge: 'IEEE',
    link: 'https://ieeexplore.ieee.org/document/10982849',
    summary: 'Routing Performance Optimization.',
    abstract:
      'When used as aerial relays in the Internet of Drones (IoD) network unmanned aerial vehicles (UAVs) provide several advantages in both the military and civilian sectors. Their collaboration creates a fascinating field for additional study. An autonomous network of unmanned aerial vehicles (UAVs) known as a Flying Ad-Hoc Network (FANET) is defined by its high mobility and frequent topology changes, which present routing issues. The 3Dimensional Improvised Clustering Algorithm (3DICA), 3D Improvised Trajectory Algorithm (3DITA), and Bio-Inspired Clustering Scheme for FANETs (BISCF) are three of the optimized routing protocols for FANETs that are examined in this work These techniques have been assessed using the MATLAB simulator. based on the following mobility models: Manhattan Grid Mobility Model (MGM), Random Waypoint Mobility (RWPM), Semi-Circular Random Movement (SCRM), Number of Hops, Reliability, Jitter, and Throughput across different speeds and mobility models (PRS). The results show that in every evaluation situation, 3DITA performs better than 3DICA and BISCF. This assessment is necessary to determine the best FANET routing strategy, which could result in more dependable and durable UAV communication systems.',
  },
  {
    id: 'ieee-health',
    title: 'Metabolism and Machine Learning for Better Diabetes Care',
    venue: 'IEEE',
    badge: 'IEEE',
    summary: 'ML Applications in Analytics.',
    link: 'https://ieeexplore.ieee.org/document/11210898',
    abstract:
      'This project reinvents diabetes management by integrating metabolism data, machine learning, and full-stack development to support proactive, personalized care. In contrast to conventional reactive methods, it combines metabolic marker, lifestyle, and demographic data and maintains consistency through preprocessing. Random Forest & Logistic Regression models are used aimed at predicting risk at over 85 % accuracy. The platform extends prediction to provide individualized recommendations like medicine advice, diet based on glucose levels, and custom workouts. Adaptive interfaces are ensured through a React-based frontend and secure processing is handled through a Flask/Django backend along with API and compliance management. By integrating machine learning insights with human-centric design, this solution enables patients to effectively manage chronic diseases with anticipation and personalization.',
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

  const getStyles = () => {
    switch (lens) {
      case 'product':
        return {
          section:
            'bg-gradient-to-b from-slate-50 to-white border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card:
            'bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden flex flex-col gap-4 relative text-slate-700',
          badgeSpringer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeIEEE: 'bg-blue-50 text-blue-700 border-blue-200',
          secondaryButton:
            'px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors',
          primaryButton:
            'px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1',
          primaryButtonDisabled: 'opacity-60 pointer-events-none',
          abstract: 'text-slate-600',
          abstractBorder: 'border-slate-100',
          texture: 'text-slate-300/40',
        };
      case 'engineering':
        return {
          section: 'bg-slate-950 border border-slate-800',
          title: 'text-slate-100 font-mono',
          subtitle:
            'text-slate-400 font-mono text-xs uppercase tracking-widest',
          card:
            'bg-slate-900/85 rounded-2xl p-6 border border-cyan-500/30 text-slate-200 shadow-[0_12px_28px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col gap-4 relative',
          badgeSpringer:
            'bg-emerald-500/10 text-emerald-300 border-emerald-400/40',
          badgeIEEE: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/40',
          secondaryButton:
            'px-4 py-2 text-sm font-medium text-cyan-300 bg-slate-800 hover:bg-slate-700 border border-cyan-500/50 rounded-lg transition-colors font-mono',
          primaryButton:
            'px-4 py-2 text-sm font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1 font-mono',
          primaryButtonDisabled: 'opacity-60 pointer-events-none',
          abstract: 'text-slate-300',
          abstractBorder: 'border-slate-700/70',
          texture: 'text-cyan-500/20',
        };
      case 'agentic':
        return {
          section: 'bg-[#0a0a0f] border border-violet-500/25',
          title: 'text-violet-100',
          subtitle: 'text-violet-300/70',
          card:
            'bg-violet-900/20 rounded-2xl p-6 border border-violet-400/35 text-violet-100 shadow-[0_12px_28px_rgba(168,85,247,0.28)] overflow-hidden flex flex-col gap-4 relative',
          badgeSpringer:
            'bg-emerald-500/15 text-emerald-200 border-emerald-300/45',
          badgeIEEE: 'bg-violet-500/15 text-violet-200 border-violet-300/45',
          secondaryButton:
            'px-4 py-2 text-sm font-medium text-violet-200 bg-[#150a24] hover:bg-[#1b1130] border border-violet-400/55 rounded-lg transition-colors shadow-[0_0_14px_rgba(168,85,247,0.45)] font-mono',
          primaryButton:
            'px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors flex items-center gap-1 font-mono',
          primaryButtonDisabled: 'opacity-60 pointer-events-none',
          abstract: 'text-violet-200',
          abstractBorder: 'border-violet-400/25',
          texture: 'text-violet-400/20',
        };
      default:
        return {
          section:
            'bg-gradient-to-b from-slate-50 to-white border border-slate-200',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          card:
            'bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-hidden flex flex-col gap-4 relative text-slate-700',
          badgeSpringer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          badgeIEEE: 'bg-blue-50 text-blue-700 border-blue-200',
          secondaryButton:
            'px-4 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors',
          primaryButton:
            'px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1',
          primaryButtonDisabled: 'opacity-60 pointer-events-none',
          abstract: 'text-slate-600',
          abstractBorder: 'border-slate-100',
          texture: 'text-slate-300/40',
        };
    }
  };

  const styles = getStyles();
  type Styles = typeof styles;

  const ResearchCard = ({
    paper,
    index,
    styles,
  }: {
    paper: Paper;
    index: number;
    styles: Styles;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35, delay: index * 0.06 }}
        className={styles.card}
      >
        <span
          className={`absolute top-4 right-4 rounded-md border px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
            paper.badge === 'IEEE' ? styles.badgeIEEE : styles.badgeSpringer
          }`}
        >
          {paper.badge}
        </span>

        <h3 className="pr-20 text-lg md:text-xl font-bold">{paper.title}</h3>
        <p className="text-xs uppercase tracking-wider opacity-70">{paper.venue}</p>
        <p className="text-sm md:text-base opacity-90">{paper.summary}</p>

        <div className="flex flex-wrap items-center gap-3 mt-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.secondaryButton}
          >
            {isExpanded ? 'Close Abstract' : 'Read Abstract'}
          </button>
          <a
            href={paper.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (!paper.link) event.preventDefault();
            }}
            aria-disabled={!paper.link}
            className={`${styles.primaryButton} ${!paper.link ? styles.primaryButtonDisabled : ''}`}
          >
            Read Paper <span aria-hidden>↗</span>
          </a>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className={`pt-4 border-t mt-2 ${styles.abstractBorder}`}>
                <p className={`text-sm leading-relaxed ${styles.abstract}`}>
                  {paper.abstract}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

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
          {PAPERS.map((paper, index) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              index={index}
              styles={styles}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
