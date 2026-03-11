'use client';

import React, { FormEvent, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLens } from '@/context/LensContext';
import { usePathname, useSearchParams } from 'next/navigation';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const themeMap = {
  product: {
    glow: 'bg-indigo-500/20',
    buttonGradient: 'from-indigo-500 to-blue-600',
    focusRing: 'focus:ring-indigo-500/50 focus:border-indigo-500/50',
  },
  engineering: {
    glow: 'bg-cyan-500/20',
    buttonGradient: 'from-cyan-500 to-blue-500',
    focusRing: 'focus:ring-cyan-500/50 focus:border-cyan-500/50',
  },
  agentic: {
    glow: 'bg-fuchsia-600/20',
    buttonGradient: 'from-fuchsia-500 to-purple-600',
    focusRing: 'focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50',
  },
};

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const { lens } = useLens();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [queryContext, setQueryContext] = useState('');
  const theme = themeMap[lens] || themeMap.product;

  useEffect(() => {
    if (!isOpen) {
      setStatus('idle');
      return;
    }

    const query = searchParams.toString();
    const context = `path=${pathname}; lens=${lens}${query ? `; query=${query}` : ''}`;
    setQueryContext(context);
  }, [isOpen, lens, pathname, searchParams]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      formRef.current.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-lg bg-slate-900/70 backdrop-blur-3xl border border-slate-700/50 shadow-[0_0_80px_-20px_rgba(0,0,0,0.5)] rounded-3xl p-8 sm:p-10 relative overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div
              className={`absolute -top-20 -left-20 w-64 h-64 blur-[80px] rounded-full pointer-events-none ${theme.glow}`}
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 rounded-full p-2 transition-all"
              aria-label="Close contact modal"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
              
            </button>

            <div className="relative z-10">
              <h2 className="text-3xl font-semibold tracking-tight text-white mb-2">
                Thanks for contacting.
              </h2>
              <p className="text-sm text-slate-400 mb-8">
                Share a quick note and I&apos;ll get back to you.
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="context" value={queryContext} />

                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-medium tracking-wider text-slate-400 uppercase mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 ${theme.focusRing}`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-medium tracking-wider text-slate-400 uppercase mb-2 block"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 ${theme.focusRing}`}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-medium tracking-wider text-slate-400 uppercase mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell me about your idea..."
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:bg-white/10 transition-all duration-300 resize-none min-h-[120px] ${theme.focusRing}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full relative overflow-hidden rounded-xl p-[1px] group mt-4 transition-opacity ${
                    status === 'success'
                      ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                      : `bg-gradient-to-r ${theme.buttonGradient}`
                  } ${status === 'loading' || status === 'success' ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="w-full px-4 py-3 rounded-xl bg-slate-950/50 backdrop-blur-sm group-hover:bg-transparent transition-all duration-300 flex items-center justify-center text-white font-medium tracking-wide gap-2">
                    {status === 'loading' && (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-30"
                        />
                        <path
                          d="M22 12a10 10 0 0 0-10-10"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                    {status === 'loading'
                      ? 'Sending...'
                      : status === 'success'
                      ? 'Message Sent \u2713'
                      : 'Send Message'}
                  </div>
                </button>

                {status === 'error' && (
                  <p className="text-xs text-rose-300">
                    Couldn&apos;t send your message. Please verify EmailJS keys and try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
