'use client';

import React from 'react';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

// Define which stack items are relevant to each lens
const LENS_TECH_MAP: Record<string, string[]> = {
  product: ['React', 'Streamlit', 'Solidity', 'Base'],
  engineering: ['Azure', 'Databricks', '.NET Core', 'EfficientNetB0', 'Ethers.js'],
  agentic: ['T5 Transformer', 'Automation', 'Smart Contracts', 'Bot-resistant'],
};

const thumbnailVariants = {
  product: {
    rest: { filter: 'saturate(0.95) brightness(0.95)', scale: 1 },
    hover: {
      scale: 1.05,
      filter: 'saturate(1.1) brightness(1.05)',
      boxShadow: '0px 15px 30px rgba(0,0,0,0.1)',
    },
  },
  engineering: {
    rest: {
      filter: 'contrast(120%) saturate(0%) brightness(0.6) sepia(100%) hue-rotate(190deg)',
      scale: 1,
    },
    hover: {
      scale: 1.03,
      filter: 'contrast(105%) saturate(100%) brightness(1) sepia(0%) hue-rotate(0deg)',
      borderColor: 'rgba(56, 189, 248, 0.8)',
    },
  },
  agentic: {
    rest: {
      filter: 'contrast(130%) saturate(130%) hue-rotate(-25deg) brightness(0.8)',
      scale: 1,
    },
    hover: {
      scale: 1.05,
      filter: 'contrast(140%) saturate(150%) hue-rotate(0deg) brightness(1.1)',
      boxShadow: '0px 0px 30px rgba(168,85,247,0.5)',
    },
  },
};
const thumbnailTransitions: Record<'product' | 'engineering' | 'agentic', Transition> = {
  product: { duration: 0.4, ease: 'easeOut' },
  engineering: { duration: 0.3, ease: 'circOut' },
  agentic: { type: 'spring', stiffness: 300, damping: 15 },
};
export const ProjectCard = ({ project, index, onSelectProject }: ProjectCardProps) => {
  const { lens } = useLens();
  const lensContent = project.content[lens]!;
  const descriptionText =
lens === 'product'
      ? project.content.product.painPoint || 'Details unavailable.'
      : lens === 'engineering'
      ? project.content.engineering.description ||
        project.content.engineering.architecture ||
        'Details unavailable.'
      : lens === 'agentic'
      ? project.content.agentic?.description ||
        project.content.agentic?.coreLogic ||
        'Details unavailable.'
      : 'Details unavailable.';
  const statText =
    lens === 'product'
      ? project.content.product.keyAchievements?.[0]?.value || 'View Details'
      : lens === 'agentic'
      ? project.content.agentic?.paradigm || 'View Agent Logic'
      : 'System Blueprint';
  const buttonText =
    lens === 'product'
      ? 'View Product Details'
      : lens === 'engineering'
      ? 'View Architecture'
      : 'View Agent Logic';
  const relevantTechs = LENS_TECH_MAP[lens] || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className={`rounded-lg overflow-hidden group transition-all duration-300 ${
        lens === 'product'
          ? 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
          : lens === 'engineering'
          ? 'bg-slate-900 border border-slate-800 hover:border-cyan-500/50 shadow-none'
          : 'backdrop-blur-xl bg-violet-900/10 border border-transparent hover:border-violet-500/50 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40'


          
      }`}
      style={
        lens === 'agentic'
          ? {
              backgroundImage: `
                linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(147, 51, 234, 0.1) 100%)
              `,
            }
          : {}
      }
    >
      <motion.div
        className="relative w-full aspect-video overflow-hidden rounded-t-2xl bg-slate-100 border-b border-slate-200/50"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.img
          src={project.img || '/fallback-image.jpg'}
          alt={`${project.title} thumbnail`}
          className="w-full h-full object-cover"
          variants={thumbnailVariants[lens]}
          transition={thumbnailTransitions[lens]}
        />
      </motion.div>
      {/* Content Section */}
      <div
        className={`${
          lens === 'product'
            ? 'p-8 bg-white'
            : lens === 'engineering'
            ? 'p-6 bg-slate-900'
            : 'p-6 bg-transparent'
        }`}
      >
        {/* Project Title */}
        <h3
          className={`font-bold mb-4 ${
            lens === 'product'
              ? 'text-2xl text-slate-900 tracking-tight'
              : lens === 'engineering'
              ? 'text-xl text-white font-mono tracking-wider'
              : 'text-xl text-purple-50 tracking-tight'
          }`}
        >
          {project.title}
        </h3>

        {/* Agentic: AI Status indicators */}
        {lens === 'agentic' 
        // && (
        //   <div className="mb-4 space-y-2 pb-4 border-b border-violet-500/20">
        //     <motion.div
        //       animate={{ opacity: [0.5, 1, 0.5] }}
        //       transition={{ duration: 2, repeat: Infinity }}
        //       className="flex items-center gap-2 text-xs"
        //     >
        //       <div className="w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-500/50" />
        //       <span className="text-violet-300">AGENT STATUS:</span>
        //       <span className="text-pink-400 font-mono">ACTIVE</span>
        //     </motion.div>
        //     <div className="flex items-center gap-2 text-xs">
        //       <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
        //       <span className="text-violet-300">REASONING:</span>
        //       <span className="text-emerald-400 font-mono">ENABLED</span>
        //     </div>
        //     <div className="flex items-center gap-2 text-xs">
        //       <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
        //       <span className="text-violet-300">LEARNING:</span>
        //       <span className="text-cyan-400 font-mono">CONTINUOUS</span>
        //     </div>
        //   </div>
        // )
        }

        {/* Lens-specific content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lens}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Headline */}
            <h4
              className={`font-semibold ${
                lens === 'product'
                  ? 'text-lg text-slate-900'
                  : lens === 'engineering'
                  ? 'text-base text-cyan-400 font-mono uppercase tracking-widest'
                  : 'text-lg text-violet-300'
              }`}
            >
              {lensContent.headline}
            </h4>

            {/* Description */}
            <p
              className={`text-sm leading-relaxed ${
                lens === 'product'
                  ? 'text-slate-600'
                  : lens === 'engineering'
                  ? 'text-slate-300 font-mono text-xs leading-6'
                  : 'text-purple-200/80'
              }`}
            >
              {descriptionText}
            </p>

            {/* Stat Badge */}
            <div className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`px-4 py-2 rounded-none text-sm font-semibold font-mono ${
                  lens === 'product'
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 shadow-sm hover:shadow-md hover:bg-indigo-100'
                    : lens === 'engineering'
                    ? 'bg-slate-800 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest text-xs hover:bg-slate-700/80'
                    : 'bg-purple-500/20 border border-violet-400/50 text-violet-200 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50'
                }`}


                
              >
                {statText}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stack Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          <AnimatePresence mode="wait">
            {project.stack.map((tech) => {
              const isRelevant = relevantTechs.includes(tech);
              return (
                <motion.span
                  key={tech}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className={`px-3 py-1 rounded-none text-xs font-mono transition-all ${
                    lens === 'product'
                      ? isRelevant
                        ? 'bg-indigo-100 border border-indigo-300 text-indigo-700 font-semibold'
                        : 'bg-gray-100 border border-gray-200 text-gray-500'
                      : lens === 'engineering'
                      ? isRelevant
                        ? 'bg-slate-800 border border-cyan-500/50 text-cyan-300 uppercase tracking-widest'
                        : 'bg-slate-800/50 border border-slate-700 text-slate-500 uppercase tracking-widest'
                      : isRelevant
                      ? 'bg-violet-500/30 border border-violet-400/50 text-violet-200 shadow-lg shadow-violet-500/20'
                      : 'bg-violet-500/20 border border-violet-500/30 text-violet-300/60'
                  }`}
                >
                  {tech}
                </motion.span>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div
          className={`h-px my-4 ${
            lens === 'product'
              ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'
              : lens === 'engineering'
              ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
              : 'bg-gradient-to-r from-purple-500/0 via-violet-500/30 to-purple-500/0'
          }`}
        />

        {/* Lens indicator */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`text-xs font-mono pb-2 ${
            lens === 'product'
              ? 'text-slate-500'
              : lens === 'engineering'
              ? 'text-slate-500 uppercase tracking-widest'
              : 'text-violet-400/60'
          }`}
        >
          Viewing in{' '}
          <span
            className={`font-semibold ${
              lens === 'product'
                ? 'text-slate-700'
                : lens === 'engineering'
                ? 'text-cyan-400'
                : 'text-violet-400'
            }`}
          >
            {lens.charAt(0).toUpperCase() + lens.slice(1)}
          </span>{' '}
          Lens
        </motion.div>

        {/* Deep Dive Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={
            lens === 'product'
              ? { type: 'spring', stiffness: 300, damping: 25 }
              : { type: 'spring', stiffness: 200, damping: 20 }
          }
          onClick={() => onSelectProject(project)}
          className={`w-full py-3 px-4 rounded-xl font-medium tracking-wide transition-all duration-300 border backdrop-blur-sm flex items-center justify-center gap-2
            ${
              lens === 'product'
                ? 'bg-indigo-600/90 text-white border-indigo-500 hover:bg-indigo-500 shadow-lg'
                : lens === 'engineering'
                ? 'bg-slate-900/50 text-cyan-400 border-cyan-500/30 hover:bg-cyan-900/40 hover:border-cyan-400/60'
                : 'bg-fuchsia-900/20 text-fuchsia-400 border-fuchsia-500/30 hover:bg-fuchsia-900/40 hover:border-fuchsia-400/60'
            }
          `}
        >
          Deep Dive &rarr;
        </motion.button>
      </div>
    </motion.div>
  );
};


