'use client';

import { useState } from 'react';
import { useLens } from '@/context/LensContext';
import { PolymorphicNavbar } from '@/components/ui/PolymorphicNavbar';
import { Hero } from '@/components/Hero';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectDetailModal } from '@/components/projects/ProjectModalContent';
import { LensToggle } from '@/components/ui/LensToggle';
import type { Project } from '@/lib/data';

export default function HomePage() {
  const { lens } = useLens();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get polymorphic styling based on lens
  const getPageStyles = () => {
    switch (lens) {
      case 'product':
        return {
          wrapper: 'bg-slate-50 text-slate-900',
          projectSection: 'bg-gradient-to-b from-slate-50 to-white',
        };
      case 'engineering':
        return {
          wrapper: 'bg-slate-950 text-slate-300 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] [background-size:24px_24px]',
          projectSection: 'bg-slate-900',
        };
      case 'agentic':
        return {
          wrapper: 'bg-[#0a0514] text-purple-100 [background-image:radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0514] to-[#0a0514]',
          projectSection: 'bg-[#0a0514]',
        };
      default:
        return {
          wrapper: 'bg-slate-50 text-slate-900',
          projectSection: 'bg-gradient-to-b from-slate-50 to-white',
        };
    }
  };

  const styles = getPageStyles();

  return (
    <main className={`relative w-full overflow-x-hidden transition-colors duration-700 ${styles.wrapper}`}>
      {/* Navbar */}
      <div className="relative z-50">
        <PolymorphicNavbar />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section id="projects" className={`relative z-10 w-full px-4 py-16 md:py-24 ${styles.projectSection}`}>
        <div className="max-w-7xl mx-auto">
          <ProjectGrid onSelectProject={setSelectedProject} />
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Lens Toggle */}
      <LensToggle />
    </main>
  );
}
