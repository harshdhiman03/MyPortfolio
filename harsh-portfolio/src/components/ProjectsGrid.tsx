'use client';

import React from 'react';
import { ProjectCard } from './ProjectCard';
import { projects, Project } from '@/lib/data';

interface ProjectsGridProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid = ({ onSelectProject }: ProjectsGridProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {projects.map((project, index) => (
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
