'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Project, EngineeringContent } from '@/lib/data';

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-emerald-400',
  POST: 'text-amber-400',
  PUT: 'text-blue-400',
  DELETE: 'text-red-400',
  PATCH: 'text-purple-400',
};

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
      className="space-y-6 font-mono text-sm"
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
            <span>│</span>
            <span>LATENCY: 12ms</span>
            <span>│</span>
            <span>REGION: US-EAST</span>
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
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold">━━ SYSTEM_ARCHITECTURE</p>
        <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/30 border border-slate-800 p-3 rounded-none">
          {content.architecture}
        </p>
      </motion.div>

      {/* System Components */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold">━━ SYSTEM_COMPONENTS</p>
        <div className="flex flex-wrap gap-2">
          {content.systemComponents.map((component, idx) => (
            <motion.div
              key={component.name}
              variants={itemVariants}
              className="bg-slate-900 border border-slate-700 p-3 rounded-none flex-1 min-w-max hover:border-cyan-500/50 transition-colors"
            >
              <div className="font-bold text-slate-100 text-xs mb-1">{component.name}</div>
              <div className="text-slate-500 text-xs mb-1">{component.role}</div>
              <div className="text-cyan-400 text-xs font-mono">{component.tech}</div>
              {idx < content.systemComponents.length - 1 && (
                <div className="ml-full text-slate-700 text-xs mt-2">→</div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* API Reference Table */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold">━━ API_ROUTES // DATA_PIPELINE</p>
        <div className="space-y-2">
          {content.apiReference.map((api) => (
            <motion.div
              key={api.route}
              variants={itemVariants}
              className="border border-slate-700 bg-slate-900/50 p-3 rounded-none hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <span className={`${METHOD_COLORS[api.method] || 'text-slate-400'} font-bold text-xs uppercase tracking-widest`}>
                    {api.method}
                  </span>
                  <span className="text-slate-100 font-mono text-xs">{api.route}</span>
                </div>
                <span className="text-slate-500 text-xs whitespace-nowrap">{api.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core Schema / Logic */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold">━━ CORE_SCHEMA.json</p>
        <div className="bg-[#0d1117] border border-slate-800 p-4 rounded-none overflow-x-auto">
          <pre className="text-green-400 text-xs leading-relaxed whitespace-pre-wrap break-words">
            {content.schemaSnippet}
          </pre>
        </div>
      </motion.div>

      {/* Tech Stack Footer */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold">━━ TECH_STACK</p>
        <div className="flex flex-wrap gap-2">
          {content.techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Footer Status */}
      <motion.div
        variants={itemVariants}
        className="border-t border-slate-700 pt-4 mt-6 flex items-center justify-between text-xs text-slate-500"
      >
        <span>END_OF_REPORT</span>
        <span className="animate-pulse">⚡ READY_FOR_DEPLOYMENT</span>
      </motion.div>
    </motion.div>
  );
};
