'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Mock code snippets for engineering lens
const CODE_SNIPPETS: Record<string, string> = {
  infosys: `// Azure Cloud Pipeline
async function processPipeline(data) {
  const result = await databricks.execute(data);
  return await azureBlob.store(result);
}`,
  foodoptima: `# EfficientNetB0 Pipeline
model = EfficientNetB0(weights='imagenet')
predictions = model.predict(image)
return streamlit.write(predictions)`,
  'runic-realm': `// Smart Contract Interaction
const contract = new ethers.Contract(
  ADDRESS, ABI, signer
);
await contract.recordSession(sessionId);`,
};

// Mock chat bubbles for agentic lens
const THOUGHT_PROCESS: Record<string, string[]> = {
  infosys: [
    'Analyzing workflow bottlenecks...',
    'Optimizing process logic...',
    'Deploying automation...',
    '✓ 36% improvement achieved',
  ],
  foodoptima: [
    'Scanning food waste patterns...',
    'Fine-tuning T5 model...',
    'Generating recommendations...',
    '✓ Recommendations ready',
  ],
  'runic-realm': [
    'Analyzing player behavior...',
    'Detecting anomalies...',
    'Securing session...',
    '✓ Session protected',
  ],
};

export const ProjectCard = ({ project, index, onSelectProject }: ProjectCardProps) => {
  const { lens } = useLens();
  const lensContent = project.content[lens];
  const relevantTechs = LENS_TECH_MAP[lens] || [];
  const codeSnippet = CODE_SNIPPETS[project.id] || '';
  const thoughts = THOUGHT_PROCESS[project.id] || [];

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
      {/* Visual Section (changes based on lens) */}
      <div
        className={`relative overflow-hidden ${
          lens === 'product'
            ? 'h-80 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 border-b border-gray-200'
            : lens === 'engineering'
            ? 'h-64 bg-slate-800/50 border-b border-slate-800 relative'
            : 'h-64 bg-gradient-to-br from-violet-900/40 via-[#0a0a0f] to-violet-900/40 border-b border-violet-500/20 relative'
        }`}
      >
        {/* Engineering: Grid pattern background */}
        {lens === 'engineering' && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        )}

        {/* Agentic: Floating orbs and lines */}
        {lens === 'agentic' && (
          <>
            {/* Animated floating orbs */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 right-6 w-20 h-20 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 blur-2xl"
            />
            <motion.div
              animate={{
                y: [0, 10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute bottom-4 left-6 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-2xl"
            />
            {/* Grid lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px',
              }}
            />
          </>
        )}

        <AnimatePresence mode="wait">
          {lens === 'product' && (
            <motion.div
              key="product-visual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              {/* Product: Clean, minimalist UI showcase */}
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full blur-xl opacity-20"
                  />
                  <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-100 to-indigo-50 border border-indigo-200 flex items-center justify-center shadow-sm">
                    <span className="text-4xl">✨</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    Polished Product Experience
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {lens === 'engineering' && (
            <motion.div
              key="engineering-visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              {/* Engineering: Code snippet with syntax highlighting feel */}
              <div className="w-full h-full bg-slate-900/70 rounded-none border-none p-4 overflow-hidden flex flex-col justify-center relative">
                {/* Line numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/50 border-r border-slate-700 flex flex-col items-center justify-start pt-4 text-xs text-slate-500/50 font-mono">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <div key={n} className="h-6">
                      {n}
                    </div>
                  ))}
                </div>
                <pre className="text-xs text-cyan-400 font-mono whitespace-pre-wrap overflow-hidden pl-2 leading-6">
                  {codeSnippet}
                </pre>
              </div>
            </motion.div>
          )}

          {lens === 'agentic' && (
            <motion.div
              key="agentic-visual"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-start justify-center p-6 gap-3"
            >
              {/* Agentic: Thought process bubbles with neon glow */}
              {thoughts.map((thought, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm font-mono backdrop-blur-md ${
                    thought.includes('✓')
                      ? 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/30'
                      : 'bg-violet-500/20 border border-violet-400/50 text-violet-200 shadow-lg shadow-violet-500/30'
                  }`}
                >
                  {thought}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
        {lens === 'agentic' && (
          <div className="mb-4 space-y-2 pb-4 border-b border-violet-500/20">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-500/50" />
              <span className="text-violet-300">AGENT STATUS:</span>
              <span className="text-pink-400 font-mono">ACTIVE</span>
            </motion.div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
              <span className="text-violet-300">REASONING:</span>
              <span className="text-emerald-400 font-mono">ENABLED</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50" />
              <span className="text-violet-300">LEARNING:</span>
              <span className="text-cyan-400 font-mono">CONTINUOUS</span>
            </div>
          </div>
        )}

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
              {lens === 'product' && 'painPoint' in lensContent 
                ? lensContent.painPoint
                : 'description' in lensContent 
                ? lensContent.description
                : 'A groundbreaking project'}
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
                {lens === 'product' && 'keyAchievements' in lensContent
                  ? lensContent.keyAchievements?.[0]?.value || 'View More'
                  : 'stat' in lensContent
                  ? lensContent.stat
                  : 'Explore'}
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
          className={`text-xs font-mono ${
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
          whileHover={
            lens === 'product'
              ? { scale: 1.02, backgroundColor: 'rgb(67, 56, 202)' }
              : lens === 'engineering'
              ? { borderColor: 'rgb(34, 211, 238)' }
              : {
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
                }
          }
          whileTap={{ scale: 0.96 }}
          transition={
            lens === 'product'
              ? { type: 'spring', stiffness: 300, damping: 25 }
              : { type: 'spring', stiffness: 200, damping: 20 }
          }
          onClick={() => onSelectProject(project)}
          className={`w-full mt-4 px-4 py-3 rounded-none font-mono text-sm font-semibold border transition-all ${
            lens === 'product'
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 hover:border-indigo-700 shadow-sm hover:shadow-md active:shadow-sm'
              : lens === 'engineering'
              ? 'bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 hover:border-cyan-500/50 uppercase tracking-widest text-xs'
              : 'bg-gradient-to-r from-violet-500/30 to-pink-500/30 hover:from-violet-500/40 hover:to-pink-500/40 text-violet-200 border border-violet-400/50 hover:border-violet-400/80 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50'
          }`}
        >
          Deep Dive →
        </motion.button>
      </div>
    </motion.div>
  );
};
