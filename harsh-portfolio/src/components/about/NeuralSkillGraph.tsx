'use client';

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens, type LensType } from '@/context/LensContext';

type MainNodeId = 'ai' | 'fullStack' | 'cloud';

type MainNode = {
  id: MainNodeId;
  label: string;
  tooltip: string;
  x: number;
  y: number;
};

type SubNode = {
  id: string;
  label: string;
  parentId: MainNodeId;
  x: number;
  y: number;
};

const MAIN_NODES: MainNode[] = [
  {
    id: 'ai',
    label: 'AI & GenAI',
    tooltip: 'Transformers, retrieval systems, and agent tooling for intelligent products.',
    x: 50,
    y: 22,
  },
  {
    id: 'fullStack',
    label: 'Full Stack Engineering',
    tooltip: 'End-to-end product delivery from UI systems to backend APIs.',
    x: 28,
    y: 72,
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    tooltip: 'Production reliability through cloud infra, data pipelines, and automation.',
    x: 72,
    y: 72,
  },
];

const SUB_NODES: SubNode[] = [
  { id: 't5', label: 'T5 Transformers', parentId: 'ai', x: 35, y: 10 },
  { id: 'rag', label: 'RAG', parentId: 'ai', x: 43, y: 5 },
  { id: 'hf', label: 'Hugging Face', parentId: 'ai', x: 57, y: 5 },
  { id: 'pt', label: 'PyTorch', parentId: 'ai', x: 65, y: 10 },
  { id: 'lc', label: 'LangChain', parentId: 'ai', x: 50, y: 36 },

  { id: 'next', label: 'Next.js', parentId: 'fullStack', x: 12, y: 62 },
  { id: 'react', label: 'React', parentId: 'fullStack', x: 14, y: 78 },
  { id: 'tailwind', label: 'Tailwind', parentId: 'fullStack', x: 22, y: 90 },
  { id: 'node', label: 'Node.js', parentId: 'fullStack', x: 34, y: 90 },
  { id: 'ts', label: 'TypeScript', parentId: 'fullStack', x: 40, y: 78 },

  { id: 'azure', label: 'Azure', parentId: 'cloud', x: 88, y: 62 },
  { id: 'dbrx', label: 'Databricks', parentId: 'cloud', x: 86, y: 78 },
  { id: 'docker', label: 'Docker', parentId: 'cloud', x: 78, y: 90 },
  { id: 'cicd', label: 'CI/CD', parentId: 'cloud', x: 66, y: 90 },
];

const productNodeColors: Record<MainNodeId, string> = {
  ai: 'bg-blue-500',
  fullStack: 'bg-indigo-500',
  cloud: 'bg-sky-500',
};

const engineeringNodeColors: Record<MainNodeId, string> = {
  ai: 'border-cyan-400 text-cyan-300',
  fullStack: 'border-emerald-400 text-emerald-300',
  cloud: 'border-blue-400 text-blue-300',
};

const agenticNodeColors: Record<MainNodeId, string> = {
  ai: 'bg-violet-500/35 border-violet-300/60 text-violet-100 shadow-[0_0_24px_rgba(167,139,250,0.7)]',
  fullStack: 'bg-fuchsia-500/30 border-fuchsia-300/60 text-fuchsia-100 shadow-[0_0_24px_rgba(232,121,249,0.65)]',
  cloud: 'bg-indigo-500/30 border-indigo-300/60 text-indigo-100 shadow-[0_0_24px_rgba(129,140,248,0.7)]',
};

const getLineStyleByLens = (lens: LensType) => {
  if (lens === 'product') {
    return {
      stroke: '#94a3b8',
      strokeWidth: 0.35,
      linecap: 'round' as const,
      dashArray: undefined,
    };
  }

  if (lens === 'engineering') {
    return {
      stroke: '#22d3ee',
      strokeWidth: 0.22,
      linecap: 'butt' as const,
      dashArray: undefined,
    };
  }

  return {
    stroke: 'url(#synapse-gradient)',
    strokeWidth: 0.42,
    linecap: 'round' as const,
    dashArray: '2.4 1.8',
  };
};

