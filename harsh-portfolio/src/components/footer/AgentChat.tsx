'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X } from 'lucide-react';
import { useLens } from '@/context/LensContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTION_PROMPTS = [
  'Tell me about your Infosys work.',
  'How do you use Agentic AI?',
  'What is your tech stack?',
];

const MAX_QUERIES = 8;

// Custom useChat hook
const useChat = (options: { api: string; onLensSwitch?: (lens: 'product' | 'engineering' | 'agentic') => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<boolean> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return false;

    const userMessage = input.trim();
    setInput('');
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(options.api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, newUserMessage],
        }),
      });

      if (!response.ok) {
        let errorPayload: { error?: string } | null = null;
        try {
          errorPayload = await response.json();
        } catch {
          // ignore JSON parse errors for failed responses
        }

        const errorText =
          errorPayload?.error || `Request failed with status ${response.status}`;

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `Error: ${errorText}`,
          },
        ]);
        return false;
      }

      const data = await response.json();
      console.log('=== RAW API RESPONSE ===', data);
      const apiMessage = typeof data?.message === 'string' ? data.message : '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: apiMessage || 'Failed to parse API message.',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Execute UI action if requested by backend
      if (
        data?.action &&
        data.action.type === 'switchLens' &&
        (data.action.payload === 'product' ||
          data.action.payload === 'engineering' ||
          data.action.payload === 'agentic')
      ) {
        // Use a small delay to let the UI update first
        setTimeout(() => {
          options.onLensSwitch?.(data.action.payload);
        }, 300);
      }
      return true;
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, handleInputChange, handleSubmit, isLoading };
};

export const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const { lens, setLens } = useLens();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      onLensSwitch: (lens) => {
        setLens(lens);
      },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedCount = localStorage.getItem('chatQueryCount');
    if (!savedCount) return;
    const parsed = Number.parseInt(savedCount, 10);
    if (!Number.isNaN(parsed)) {
      setQueryCount(parsed);
    }
  }, []);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-agent-chat', handleOpenChat);
    return () => window.removeEventListener('open-agent-chat', handleOpenChat);
  }, []);

  const incrementQueryCount = () => {
    setQueryCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem('chatQueryCount', newCount.toString());
      return newCount;
    });
  };

  const limitReached = queryCount >= MAX_QUERIES;

  const handleLimitedSubmit = async (e: React.FormEvent) => {
    if (limitReached) {
      e.preventDefault();
      return;
    }
    const sent = await handleSubmit(e);
    if (sent) {
      incrementQueryCount();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (limitReached || isLoading) return;

    // Set input and submit
    const mockEvent = {
      target: {
        value: suggestion,
      } as any,
    } as any;

    handleInputChange(mockEvent);

    // Create a synthetic form submit
    setTimeout(() => {
      const submitEvent = {
        preventDefault: () => {},
      } as React.FormEvent;
      void handleLimitedSubmit(submitEvent);
    }, 0);
  };

  const showSuggestions = messages.length === 0;
  const fabThemes = {
    product: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/40 text-white',
    engineering: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-500/40 text-white',
    agentic: 'bg-fuchsia-600 hover:bg-fuchsia-700 shadow-fuchsia-500/40 text-white',
  };
  const currentFabTheme = fabThemes[lens] || fabThemes.product;
  const chatThemes = {
    product: {
      header: 'bg-indigo-600 text-white',
      userBubble: 'bg-indigo-600 text-white',
      aiBubble: 'bg-slate-100 text-slate-800 border-slate-200',
      sendBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      focusRing: 'focus:ring-indigo-500',
    },
    engineering: {
      header: 'bg-slate-900 border-b border-cyan-500/30 text-cyan-400',
      userBubble: 'bg-cyan-900/40 border border-cyan-500/30 text-cyan-100',
      aiBubble: 'bg-slate-800 border-slate-700 text-slate-300',
      sendBtn: 'bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 border border-cyan-500/30',
      focusRing: 'focus:ring-cyan-500',
    },
    agentic: {
      header: 'bg-fuchsia-950/80 border-b border-fuchsia-500/30 text-fuchsia-400',
      userBubble: 'bg-fuchsia-900/40 border border-fuchsia-500/30 text-fuchsia-100',
      aiBubble: 'bg-slate-900 border-slate-800 text-slate-300',
      sendBtn: 'bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-fuchsia-400 border border-fuchsia-500/30',
      focusRing: 'focus:ring-fuchsia-500',
    },
  };
  const theme = chatThemes[lens] || chatThemes.product;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all z-50 backdrop-blur-md border border-white/20 ${currentFabTheme}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] flex flex-col z-50 bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className={`p-4 ${theme.header}`}>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-bold text-lg">Ask My Digital Twin</h3>
              </div>
              <p className="text-xs opacity-70">Powered by AI</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-900/50 to-slate-950/50">
              {/* Welcome message if no messages */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <p className="text-white/70 text-sm font-mono">
                    Hi! I'm Harsh's digital twin. Ask me anything about his work, projects, or experience.
                  </p>
                </motion.div>
              )}

              {/* Messages */}
              {messages.map((msg: Message, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                      msg.role === 'user'
                        ? `${theme.userBubble} rounded-br-none`
                        : `${theme.aiBubble} border rounded-bl-none backdrop-blur-sm`
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white/60 px-4 py-2 rounded-xl text-sm border border-white/20">
                    <span className="inline-flex gap-1">
                      <span className="animate-bounce">•</span>
                      <span className="animate-bounce delay-100">•</span>
                      <span className="animate-bounce delay-200">•</span>
                    </span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <AnimatePresence>
              {showSuggestions && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-3 border-t border-white/10 space-y-2 bg-gradient-to-b from-transparent to-slate-900/50"
                >
                  <p className="text-xs text-white/50 font-mono uppercase">Suggestions</p>
                  <div className="space-y-2">
                    {SUGGESTION_PROMPTS.map((prompt, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSuggestionClick(prompt)}
                        className="w-full px-3 py-2 text-xs text-left bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white/70 hover:text-white/90 transition-all font-mono"
                      >
                        → {prompt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLimitedSubmit(e);
              }}
              className="p-4 border-t border-white/10 bg-slate-950/80 backdrop-blur-sm"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder={limitReached ? 'Limit reached. Please use the contact form.' : 'Ask something...'}
                  disabled={isLoading || limitReached}
                  className={`flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 text-sm disabled:opacity-50 transition-all ${theme.focusRing}`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !input.trim() || limitReached}
                  className={`p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all ${theme.sendBtn}`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
