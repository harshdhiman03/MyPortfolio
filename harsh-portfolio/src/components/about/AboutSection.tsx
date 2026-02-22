'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { IdentityHero } from './IdentityHero';
import { Timeline } from './Timeline';
import { StatsCard } from './StatsCard';
import { NeuralSkillGraph } from './NeuralSkillGraph';

export const AboutSection = () => {
  const { lens } = useLens();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={lens}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-32"
      >
        {/* Section 1: Identity Hero */}
        <IdentityHero />

        {/* Section 2: Live Metrics */}
        <StatsCard />

        {/* Section 3: Timeline */}
        <Timeline />

        {/* Section 4: Neural Skill Graph */}
        <NeuralSkillGraph />
      </motion.div>
    </AnimatePresence>
  );
};
