'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { projects } from '@/lib/data';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/data';

interface ProjectGridProps {
  onSelectProject: (project: Project) => void;
}

// Section headers for each lens
const SECTION_HEADERS = {
  product: {
    title: 'User Centric Projects',
    subtitle: 'Real-world applications built with user focus',
  },
  engineering: {
    title: 'Technical Deep Dives',
    subtitle: 'Architecture, infrastructure, and system design',
  },
  agentic: {
    title: 'AI Research & Applications',
    subtitle: 'Intelligent systems and advanced algorithms',
  },
};

export const ProjectGrid = ({ onSelectProject }: ProjectGridProps) => {
  const { lens } = useLens();
  const header = SECTION_HEADERS[lens];
  const isProduct = lens === 'product';
  const isEngineering = lens === 'engineering';
  const isAgentic = lens === 'agentic';

  return (
    <div className="w-full">
      {/* Section Header */}
      <motion.div
        key={lens}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2
          className={`text-4xl lg:text-5xl font-bold mb-3 ${
            isProduct
              ? 'text-slate-900 tracking-tight'
              : isEngineering
              ? 'text-white font-mono tracking-wider text-cyan-400'
              : 'text-purple-50 tracking-tight'
          }`}
        >
          {header.title}
        </h2>
        <p
          className={`text-lg max-w-2xl ${
            isProduct
              ? 'text-slate-600'
              : isEngineering
              ? 'text-slate-300 font-mono'
              : 'text-purple-300/80'
          }`}
        >
          {header.subtitle}
        </p>

        {/* Decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '120px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-1 mt-4 ${
            isProduct
              ? 'bg-indigo-600'
              : isEngineering
              ? 'bg-cyan-500'
              : 'bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg shadow-violet-500/50'
          }`}
        />
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
      >
        {projects
          .filter((project) => project.content[lens] !== undefined)
          .map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: 'spring',
              stiffness: 100,
            }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <ProjectCard project={project} index={index} onSelectProject={onSelectProject} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state (won't show with current data, but good to have) */}
      {projects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20"
        >
          <p
            className={`font-mono text-lg ${
              isProduct ? 'text-slate-400' : 'text-white/50'
            }`}
          >
            No projects to display
          </p>
        </motion.div>
      )}
    </div>
  );
};
