'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Project, EngineeringContent } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const EngineeringDeveloperTool = ({ project }: { project: Project }) => {
  const content = project.content.engineering as EngineeringContent;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 font-mono text-xs"
    >
      {/* System Status Header */}
      <motion.div variants={itemVariants} className="border border-slate-700 bg-slate-900/50 p-4 rounded-none">
        <div className="flex items-center justify-between mb-3">
          <span className="text-cyan-400 font-bold">STATUS_BAR</span>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
              ONLINE
            </div>
            <span></span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" />
      </motion.div>

      {/* Headline */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-700 pb-4">
          {content.headline}
        </h2>
      </motion.div>

      {/* Architecture */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold"> SYSTEM_ARCHITECTURE</p>
        <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/30 border border-slate-800 p-3 rounded-none">
          {content.architecture}
        </p>
      </motion.div>

      {/* Component Tree */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> COMPONENT_TREE (REACT/FRONTEND)</p>
        <div className="bg-[#0d1117] border border-slate-800 rounded-md p-4 space-y-1">
          {content.frontendStructure.map((comp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="font-mono text-xs leading-relaxed"
            >
              <span className="text-cyan-400">{comp.component}</span>
              <span className="text-slate-500 ml-4">{'// '}{comp.role}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Data Pipeline */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> DATA_PIPELINE (BACKEND/ML FLOW)</p>
        <div className="border-l-2 border-slate-800 ml-3 pl-6 relative space-y-6">
          {content.dataPipeline.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              <div className="absolute bg-blue-500 rounded-full w-2 h-2 -left-[29px] mt-1.5" />
              <div className="text-blue-400 font-bold uppercase tracking-wider">{step.step}</div>
              <div className="text-slate-300 mt-1">{step.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Implementation */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> CORE_IMPLEMENTATION</p>
        <pre className="bg-[#0d1117] border border-slate-800 rounded-md p-4 overflow-x-auto">
          <code className="text-emerald-400 text-xs leading-relaxed">{content.coreSnippet}</code>
        </pre>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> TECH_STACK</p>
        <div className="flex flex-wrap gap-2">
          {content.techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="bg-slate-900 border border-slate-700 px-3 py-1 text-xs text-slate-300 rounded-none hover:border-cyan-500/50 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
