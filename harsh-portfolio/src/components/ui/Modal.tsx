'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLens } from '@/context/LensContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const { lens } = useLens();

  // Get lens-specific modal styles
  const getModalStyles = () => {
    switch (lens) {
      case 'product':
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          textPrimary: 'text-slate-900',
          textSecondary: 'text-slate-600',
          textTertiary: 'text-slate-500',
          borderLight: 'border-gray-100',
          hoverBg: 'hover:bg-gray-50',
          accentColor: 'text-indigo-600',
        };
      case 'engineering':
        return {
          bg: 'bg-slate-900',
          border: 'border-slate-700',
          textPrimary: 'text-slate-100',
          textSecondary: 'text-slate-300',
          textTertiary: 'text-slate-400',
          borderLight: 'border-slate-800',
          hoverBg: 'hover:bg-slate-800',
          accentColor: 'text-cyan-400',
        };
      case 'agentic':
        return {
          bg: 'bg-gradient-to-br from-[#0f0a1a] via-[#0a0a0f] to-[#050508] backdrop-blur-xl',
          border: 'border-violet-500/60 shadow-[0_0_40px_rgba(168,85,247,0.5)]',
          textPrimary: 'text-violet-50',
          textSecondary: 'text-violet-100',
          textTertiary: 'text-violet-300',
          borderLight: 'border-violet-500/40',
          hoverBg: 'hover:bg-violet-500/20',
          accentColor: 'text-violet-300',
        };
      default:
        return {
          bg: 'bg-white',
          border: 'border-gray-200',
          textPrimary: 'text-slate-900',
          textSecondary: 'text-slate-600',
          textTertiary: 'text-slate-500',
          borderLight: 'border-gray-100',
          hoverBg: 'hover:bg-gray-50',
          accentColor: 'text-indigo-600',
        };
    }
  };

  const styles = getModalStyles();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={`fixed inset-0 z-40 ${
              lens === 'agentic'
                ? 'bg-black/70 backdrop-blur-xl'
                : 'bg-black/50 backdrop-blur-sm'
            }`}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 ${
              lens === 'agentic' ? 'drop-shadow-2xl' : ''
            }`}
          >
            <div
              className={`${styles.bg} border ${styles.border} rounded-2xl shadow-2xl overflow-hidden transition-all duration-700 ${
                lens === 'agentic' ? 'shadow-[0_20px_60px_rgba(168,85,247,0.6)]' : ''
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-6 border-b ${styles.borderLight}`}>
                <h2 className={`text-2xl font-bold ${styles.textPrimary}`}>{title}</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-2 ${styles.hoverBg} rounded-lg transition-colors`}
                >
                  <X className={`w-5 h-5 ${styles.textTertiary}`} />
                </motion.button>
              </div>

              {/* Content */}
              <div className={`p-6 max-h-[70vh] overflow-y-auto ${styles.textPrimary}`}>
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
