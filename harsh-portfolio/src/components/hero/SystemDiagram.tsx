'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const SystemDiagram = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Diagram Container */}
      <div className="bg-slate-900/50 border border-blue-900/50 rounded-lg p-8 backdrop-blur-sm">
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-auto"
          style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.1))' }}
        >
          {/* Define arrowhead marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#60a5fa" />
            </marker>
            <pattern
              id="blueprint"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0f172a"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Background grid (blueprint style) */}
          <rect
            width="1000"
            height="400"
            fill="url(#blueprint)"
            opacity="0.3"
          />

          {/* Azure Cloud Label & Backdrop */}
          <g>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Cloud backdrop rectangle */}
            <rect
              x="450"
              y="80"
              width="480"
              height="280"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeDasharray="10,5"
              rx="8"
              opacity="0.4"
            />

            {/* Azure Cloud Label */}
            <text
              x="920"
              y="110"
              fontSize="14"
              fontFamily="monospace"
              fill="#60a5fa"
              opacity="0.7"
              textAnchor="end"
            >
              Azure Cloud
            </text>
          </g>

          {/* CLIENT BOX (React) */}
          <g>
            {/* Box */}
            <rect
              x="50"
              y="140"
              width="180"
              height="120"
              fill="#1e3a5f"
              stroke="#3b82f6"
              strokeWidth="2"
              rx="4"
            />
            {/* Label */}
            <text
              x="140"
              y="190"
              fontSize="16"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              fontWeight="bold"
            >
              Client
            </text>
            <text
              x="140"
              y="215"
              fontSize="13"
              fontFamily="monospace"
              fill="#93c5fd"
              textAnchor="middle"
              opacity="0.8"
            >
              (React)
            </text>
          </g>

          {/* API GATEWAY BOX (.NET Core) */}
          <g>
            {/* Box */}
            <rect
              x="410"
              y="140"
              width="180"
              height="120"
              fill="#1e3a5f"
              stroke="#3b82f6"
              strokeWidth="2"
              rx="4"
            />
            {/* Label */}
            <text
              x="500"
              y="190"
              fontSize="16"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              fontWeight="bold"
            >
              API Gateway
            </text>
            <text
              x="500"
              y="215"
              fontSize="13"
              fontFamily="monospace"
              fill="#93c5fd"
              textAnchor="middle"
              opacity="0.8"
            >
              (.NET Core)
            </text>
          </g>

          {/* DATA PROCESSOR BOX (Databricks) */}
          <g>
            {/* Box */}
            <rect
              x="770"
              y="140"
              width="180"
              height="120"
              fill="#1e3a5f"
              stroke="#3b82f6"
              strokeWidth="2"
              rx="4"
            />
            {/* Label */}
            <text
              x="860"
              y="185"
              fontSize="16"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              fontWeight="bold"
            >
              Data Processor
            </text>
            <text
              x="860"
              y="215"
              fontSize="13"
              fontFamily="monospace"
              fill="#93c5fd"
              textAnchor="middle"
              opacity="0.8"
            >
              (Databricks)
            </text>
          </g>

          {/* ANIMATED ARROWS */}

          {/* Arrow 1: Client -> API Gateway */}
          <g>
            {/* Base line */}
            <line
              x1="230"
              y1="200"
              x2="410"
              y2="200"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.3"
            />
            {/* Animated arrow */}
            <motion.line
              x1="230"
              y1="200"
              x2="410"
              y2="200"
              stroke="#60a5fa"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ strokeDasharray: '0,100' }}
              animate={{ strokeDasharray: '30,70' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            {/* Label */}
            <text
              x="320"
              y="185"
              fontSize="11"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              opacity="0.6"
            >
              request
            </text>
          </g>

          {/* Arrow 2: API Gateway -> Data Processor */}
          <g>
            {/* Base line */}
            <line
              x1="590"
              y1="200"
              x2="770"
              y2="200"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.3"
            />
            {/* Animated arrow */}
            <motion.line
              x1="590"
              y1="200"
              x2="770"
              y2="200"
              stroke="#60a5fa"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ strokeDasharray: '0,100' }}
              animate={{ strokeDasharray: '30,70' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.5,
              }}
            />
            {/* Label */}
            <text
              x="680"
              y="185"
              fontSize="11"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              opacity="0.6"
            >
              process
            </text>
          </g>

          {/* Arrow 3: Data Processor -> API Gateway (return) */}
          <g>
            {/* Base line */}
            <line
              x1="770"
              y1="220"
              x2="590"
              y2="220"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.3"
            />
            {/* Animated arrow */}
            <motion.line
              x1="770"
              y1="220"
              x2="590"
              y2="220"
              stroke="#60a5fa"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ strokeDasharray: '0,100' }}
              animate={{ strokeDasharray: '30,70' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 1,
              }}
            />
            {/* Label */}
            <text
              x="680"
              y="240"
              fontSize="11"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              opacity="0.6"
            >
              response
            </text>
          </g>

          {/* Arrow 4: API Gateway -> Client (return) */}
          <g>
            {/* Base line */}
            <line
              x1="410"
              y1="220"
              x2="230"
              y2="220"
              stroke="#3b82f6"
              strokeWidth="1.5"
              opacity="0.3"
            />
            {/* Animated arrow */}
            <motion.line
              x1="410"
              y1="220"
              x2="230"
              y2="220"
              stroke="#60a5fa"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              initial={{ strokeDasharray: '0,100' }}
              animate={{ strokeDasharray: '30,70' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.5,
              }}
            />
            {/* Label */}
            <text
              x="320"
              y="240"
              fontSize="11"
              fontFamily="monospace"
              fill="#60a5fa"
              textAnchor="middle"
              opacity="0.6"
            >
              render
            </text>
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500" />
          <span className="text-blue-400">Data Flow</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-blue-500" />
          <span className="text-blue-400">Services</span>
        </div>
      </div>
    </div>
  );
};
