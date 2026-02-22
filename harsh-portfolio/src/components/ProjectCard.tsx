'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import type { Project } from '@/lib/data';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export const ProjectCard = ({ project, index, onSelectProject }: ProjectCardProps) => {
  const { lens } = useLens();
  const lensContent = project.content[lens];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
    >
      {/* Project title and stack */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Lens-specific content */}
      <motion.div
        key={lens}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h4 className="text-lg font-semibold text-white mb-2">
          {lensContent.headline}
        </h4>
        <p className="text-white/70 mb-4 leading-relaxed">
          {'description' in lensContent ? lensContent.description : lensContent.headline}
        </p>
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <p className="text-sm font-semibold text-blue-300">
            {'stat' in lensContent ? lensContent.stat : `${lensContent.headline?.[0] || 'View'}`}
          </p>
        </div>
      </motion.div>

      {/* Deep Dive Button */}
      <motion.button
        onClick={() => onSelectProject(project)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold transition-all"
      >
        Deep Dive
      </motion.button>
    </motion.div>
  );
};
