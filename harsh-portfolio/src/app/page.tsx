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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className="relative w-full overflow-x-hidden bg-white transition-colors duration-700">
      {/* Navbar */}
      <div className="relative z-50">
        <PolymorphicNavbar />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Projects Section */}
      <section className="relative z-10 w-full px-4 py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
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
