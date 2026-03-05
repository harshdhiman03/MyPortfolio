'use client';

import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projects, Project } from '@/lib/data';
import { useLens } from '@/context/LensContext';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid = ({ onSelectProject }: ProjectsGridProps) => {
  const { lens } = useLens();
  const visibleProjects = projects.filter((project) => project.content[lens] !== undefined);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {visibleProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </div>
  );
};
