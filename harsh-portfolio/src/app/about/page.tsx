'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens, LensType } from '@/context/LensContext';
import { PolymorphicNavbar } from '@/components/ui/PolymorphicNavbar';
import { NeuralSkillGraph } from '@/components/about/NeuralSkillGraph';
import { CircuitTimeline } from '@/components/about/CircuitTimeline';
import { ResearchLab } from '@/components/about/ResearchLab';
import { LensToggle } from '@/components/ui/LensToggle';

const PARTICLE_FIELD = [
  { left: '4%', top: '12%', size: 2, duration: 10 },
  { left: '12%', top: '78%', size: 3, duration: 14 },
  { left: '18%', top: '36%', size: 2, duration: 11 },
  { left: '24%', top: '64%', size: 2, duration: 13 },
  { left: '31%', top: '20%', size: 3, duration: 15 },
  { left: '39%', top: '82%', size: 2, duration: 10 },
  { left: '46%', top: '47%', size: 2, duration: 12 },
  { left: '52%', top: '9%', size: 3, duration: 14 },
  { left: '59%', top: '71%', size: 2, duration: 11 },
  { left: '66%', top: '32%', size: 2, duration: 13 },
  { left: '73%', top: '86%', size: 3, duration: 16 },
  { left: '81%', top: '18%', size: 2, duration: 12 },
  { left: '88%', top: '58%', size: 2, duration: 13 },
  { left: '94%', top: '28%', size: 3, duration: 15 },
];

const AgenticParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_FIELD.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}-${index}`}
          className="absolute rounded-full bg-violet-300/50"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: '0 0 12px rgba(167,139,250,0.7)',
          }}
          animate={{
            y: [0, -24, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.25,
          }}
        />
      ))}
    </div>
  );
};

export default function AboutPage() {
  const { lens, setLens } = useLens();
  const initialLensRef = useRef<LensType | null>(null);

  useEffect(() => {
    initialLensRef.current = lens;

    if (lens === 'product') {
      setLens('agentic');
    }

    return () => {
      if (initialLensRef.current) {
        setLens(initialLensRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPageStyles = () => {
    switch (lens) {
      case 'product':
        return {
          page: 'bg-gradient-to-b from-white via-slate-50 to-white text-slate-900',
          headline: 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
          subtext: 'text-lg md:text-xl lg:text-2xl text-slate-600',
        };
      case 'engineering':
        return {
          page: 'bg-slate-950 text-slate-100',
          headline: 'text-6xl md:text-7xl lg:text-8xl font-bold font-mono tracking-tight',
          subtext: 'text-lg md:text-xl lg:text-2xl text-slate-400 font-mono',
        };
      case 'agentic':
        return {
          page: 'bg-[#05050a] text-violet-100',
          headline: 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
          subtext: 'text-lg md:text-xl lg:text-2xl text-violet-300/80',
        };
      default:
        return {
          page: 'bg-[#05050a] text-violet-100',
          headline: 'text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight',
          subtext: 'text-lg md:text-xl lg:text-2xl text-violet-300/80',
        };
    }
  };

  const getHeroContent = () => {
    switch (lens) {
      case 'product':
        return {
          headline: 'I build experiences that matter.',
          subtext:
            'Focusing on user-centric design, seamless interfaces, and solving real human problems through technology.',
        };
      case 'engineering':
        return {
          headline: 'I architect scalable systems.',
          subtext:
            'From Azure pipelines to low-latency backends, I build the foundations that keep complex applications running.',
        };
      case 'agentic':
        return {
          headline: 'I explore intelligent systems.',
          subtext:
            'Researching NLP, fine-tuning Transformers, and building autonomous AI agents that reason and act.',
        };
      default:
        return {
          headline: 'I explore intelligent systems.',
          subtext:
            'Researching NLP, fine-tuning Transformers, and building autonomous AI agents that reason and act.',
        };
    }
  };

  const styles = getPageStyles();
  const heroContent = getHeroContent();

  return (
    <main className={`relative w-full min-h-screen overflow-x-hidden transition-colors duration-700 ${styles.page}`}>
      {/* Agentic particles background */}
      {lens === 'agentic' && <AgenticParticles />}

      {/* Engineering grid background */}
      {lens === 'engineering' && (
        <div
          className="pointer-events-none fixed inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      )}

      {/* Navbar */}
      <div className="relative z-50">
        <PolymorphicNavbar />
      </div>

      {/* Dynamic Hero Section */}
      <section className="relative z-10 w-full min-h-[40vh] flex items-center justify-center px-6 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={lens}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className={`${styles.headline}`}>{heroContent.headline}</h1>
              <p className={`${styles.subtext} max-w-3xl mx-auto leading-relaxed`}>
                {heroContent.subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* NeuralSkillGraph - Full Width */}
      <section className="relative z-10 w-full">
        <NeuralSkillGraph />
      </section>

      {/* CircuitTimeline */}
      <section className="relative z-10 w-full px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <CircuitTimeline />
        </div>
      </section>

      {/* ResearchLab */}
      <section className="relative z-10 w-full px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <ResearchLab />
        </div>
      </section>

      {/* Lens Toggle */}
      <LensToggle />
    </main>
  );
}
