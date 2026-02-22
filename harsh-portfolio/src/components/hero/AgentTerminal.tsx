'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TERMINAL_LOGS = [
  '> Initializing T5-Base model...',
  '> Loading weights from Hugging Face...',
  '> Vector DB Connection: Success (Pinecone)',
  '> Input: \'Summarize financial report\'',
  '> Tokenizing... [====================] 100%',
  '> Output: \'Market trends show 38% growth in AI sector...\'',
];

export const AgentTerminal = () => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LOGS.length) return;

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  // Reset animation when component mounts
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setVisibleLines(0);
    }, TERMINAL_LOGS.length * 800 + 3000);

    return () => clearTimeout(resetTimer);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Terminal Window Container */}
      <div className="bg-slate-950 rounded-lg shadow-2xl overflow-hidden border border-slate-800">
        {/* Top Bar (MacOS style) */}
        <div className="bg-slate-900 px-4 py-3 flex items-center gap-2 border-b border-slate-800">
          {/* Traffic light dots */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2">
            agent-terminal — bash
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm min-h-80 bg-slate-950">
          <div className="space-y-2">
            {TERMINAL_LOGS.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  index < visibleLines
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                className="text-green-400"
              >
                <TypingText text={log} shouldAnimate={index < visibleLines} />
              </motion.div>
            ))}

            {/* Blinking cursor */}
            {visibleLines < TERMINAL_LOGS.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                className="text-green-400 inline-block"
              >
                _
              </motion.div>
            )}

            {/* Completion message */}
            {visibleLines >= TERMINAL_LOGS.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-green-400 mt-4 text-xs text-slate-500"
              >
                Process completed successfully ✓
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for character-by-character typing effect
interface TypingTextProps {
  text: string;
  shouldAnimate: boolean;
}

const TypingText = ({ text, shouldAnimate }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText('');
      return;
    }

    let currentIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, shouldAnimate]);

  return <span>{displayedText}</span>;
};
