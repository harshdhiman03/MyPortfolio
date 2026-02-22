'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'Figma'],
  },
  {
    name: 'Backend',
    skills: ['.NET Core', 'Node.js', 'SQL Server', 'Azure', 'Databricks', 'REST APIs'],
  },
  {
    name: 'AI/ML',
    skills: ['TensorFlow', 'PyTorch', 'Transformers', 'RAG', 'Fine-tuning', 'NLP'],
  },
];

export const SkillDNA = () => {
  const { lens } = useLens();

  const getHighlightedCategory = () => {
    switch (lens) {
      case 'product':
        return 'Frontend';
      case 'engineering':
        return 'Backend';
      case 'agentic':
        return 'AI/ML';
      default:
        return 'Frontend';
    }
  };

  const getStyles = () => {
    switch (lens) {
      case 'product':
        return {
          container: 'bg-gradient-to-br from-indigo-50 to-slate-50',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          categoryName: 'text-slate-900 font-semibold',
          skillBg: 'bg-white border-2 border-slate-200 text-slate-700',
          highlightedSkillBg: 'bg-indigo-600 border-2 border-indigo-600 text-white',
        };
      case 'engineering':
        return {
          container: 'bg-slate-950',
          title: 'text-slate-100',
          subtitle: 'text-slate-400',
          categoryName: 'text-cyan-400 font-mono font-semibold uppercase tracking-wider text-sm',
          skillBg: 'bg-slate-900 border-2 border-slate-700 text-slate-300',
          highlightedSkillBg: 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-300',
        };
      case 'agentic':
        return {
          container: 'bg-[#0a0a0f]',
          title: 'text-violet-100',
          subtitle: 'text-violet-400/70',
          categoryName: 'text-violet-400 font-semibold uppercase tracking-wider text-sm',
          skillBg: 'bg-violet-900/20 border-2 border-violet-500/30 text-violet-200',
          highlightedSkillBg: 'bg-violet-600/30 border-2 border-violet-500 text-violet-300',
        };
      default:
        return {
          container: 'bg-gradient-to-br from-indigo-50 to-slate-50',
          title: 'text-slate-900',
          subtitle: 'text-slate-600',
          categoryName: 'text-slate-900 font-semibold',
          skillBg: 'bg-white border-2 border-slate-200 text-slate-700',
          highlightedSkillBg: 'bg-indigo-600 border-2 border-indigo-600 text-white',
        };
    }
  };

  const styles = getStyles();
  const highlightedCategory = getHighlightedCategory();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`px-6 py-20 rounded-2xl transition-all duration-700 ${styles.container}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${styles.title}`}>
            Skill DNA
          </h2>
          <p className={`text-lg ${styles.subtitle}`}>
            {lens === 'product'
              ? 'The technologies I use to create beautiful user experiences'
              : lens === 'engineering'
              ? 'The backbone of scalable systems and architectures'
              : 'The tools I use to push the boundaries of AI'}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <AnimatePresence mode="wait">
            {skillCategories.map((category, categoryIndex) => {
              const isHighlighted = category.name === highlightedCategory;
              const opacity = isHighlighted ? 1 : lens === 'product' ? 0.6 : lens === 'engineering' ? 0.5 : 0.5;

              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: categoryIndex * 0.1,
                  }}
                  className="transition-all duration-700"
                >
                  {/* Category Title */}
                  <h3 className={`${styles.categoryName} mb-6`}>
                    {category.name}
                  </h3>

                  {/* Skills */}
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{
                          duration: 0.3,
                          delay: skillIndex * 0.05,
                        }}
                      >
                        <div
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 ${
                            isHighlighted
                              ? styles.highlightedSkillBg
                              : styles.skillBg
                          }`}
                        >
                          {skill}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Lens Hint */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`mt-16 p-6 rounded-lg text-center text-sm ${
            lens === 'product'
              ? 'bg-indigo-100 text-indigo-700'
              : lens === 'engineering'
              ? 'bg-slate-800 text-slate-300'
              : 'bg-violet-900/30 text-violet-300'
          }`}
        >
          {lens === 'product'
            ? '💡 Frontend skills are highlighted to show focus on user-centric design'
            : lens === 'engineering'
            ? '⚙️ Backend skills are highlighted to showcase architectural expertise'
            : '🤖 AI/ML skills are highlighted to demonstrate AI research capabilities'}
        </motion.div>
      </div>
    </motion.section>
  );
};
