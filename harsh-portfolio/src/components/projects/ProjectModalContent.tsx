'use client';

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
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

const heroVariants: Record<'product' | 'engineering' | 'agentic', Variants> = {
  product: {
    initial: { filter: 'saturate(0.8) brightness(0.8)', scale: 1.05, opacity: 0 },
    animate: {
      filter: 'saturate(1) brightness(1)',
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' as const },
    },
  },
  engineering: {
    initial: {
      filter: 'contrast(120%) saturate(0%) brightness(0.6) sepia(100%) hue-rotate(190deg)',
      scale: 1.05,
      opacity: 0,
    },
    animate: {
      filter: 'contrast(110%) saturate(20%) brightness(0.9) sepia(80%) hue-rotate(190deg)',
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'circOut' as const },
    },
  },
  agentic: {
    initial: {
      filter: 'contrast(150%) saturate(150%) hue-rotate(-25deg) brightness(0.8)',
      scale: 1.05,
      opacity: 0,
    },
    animate: {
      filter: 'contrast(120%) saturate(120%) hue-rotate(0deg) brightness(1)',
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, type: 'spring', bounce: 0.4 },
    },
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

const AgenticExecutionTrace = ({ project }: { project: Project }) => {
  const content = project.content.agentic!;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 font-mono"
    >
      <motion.div
        variants={itemVariants}
        className="bg-[#05010a] border border-purple-500/30 rounded-xl p-6 shadow-[inset_0_0_50px_rgba(168,85,247,0.1)]"
      >
        <p className="text-emerald-400 text-xs tracking-widest mb-6">
          [ AGENT_STATUS: ONLINE ] | [ MODE: AUTONOMOUS ] | [ PARADIGM: {content.paradigm} ]
        </p>

        <h2 className="text-purple-100 text-2xl font-bold">{content.headline}</h2>

        <div className="mt-8">
          <p className="text-purple-400 text-sm mb-4 opacity-80">
            &gt; EXECUTION_TRACE // CHAIN_OF_THOUGHT
          </p>
          <div className="border-l border-purple-900/50 pl-4 ml-2 space-y-4">
            {content.reasoningTrace.map((trace, index) => (
              <motion.div key={`${trace.step}-${index}`} variants={itemVariants} className="space-y-2">
                <p className="text-purple-500 text-xs">[STEP_{index + 1}]</p>
                <p className="text-xs leading-relaxed">
                  <span className="text-cyan-400 text-xs mr-2">ACTION::</span>
                  <span className="text-slate-300">{trace.action}</span>
                </p>
                <p className="text-xs leading-relaxed">
                  <span className="text-emerald-400 text-xs mr-2">OBSERVATION/RESULT::</span>
                  <span className="text-slate-400">{trace.result}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-purple-400 text-sm mb-3 opacity-80">&gt; CORE_MEMORY_BLOCK</p>
          <div className="bg-[#0a0514] border border-purple-500/20 p-4 rounded-md mt-2">
            <p className="text-purple-200/70 text-sm leading-relaxed">{content.coreLogic}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-purple-400 text-sm mb-3 opacity-80">&gt; TECH_STACK // NEURAL_NODES</p>
          <div className="flex flex-wrap gap-2">
            {content.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-purple-900/20 text-purple-300 border border-purple-500/30 px-3 py-1 text-xs rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
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
                <motion.div
                  className={`relative overflow-hidden rounded-t-2xl h-64 sm:h-72 border-b ${
                    lens === 'engineering'
                      ? '-mx-6 -mt-6 mb-6 border-cyan-500/30'
                      : lens === 'agentic'
                      ? '-mx-8 -mt-8 mb-8 border-purple-500/30'
                      : '-mx-8 -mt-8 mb-8 border-slate-200/60'
                  }`}
                >
                  <motion.img
                    key={`${project.id}-${lens}`}
                    src={project.img || '/fallback-image.jpg'}
                    alt={`${project.title} hero`}
                    className="w-full h-full object-cover"
                    variants={heroVariants[lens]}
                    initial="initial"
                    animate="animate"
                  />
                </motion.div>

                {lens === 'product' ? (
                  <ProductCaseStudy project={project} />
                ) : lens === 'agentic' ? (
                  <AgenticExecutionTrace project={project} />
                ) : (
                  <>
                    {/* Visual Section for Engineering */}
                    {lens === 'engineering' 
                      // <motion.div
                      //   initial={{ opacity: 0 }}
                      //   animate={{ opacity: 1 }}
                      //   transition={{ duration: 0.4 }}
                      //   className="mb-8 h-48 bg-slate-900/70 rounded-lg border border-cyan-500/30 p-4 overflow-hidden flex flex-col justify-center relative"
                      // >
                      //   {/* Line numbers */}
                      //   <div className="absolute left-0 top-0 bottom-0 w-12 bg-slate-800/50 border-r border-slate-700 flex flex-col items-center justify-start pt-4 text-xs text-slate-500/50 font-mono">
                      //     {[1, 2, 3, 4, 5].map((n) => (
                      //       <div key={n} className="h-6">
                      //         {n}
                      //       </div>
                      //     ))}
                      //   </div>
                      //   <pre className="text-xs text-cyan-400 font-mono whitespace-pre-wrap overflow-hidden pl-2 leading-6">
                      //     {CODE_SNIPPETS[project.id] || ''}
                      //   </pre>
                      // </motion.div>
                    }
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

