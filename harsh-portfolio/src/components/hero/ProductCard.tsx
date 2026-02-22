'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';

export const ProductCard = () => {
  const { lens } = useLens();
  const isProduct = lens === 'product';

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        className="relative group"
      >
        {/* Animated gradient background glow */}
        {isProduct ? (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-300 to-indigo-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
        ) : (
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse" />
        )}

        {/* Main card */}
        <div
          className={`relative rounded-2xl p-8 overflow-hidden border transition-all ${
            isProduct
              ? 'backdrop-blur-sm bg-white border-gray-200 shadow-sm hover:shadow-md'
              : 'backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl'
          }`}
        >
          {/* Background gradient orb */}
          {isProduct ? (
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/30 via-transparent to-transparent rounded-full blur-3xl -z-10" />
          ) : (
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 via-transparent to-transparent rounded-full blur-3xl -z-10" />
          )}

          {/* Header with title and live indicator */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3
                className={`text-2xl font-bold mb-1 ${
                  isProduct
                    ? 'text-slate-900 tracking-tight'
                    : 'bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'
                }`}
              >
                Game Session
              </h3>
              <p
                className={`text-xs font-mono ${
                  isProduct ? 'text-slate-500' : 'text-white/50'
                }`}
              >
                Runic Realm
              </p>
            </div>

            {/* Live indicator with pulse */}
            <div className="flex items-center gap-2">
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  isProduct
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-green-400 to-emerald-400'
                }`}
                animate={{
                  boxShadow: isProduct
                    ? [
                        '0 0 0 0 rgba(34, 197, 94, 0.5)',
                        '0 0 0 8px rgba(34, 197, 94, 0)',
                      ]
                    : [
                        '0 0 0 0 rgba(74, 222, 128, 0.7)',
                        '0 0 0 10px rgba(74, 222, 128, 0)',
                      ],
                  scale: [1, 1.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span
                className={`text-xs font-mono ${
                  isProduct ? 'text-green-600' : 'text-green-400'
                }`}
              >
                Live
              </span>
            </div>
          </div>

          {/* Divider */}
          <div
            className={`w-full h-px mb-6 ${
              isProduct
                ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'
                : 'bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0'
            }`}
          />

          {/* Status items */}
          <div className="space-y-4 mb-6">
            {/* Player Status */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
              className={`flex items-center justify-between group/item cursor-pointer rounded-lg px-3 py-2 transition-colors ${
                isProduct
                  ? 'hover:bg-gray-50'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isProduct
                      ? 'bg-indigo-500'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                  }`}
                />
                <span
                  className={`text-sm font-mono ${
                    isProduct ? 'text-slate-600' : 'text-white/70'
                  }`}
                >
                  Player
                </span>
              </div>
              <span
                className={`text-sm font-mono transition-colors ${
                  isProduct
                    ? 'text-indigo-600 group-hover/item:text-indigo-700'
                    : 'text-blue-300 group-hover/item:text-blue-200'
                }`}
              >
                Connected
              </span>
            </motion.div>

            {/* Blockchain Status */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className={`flex items-center justify-between group/item cursor-pointer rounded-lg px-3 py-2 transition-colors ${
                isProduct
                  ? 'hover:bg-gray-50'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isProduct
                      ? 'bg-indigo-400'
                      : 'bg-gradient-to-r from-purple-400 to-pink-400'
                  }`}
                />
                <span
                  className={`text-sm font-mono ${
                    isProduct ? 'text-slate-600' : 'text-white/70'
                  }`}
                >
                  Blockchain
                </span>
              </div>
              <span
                className={`text-sm font-mono transition-colors ${
                  isProduct
                    ? 'text-indigo-600 group-hover/item:text-indigo-700'
                    : 'text-purple-300 group-hover/item:text-purple-200'
                }`}
              >
                Base Network
              </span>
            </motion.div>

            {/* Latency Status */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false }}
              className={`flex items-center justify-between group/item cursor-pointer rounded-lg px-3 py-2 transition-colors ${
                isProduct
                  ? 'hover:bg-gray-50'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isProduct
                      ? 'bg-cyan-500'
                      : 'bg-gradient-to-r from-cyan-400 to-blue-400'
                  }`}
                />
                <span
                  className={`text-sm font-mono ${
                    isProduct ? 'text-slate-600' : 'text-white/70'
                  }`}
                >
                  Latency
                </span>
              </div>
              <span
                className={`text-sm font-mono transition-colors ${
                  isProduct
                    ? 'text-cyan-600 group-hover/item:text-cyan-700'
                    : 'text-cyan-300 group-hover/item:text-cyan-200'
                }`}
              >
                24ms
              </span>
            </motion.div>
          </div>

          {/* Divider */}
          <div
            className={`w-full h-px mb-6 ${
              isProduct
                ? 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'
                : 'bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0'
            }`}
          />

          {/* Footer stats */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-center p-3 rounded-lg border transition-all ${
                isProduct
                  ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <p
                className={`text-xs font-mono mb-1 ${
                  isProduct ? 'text-slate-600' : 'text-white/50'
                }`}
              >
                Session
              </p>
              <p
                className={`text-lg font-bold ${
                  isProduct ? 'text-indigo-600' : 'text-blue-400'
                }`}
              >
                Active
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-center p-3 rounded-lg border transition-all ${
                isProduct
                  ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <p
                className={`text-xs font-mono mb-1 ${
                  isProduct ? 'text-slate-600' : 'text-white/50'
                }`}
              >
                Network
              </p>
              <p
                className={`text-lg font-bold ${
                  isProduct ? 'text-indigo-600' : 'text-purple-400'
                }`}
              >
                Secure
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-center p-3 rounded-lg border transition-all ${
                isProduct
                  ? 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
            >
              <p
                className={`text-xs font-mono mb-1 ${
                  isProduct ? 'text-slate-600' : 'text-white/50'
                }`}
              >
                Uptime
              </p>
              <p
                className={`text-lg font-bold ${
                  isProduct ? 'text-indigo-600' : 'text-pink-400'
                }`}
              >
                99.8%
              </p>
            </motion.div>
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: isProduct ? 1.02 : 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-6 px-4 py-3 rounded-lg text-white font-mono text-sm font-semibold border transition-all ${
              isProduct
                ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 shadow-sm hover:shadow-md'
                : 'bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-purple-500/50'
            }`}
          >
            View Session Details
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
