'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';

const CodeSnippetVisual = () => (
  <div className="bg-slate-900 p-6 rounded-lg border border-cyan-500/30 font-mono text-sm overflow-hidden">
    <div className="space-y-2">
      <div className="text-cyan-400">
        <span className="text-purple-400">class</span> <span className="text-blue-400">User</span> {'{'}
      </div>
      <div className="text-green-400 ml-4">
        name: <span className="text-yellow-300">"Harsh Dhiman"</span>
      </div>
      <div className="text-green-400 ml-4">
        role: <span className="text-yellow-300">"Full-Stack Engineer"</span>
      </div>
      <div className="text-green-400 ml-4">
        experience: <span className="text-orange-400">2+ Years</span>
      </div>
      <div className="text-green-400 ml-4">
        expertise: <span className="text-yellow-300">["AI", "Web3", "Cloud"]</span>
      </div>
      <div className="text-green-400 ml-4">
        passion: <span className="text-yellow-300">"Building Scalable Systems"</span>
      </div>
      <div className="text-cyan-400">
        {'}'}
      </div>
    </div>
  </div>
);

const NetworkVisualization = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <svg className="absolute w-full h-full" viewBox="0 0 256 256">
      {/* Animated orbits */}
      <circle
        cx="128"
        cy="128"
        r="60"
        fill="none"
        stroke="rgba(168, 85, 247, 0.2)"
        strokeWidth="2"
        style={{
          animation: 'spin 8s linear infinite',
        }}
      />
      <circle
        cx="128"
        cy="128"
        r="90"
        fill="none"
        stroke="rgba(139, 92, 246, 0.15)"
        strokeWidth="2"
        style={{
          animation: 'spin 12s linear infinite reverse',
        }}
      />

      {/* Center node */}
      <circle cx="128" cy="128" r="8" fill="url(#nodeGradient)" />

      {/* Outer nodes */}
      <circle cx="188" cy="128" r="6" fill="rgba(168, 85, 247, 0.8)" />
      <circle cx="68" cy="128" r="6" fill="rgba(168, 85, 247, 0.8)" />
      <circle cx="128" cy="68" r="6" fill="rgba(168, 85, 247, 0.8)" />
      <circle cx="128" cy="188" r="6" fill="rgba(168, 85, 247, 0.8)" />
      <circle cx="168" cy="88" r="6" fill="rgba(168, 85, 247, 0.6)" />
      <circle cx="88" cy="168" r="6" fill="rgba(168, 85, 247, 0.6)" />

      {/* Connecting lines */}
      <line x1="128" y1="128" x2="188" y2="128" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
      <line x1="128" y1="128" x2="68" y2="128" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
      <line x1="128" y1="128" x2="128" y2="68" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
      <line x1="128" y1="128" x2="128" y2="188" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
      <line x1="128" y1="128" x2="168" y2="88" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
      <line x1="128" y1="128" x2="88" y2="168" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />

      {/* Gradient definition */}
      <defs>
        <radialGradient id="nodeGradient">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 1)" />
          <stop offset="100%" stopColor="rgba(99, 102, 241, 0.5)" />
        </radialGradient>
      </defs>
    </svg>

    <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const BlobImage = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      {/* Blob shape with gradient */}
      <path
        d="M 50,50 Q 30,80 40,120 Q 50,160 100,170 Q 150,160 160,120 Q 170,80 150,50 Q 120,30 100,30 Q 80,30 50,50 Z"
        fill="url(#blobGradient)"
        opacity="0.3"
        style={{
          animation: 'morph 8s ease-in-out infinite',
        }}
      />

      {/* Emoji or initials */}
      <text
        x="100"
        y="110"
        fontSize="48"
        textAnchor="middle"
        fill="#fff"
        fontWeight="bold"
      >
        HD
      </text>

      <style>{`
        @keyframes morph {
          0%, 100% { d: path('M 50,50 Q 30,80 40,120 Q 50,160 100,170 Q 150,160 160,120 Q 170,80 150,50 Q 120,30 100,30 Q 80,30 50,50 Z'); }
          50% { d: path('M 60,40 Q 25,75 35,130 Q 55,170 100,175 Q 145,165 165,110 Q 175,75 140,40 Q 110,20 100,25 Q 85,20 60,40 Z'); }
        }
      `}</style>
    </svg>
  </div>
);

export const IdentityHero = () => {
  const { lens } = useLens();

  const getContent = () => {
    switch (lens) {
      case 'product':
        return {
          title: 'I am Harsh Dhiman',
          subtitle: 'I bridge the gap between human needs and technical solutions.',
          visual: <BlobImage />,
          bgText: 'bg-gradient-to-r from-indigo-50 to-slate-50',
          titleColor: 'text-slate-900',
          subtitleColor: 'text-slate-600',
        };
      case 'engineering':
        return {
          title: 'I am a Full-Stack System Engineer',
          subtitle: 'I build scalable pipelines and robust architectures.',
          visual: <CodeSnippetVisual />,
          bgText: 'bg-slate-950',
          titleColor: 'text-slate-100',
          subtitleColor: 'text-slate-300',
        };
      case 'agentic':
        return {
          title: 'I am an AI Researcher',
          subtitle: 'I explore the frontiers of Large Language Models and Agentic Systems.',
          visual: <NetworkVisualization />,
          bgText: 'bg-[#0a0a0f]',
          titleColor: 'text-violet-100',
          subtitleColor: 'text-violet-300',
        };
      default:
        return {
          title: 'I am Harsh Dhiman',
          subtitle: 'I bridge the gap between human needs and technical solutions.',
          visual: <BlobImage />,
          bgText: 'bg-gradient-to-r from-indigo-50 to-slate-50',
          titleColor: 'text-slate-900',
          subtitleColor: 'text-slate-600',
        };
    }
  };

  const content = getContent();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`px-6 py-20 rounded-2xl transition-all duration-700 ${content.bgText}`}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className={`text-4xl md:text-5xl font-bold ${content.titleColor}`}>
            {content.title}
          </h1>
          <p className={`text-xl md:text-2xl leading-relaxed ${content.subtitleColor}`}>
            {content.subtitle}
          </p>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center"
        >
          {content.visual}
        </motion.div>
      </div>
    </motion.section>
  );
};
