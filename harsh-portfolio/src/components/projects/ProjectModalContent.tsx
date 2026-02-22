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
            const swotContent = project.stack.slice(0, 2); // Mock SWOT content
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
                  {swotContent.join(', ')}
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
          <motion.div
            variants={itemVariants}
            className="bg-slate-50 rounded-2xl p-6 flex-1 text-center border border-slate-100 shadow-sm"
          >
            <p className="text-3xl font-black text-indigo-600 mb-2">
              100%
            </p>
            <p className="text-xs text-slate-500 font-medium">
              Impact Metric
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-slate-50 rounded-2xl p-6 flex-1 text-center border border-slate-100 shadow-sm"
          >
            <p className="text-3xl font-black text-indigo-600 mb-2">
              {project.category[0]}
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {project.category}
            </p>
          </motion.div>
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
          card: 'bg-slate-950 text-cyan-50 border border-cyan-500/50 font-mono rounded-none',
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
              <div className={`${lens === 'engineering' ? 'p-6' : 'p-8'}`}>
                {lens === 'product' ? (
                  <ProductCaseStudy project={project} />
                ) : (
                  <>
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
