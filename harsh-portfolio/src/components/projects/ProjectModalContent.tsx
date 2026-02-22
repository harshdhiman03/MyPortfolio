'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lightbulb } from 'lucide-react';
import { useLens } from '@/context/LensContext';
import { EngineeringDeveloperTool } from './EngineeringDeveloperTool';
import type { Project } from '@/lib/data';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// SWOT Quadrant Colors
const SWOT_COLORS = {
  S: { bg: 'bg-emerald-50', border: 'border-emerald-100', label: 'bg-emerald-100', text: 'text-emerald-700', badge: 'bg-emerald-500' },
  W: { bg: 'bg-amber-50', border: 'border-amber-100', label: 'bg-amber-100', text: 'text-amber-700', badge: 'bg-amber-500' },
  O: { bg: 'bg-blue-50', border: 'border-blue-100', label: 'bg-blue-100', text: 'text-blue-700', badge: 'bg-blue-500' },
  T: { bg: 'bg-slate-100', border: 'border-slate-200', label: 'bg-slate-200', text: 'text-slate-700', badge: 'bg-slate-500' },
};

// Mock code snippets for engineering lens
const CODE_SNIPPETS: Record<string, string> = {
  'infosys-tv': `// Azure Cloud Pipeline
async function processPipeline(data) {
  const result = await databricks.execute(data);
  return await azureBlob.store(result);
}`,
  'foodoptima': `# EfficientNetB0 Pipeline
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
  'infosys-tv': [
    'Analyzing workflow bottlenecks...',
    'Optimizing process logic...',
    'Deploying automation...',
    '✓ 36% improvement achieved',
  ],
  'foodoptima': [
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

// Product Lens Case Study Layout
const ProductCaseStudy = ({ project }: { project: Project }) => {
  const content = project.content.product;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Visual Section */}
      <motion.div
        variants={itemVariants}
        className="h-64 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 rounded-xl border border-slate-200 flex items-center justify-center p-8"
      >
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

      {/* Headline */}
      <motion.div variants={itemVariants}>
        <h2 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
          {content.headline}
        </h2>
      </motion.div>

      {/* Problem & Audience */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">The Problem</p>
          <p className="text-lg text-slate-600 leading-relaxed">
            {project.content.engineering.headline}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Who It's For</p>
          <p className="text-lg text-slate-600 leading-relaxed">
            {content.painPoint}
          </p>
        </div>
      </motion.div>

      {/* Aha! Moment Callout */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-50/50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8"
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Core Innovation</h3>
            <p className="text-slate-700 italic">
              {content.ahaMoment}
            </p>
          </div>
        </div>
      </motion.div>

      {/* SWOT Analysis */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">SWOT Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['S', 'W', 'O', 'T'].map((type) => {
            const colors = SWOT_COLORS[type as keyof typeof SWOT_COLORS];
            const swotKey = type.toLowerCase() as 's' | 'w' | 'o' | 't';
            const swotContent = content.swot[swotKey];
            return (
              <motion.div
                key={type}
                variants={itemVariants}
                className={`${colors.bg} border ${colors.border} shadow-sm rounded-xl p-5`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`${colors.label} ${colors.text} font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm`}>
                    {type}
                  </span>
                  <span className="text-sm font-semibold text-slate-700">
                    {type === 'S' ? 'Strengths' : type === 'W' ? 'Weaknesses' : type === 'O' ? 'Opportunities' : 'Threats'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {swotContent}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Key Achievements */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Achievements</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {content.keyAchievements.map((achievement) => (
            <motion.div
              key={achievement.label}
              variants={itemVariants}
              className="bg-slate-50 rounded-2xl p-6 flex-1 text-center border border-slate-100 shadow-sm"
            >
              <p className="text-3xl font-black text-indigo-600 mb-2">
                {achievement.value}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {achievement.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Technology Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.slice(0, 6).map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectDetailModal = ({ project, onClose }: ProjectDetailModalProps) => {
  const { lens } = useLens();

  // Get polymorphic styling based on lens
  const getModalStyles = () => {
    switch (lens) {
      case 'product':
        return {
          backdrop: 'bg-black/40 backdrop-blur-md',
          card: 'bg-white text-slate-900 border border-slate-200',
          shadow: 'shadow-2xl',
          closeButton: 'text-slate-400 hover:text-slate-600',
          header: 'text-slate-900 font-bold text-2xl',
        };
      case 'engineering':
        return {
          backdrop: 'bg-black/60 backdrop-blur-lg',
          card: 'bg-slate-950 text-cyan-50 border border-cyan-500/50 font-mono text-sm rounded-none',
          shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
          closeButton: 'text-cyan-400 hover:text-cyan-300',
          header: 'text-cyan-400 font-bold text-2xl uppercase tracking-widest',
        };
      case 'agentic':
        return {
          backdrop: 'bg-black/70 backdrop-blur-xl',
          card: 'bg-[#0a0514]/90 backdrop-blur-2xl text-purple-50 border border-purple-500/40 rounded-2xl',
          shadow: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]',
          closeButton: 'text-purple-400 hover:text-purple-300',
          header: 'text-purple-100 font-bold text-2xl',
        };
      default:
        return {
          backdrop: 'bg-black/40 backdrop-blur-md',
          card: 'bg-white text-slate-900 border border-slate-200',
          shadow: 'shadow-2xl',
          closeButton: 'text-slate-400 hover:text-slate-600',
          header: 'text-slate-900 font-bold text-2xl',
        };
    }
  };

  const styles = getModalStyles();

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={`fixed inset-0 z-[99] ${styles.backdrop}`}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6`}
          >
            {/* Modal Card */}
            <motion.div
              className={`w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl ${styles.card} ${styles.shadow} relative`}
            >
              {/* Background visuals based on lens */}
              {lens === 'engineering' && (
                <div
                  className="absolute inset-0 opacity-10 rounded-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                  }}
                />
              )}

              {lens === 'agentic' && (
                <>
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-10 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 blur-3xl"
                  />
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 blur-3xl"
                  />
                  <div
                    className="absolute inset-0 opacity-10 rounded-2xl"
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

              {lens === 'product' && (
                <div
                  className="absolute inset-0 opacity-5 rounded-2xl"
                  style={{
                    backgroundImage: `
                      linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(99, 102, 241, 0.2) 100%)
                    `,
                  }}
                />
              )}

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`absolute top-6 right-6 z-50 p-2 rounded-lg transition-colors ${styles.closeButton}`}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Modal Content */}
              <div className={`relative z-10 ${lens === 'engineering' ? 'p-6 font-mono text-sm' : 'p-8'}`}>
                {lens === 'product' ? (
                  <ProductCaseStudy project={project} />
                ) : (
                  <>
                    {/* Visual Section for Engineering & Agentic */}
                    {lens === 'engineering' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8 h-48 bg-slate-900/70 rounded-lg border border-cyan-500/30 p-4 overflow-hidden flex flex-col justify-center relative"
                      >
                        {/* Line numbers */}
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/50 border-r border-slate-700 flex flex-col items-center justify-start pt-4 text-xs text-slate-500/50 font-mono">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="h-6">
                              {n}
                            </div>
                          ))}
                        </div>
                        <pre className="text-xs text-cyan-400 font-mono whitespace-pre-wrap overflow-hidden pl-2 leading-6">
                          {CODE_SNIPPETS[project.id] || ''}
                        </pre>
                      </motion.div>
                    )}

                    {lens === 'agentic' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-8 p-6 gap-3 flex flex-col"
                      >
                        {(THOUGHT_PROCESS[project.id] || []).map((thought, i) => (
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

                    <h2 className={styles.header}>
                      {project.title}
                    </h2>

                    {/* Content */}
                    <div className="mt-6">
                      <EngineeringDeveloperTool project={project} />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
