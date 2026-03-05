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

const PolymorphicThumbnail = ({
  img,
  lens,
}: {
  img: string;
  lens: 'product' | 'engineering' | 'agentic';
}) => {
  const config = {
    product: {
      containerRest: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        borderColor: 'rgba(226,232,240,0.7)',
      },
      containerHover: {
        scale: 1.05,
        boxShadow: '0px 20px 40px rgba(0,0,0,0.1)',
      },
      imageRest: {
        filter: 'saturate(0.8) brightness(0.95)',
      },
      imageHover: {
        filter: 'saturate(1.2) brightness(1)',
      },
      transition: { ease: 'easeOut' as const, duration: 0.4 },
    },
    engineering: {
      containerRest: {
        scale: 1,
        borderColor: 'rgba(51,65,85,0.7)',
      },
      containerHover: {
        scale: 1.02,
        borderColor: 'rgba(56, 189, 248, 0.8)',
      },
      imageRest: {
        filter: 'contrast(120%) saturate(0%) brightness(0.8) sepia(100%) hue-rotate(180deg)',
      },
      imageHover: {
        filter: 'contrast(100%) saturate(100%) brightness(1) sepia(0%) hue-rotate(0deg)',
      },
      transition: { ease: 'circOut' as const, duration: 0.3 },
    },
    agentic: {
      containerRest: {
        scale: 1,
      },
      containerHover: {
        scale: 1.03,
      },
      imageRest: {
        opacity: 0.8,
        filter: 'contrast(150%) saturate(120%) hue-rotate(-30deg)',
      },
      imageHover: {
        opacity: 1,
        filter:
          'contrast(120%) saturate(150%) hue-rotate(0deg) drop-shadow(0 0 20px rgba(168,85,247,0.6))',
      },
      transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
    },
  }[lens];

  return (
    <motion.div
      variants={{
        rest: config.containerRest,
        hover: config.containerHover,
      }}
      transition={config.transition}
      className="overflow-hidden rounded-xl relative aspect-video w-full mb-4 border"
    >
      <motion.img
        src={img}
        alt=""
        variants={{
          rest: config.imageRest,
          hover: config.imageHover,
        }}
        transition={config.transition}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
};

export const ProjectCard = ({ project, index, onSelectProject }: ProjectCardProps) => {
  const { lens } = useLens();
  const lensContent = project.content[lens]!;
  const descriptionText =
    lens === 'agentic'
      ? project.content.agentic!.coreLogic
      : lensContent.headline;
  const statText =
    lens === 'agentic'
      ? project.content.agentic!.paradigm
      : `${lensContent.headline?.[0] || 'View'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover="hover"
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: false, amount: 0.3 }}
      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
    >
      <PolymorphicThumbnail img={project.img} lens={lens} />

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
          {descriptionText}
        </p>
        <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <p className="text-sm font-semibold text-blue-300">
            {statText}
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
