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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

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

      if (!response.ok) throw new Error('Failed to get response');

      let assistantContent = '';
      let toolCallLens: 'product' | 'engineering' | 'agentic' | null = null;
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process complete lines in the buffer
          const lines = buffer.split('\n');
          
          // Keep the last potentially incomplete line in buffer for next iteration
          buffer = lines[lines.length - 1];

          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Parse each line which contains structured data
            // Format is: {"type":"...", ...}
            try {
              // Extract JSON from the line (might have prefix like '0:')
              const jsonMatch = line.match(/(\{.*\})/);
              if (!jsonMatch) continue;

              const jsonData = JSON.parse(jsonMatch[1]);

              // Handle different event types from the UI message stream
              if (jsonData.type === 'text') {
                // Regular text content
                assistantContent += jsonData.text || '';
              } else if (jsonData.type === 'tool-call') {
                // Tool call event
                if (jsonData.toolName === 'switchLens' && jsonData.input?.lens) {
                  toolCallLens = jsonData.input.lens;
                }
              } else if (jsonData.type === 'tool-result') {
                // Tool result event - another place where lens might be confirmed
                if (jsonData.toolName === 'switchLens' && jsonData.result?.lens) {
                  toolCallLens = jsonData.result.lens;
                }
              }
            } catch {
              // If line isn't valid JSON or doesn't match pattern, ignore it
              // The stream format might be different than expected
            }
          }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
          try {
            const jsonMatch = buffer.match(/(\{.*\})/);
            if (jsonMatch) {
              const jsonData = JSON.parse(jsonMatch[1]);
              if (jsonData.type === 'text') {
                assistantContent += jsonData.text || '';
              } else if (jsonData.type === 'tool-call' && jsonData.toolName === 'switchLens') {
                toolCallLens = jsonData.input?.lens;
              }
            }
          } catch {
            // Ignore parse errors for remaining buffer
          }
        }
      }

      const cleanContent = assistantContent.trim();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: cleanContent || 'I\'ve updated the portfolio view for you.',
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // If a lens switch was requested, execute it
      if (toolCallLens) {
        // Use a small delay to let the UI update first
        setTimeout(() => {
          options.onLensSwitch?.(toolCallLens);
        }, 300);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, input, handleInputChange, handleSubmit, isLoading };
};

export const AgentChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setLens } = useLens();
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

  const handleSuggestionClick = (suggestion: string) => {
    const event = {
      preventDefault: () => {},
    } as React.FormEvent;

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
      handleSubmit(submitEvent);
    }, 0);
  };

  const showSuggestions = messages.length === 0;

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-8 z-30 p-4 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-purple-500/50 transition-all backdrop-blur-md border border-white/20"
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
            className="fixed bottom-40 right-8 z-30 w-96 max-h-[600px] bg-gradient-to-br from-slate-900/95 to-slate-950/95 border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-purple-600/30 to-blue-600/30">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-bold text-lg">Ask My Digital Twin</h3>
              </div>
              <p className="text-xs text-white/60">Powered by AI</p>
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
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                        : 'bg-white/10 text-white/90 border border-white/20 rounded-bl-none backdrop-blur-sm'
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
                handleSubmit(e);
              }}
              className="p-4 border-t border-white/10 bg-slate-950/80 backdrop-blur-sm"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 text-sm disabled:opacity-50 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