export const NeuralSkillGraph = () => {
  const { lens } = useLens();
  const [hoveredMain, setHoveredMain] = useState<MainNodeId | null>(null);

  const mainNodeMap = useMemo(() => {
    return MAIN_NODES.reduce<Record<MainNodeId, MainNode>>((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {} as Record<MainNodeId, MainNode>);
  }, []);

  const lineStyle = getLineStyleByLens(lens);

  const getPanelStyles = () => {
    switch (lens) {
      case 'product':
        return {
          section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          subNode: 'bg-white text-slate-700 border border-slate-200/80 shadow-sm',
          canvasGlow: 'bg-blue-100/30',
        };
      case 'engineering':
        return {
          section: 'bg-slate-950 border border-slate-800',
          title: 'text-slate-100 font-mono',
          subtitle: 'text-slate-400 font-mono text-xs uppercase tracking-widest',
          subNode: 'bg-slate-900 text-slate-200 border border-slate-700 font-mono',
          canvasGlow: 'bg-cyan-500/10',
        };
      case 'agentic':
        return {
          section: 'bg-[#0a0a0f] border border-violet-500/25',
          title: 'text-violet-100',
          subtitle: 'text-violet-300/70',
          subNode: 'bg-violet-900/25 text-violet-100 border border-violet-400/40 shadow-[0_0_14px_rgba(168,85,247,0.45)]',
          canvasGlow: 'bg-violet-500/10',
        };
      default:
        return {
          section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          subNode: 'bg-white text-slate-700 border border-slate-200/80 shadow-sm',
          canvasGlow: 'bg-blue-100/30',
        };
    }
  };

  const panelStyles = getPanelStyles();

  return (
    <section className={`px-6 py-16 rounded-2xl ${panelStyles.section}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${panelStyles.title}`}>Neural Skill Graph</h2>
          <p className={`mt-2 text-sm md:text-base ${panelStyles.subtitle}`}>
            Interactive network of domain skills and technologies.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-5xl aspect-[10/7] overflow-hidden rounded-2xl">
          <div className={`absolute inset-0 ${panelStyles.canvasGlow}`} />

          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="synapse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#e879f9" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {SUB_NODES.map((subNode, index) => {
              const parent = mainNodeMap[subNode.parentId];
              const isDimmed =
                hoveredMain !== null &&
                hoveredMain !== subNode.parentId;

              return (
                <motion.line
                  key={`${subNode.id}-line`}
                  x1={parent.x}
                  y1={parent.y}
                  x2={subNode.x}
                  y2={subNode.y}
                  stroke={lineStyle.stroke}
                  strokeWidth={lineStyle.strokeWidth}
                  strokeLinecap={lineStyle.linecap}
                  strokeDasharray={lineStyle.dashArray}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isDimmed ? 0.12 : lens === 'agentic' ? [0.35, 0.95, 0.35] : 0.55,
                    strokeDashoffset: lens === 'agentic' ? [0, -16] : 0,
                  }}
                  transition={{
                    opacity:
                      lens === 'agentic'
                        ? {
                            duration: 2.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.08,
                          }
                        : { duration: 0.2 },
                    strokeDashoffset:
                      lens === 'agentic'
                        ? {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: index * 0.05,
                          }
                        : { duration: 0 },
                  }}
                />
              );
            })}
          </svg>

          {SUB_NODES.map((subNode, index) => {
            const isDimmed =
              hoveredMain !== null &&
              hoveredMain !== subNode.parentId;
            const isFocusedParent = hoveredMain === subNode.parentId;

            return (
              <motion.div
                key={subNode.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-[11px] md:text-xs backdrop-blur-sm ${panelStyles.subNode}`}
                style={{ left: `${subNode.x}%`, top: `${subNode.y}%` }}
                animate={{
                  y: [0, -6, 0],
                  opacity: isDimmed ? 0.22 : 1,
                  scale: isFocusedParent ? 1.08 : 1,
                }}
                transition={{
                  y: {
                    duration: 4.2 + (index % 5) * 0.35,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.1,
                  },
                  opacity: { duration: 0.22 },
                  scale: { duration: 0.22 },
                }}
              >
                {subNode.label}
              </motion.div>
            );
          })}

          {MAIN_NODES.map((mainNode, index) => {
            const isHovered = hoveredMain === mainNode.id;
            const isDimmed =
              hoveredMain !== null &&
              hoveredMain !== mainNode.id;

            const baseMainNodeClass =
              lens === 'product'
                ? `${productNodeColors[mainNode.id]} text-white shadow-[0_14px_26px_rgba(15,23,42,0.24)]`
                : lens === 'engineering'
                ? `bg-slate-950 border ${engineeringNodeColors[mainNode.id]}`
                : `${agenticNodeColors[mainNode.id]} border`;

            return (
              <motion.div
                key={mainNode.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${mainNode.x}%`, top: `${mainNode.y}%` }}
                onMouseEnter={() => setHoveredMain(mainNode.id)}
                onMouseLeave={() => setHoveredMain(null)}
                animate={{
                  y: [0, -10, 0],
                  scale: isHovered ? 1.5 : hoveredMain ? 0.94 : 1,
                  opacity: isDimmed ? 0.24 : 1,
                }}
                transition={{
                  y: {
                    duration: 4.8 + index * 0.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.2,
                  },
                  scale: { duration: 0.24, ease: 'easeOut' },
                  opacity: { duration: 0.24, ease: 'easeOut' },
                }}
              >
                <div
                  className={`h-28 w-28 md:h-32 md:w-32 cursor-pointer select-none rounded-full px-3 text-center text-xs md:text-sm font-semibold flex items-center justify-center backdrop-blur-sm ${baseMainNodeClass}`}
                  style={
                    lens === 'engineering'
                      ? {
                          clipPath:
                            'polygon(25% 7%, 75% 7%, 100% 50%, 75% 93%, 25% 93%, 0% 50%)',
                        }
                      : undefined
                  }
                >
                  <span className="leading-tight">{mainNode.label}</span>
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence>
            {hoveredMain && (
              <motion.div
                key={hoveredMain}
                className={`absolute z-20 -translate-x-1/2 rounded-lg px-3 py-2 text-xs md:text-sm max-w-60 backdrop-blur-md ${
                  lens === 'engineering'
                    ? 'bg-slate-900 text-slate-100 border border-cyan-500/60 font-mono'
                    : lens === 'agentic'
                    ? 'bg-violet-900/70 text-violet-100 border border-violet-400/50'
                    : 'bg-white/90 text-slate-700 border border-slate-200'
                }`}
                style={{
                  left: `${mainNodeMap[hoveredMain].x}%`,
                  top: `calc(${mainNodeMap[hoveredMain].y}% - 90px)`,
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
              >
                {mainNodeMap[hoveredMain].tooltip}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
