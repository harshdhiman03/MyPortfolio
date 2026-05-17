'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useLens, type LensType } from '@/context/LensContext';
import * as d3 from 'd3-force';
import type { SimulationNodeDatum } from 'd3-force';
import type { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';

const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then((module) => module.default),
  { ssr: false },
);

type GraphNode = {
  id: string;
  group: number;
  val: number;
  name?: string;
  fx?: number;
  fy?: number;
};

type GraphLink = {
  source: string;
  target: string;
};

const graphData: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'Me', group: 0, val: 30, name: 'Harsh Dhiman' },

    { id: 'AI', group: 1, val: 22, name: 'AI & Machine Learning' },
    { id: 'Cloud', group: 2, val: 18, name: 'Cloud & Data' },
    { id: 'Web', group: 3, val: 22, name: 'Full Stack Engineering' },
    { id: 'Tools', group: 4, val: 16, name: 'Developer Tools' },

    // AI / ML
    { id: 'Python', group: 1, val: 10 },
    { id: 'TensorFlow', group: 1, val: 10 },
    { id: 'Transformers', group: 1, val: 10 },
    { id: 'OpenCV', group: 1, val: 10 },
    { id: 'Scikit-learn', group: 1, val: 10 },
    { id: 'Pandas', group: 1, val: 10 },
    { id: 'NumPy', group: 1, val: 10 },
    { id: 'Hugging Face', group: 1, val: 10 },

    // Cloud & Data
    { id: 'Azure', group: 2, val: 10 },
    { id: 'Databricks', group: 2, val: 10 },
    { id: 'PostgreSQL', group: 2, val: 10 },
    { id: 'MongoDB', group: 2, val: 10 },
    { id: 'MySQL', group: 2, val: 10 },

    // Full Stack
    { id: 'React.js', group: 3, val: 10 },
    { id: 'Next.js', group: 3, val: 10 },
    { id: 'JavaScript', group: 3, val: 10 },
    { id: 'TypeScript', group: 3, val: 10 },
    { id: 'Node.js', group: 3, val: 10 },
    { id: 'Express.js', group: 3, val: 10 },
    { id: '.NET Core', group: 3, val: 10 },
    { id: 'Tailwind CSS', group: 3, val: 10 },

    // Tools
    { id: 'Git', group: 4, val: 10 },
    { id: 'Postman', group: 4, val: 10 },
    { id: 'REST APIs', group: 4, val: 10 },
    { id: 'Streamlit', group: 4, val: 10 }
  ],

  links: [
    { source: 'Me', target: 'AI' },
    { source: 'Me', target: 'Cloud' },
    { source: 'Me', target: 'Web' },
    { source: 'Me', target: 'Tools' },

    // AI
    { source: 'AI', target: 'Python' },
    { source: 'AI', target: 'TensorFlow' },
    { source: 'AI', target: 'Transformers' },
    { source: 'AI', target: 'OpenCV' },
    { source: 'AI', target: 'Scikit-learn' },
    { source: 'AI', target: 'Pandas' },
    { source: 'AI', target: 'NumPy' },
    { source: 'AI', target: 'Hugging Face' },

    // Cloud
    { source: 'Cloud', target: 'Azure' },
    { source: 'Cloud', target: 'Databricks' },
    { source: 'Cloud', target: 'PostgreSQL' },
    { source: 'Cloud', target: 'MongoDB' },
    { source: 'Cloud', target: 'MySQL' },

    // Web
    { source: 'Web', target: 'React.js' },
    { source: 'Web', target: 'Next.js' },
    { source: 'Web', target: 'JavaScript' },
    { source: 'Web', target: 'TypeScript' },
    { source: 'Web', target: 'Node.js' },
    { source: 'Web', target: 'Express.js' },
    { source: 'Web', target: '.NET Core' },
    { source: 'Web', target: 'Tailwind CSS' },

    // Tools
    { source: 'Tools', target: 'Git' },
    { source: 'Tools', target: 'Postman' },
    { source: 'Tools', target: 'REST APIs' },
    { source: 'Tools', target: 'Streamlit' },

    // Cross connections
    { source: 'Python', target: 'Databricks' },
    { source: 'Python', target: 'AI' },
    { source: 'React.js', target: 'Node.js' }
  ]
};

const meNode = graphData.nodes.find((node) => node.id === 'Me');
if (meNode) {
  meNode.fx = 0;
  meNode.fy = 0;
}

const groupColor: Record<number, string> = {
  0: '#f8fafc',
  1: '#a855f7',
  2: '#3b82f6',
  3: '#06b6d4',
  4: '#10b981',
};

const getPanelStyles = (lens: LensType) => {
  switch (lens) {
    case 'product':
      return {
        section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
        title: 'text-slate-900',
        subtitle: 'text-slate-600',
      };
    case 'engineering':
      return {
        section: 'bg-slate-950 border border-slate-800',
        title: 'text-slate-100 font-mono',
        subtitle: 'text-slate-400 font-mono text-xs uppercase tracking-widest',
      };
    case 'agentic':
      return {
        section: 'bg-[#0a0a0f] border border-violet-500/25',
        title: 'text-violet-100',
        subtitle: 'text-violet-300/70',
      };
    default:
      return {
        section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
        title: 'text-slate-900',
        subtitle: 'text-slate-600',
      };
  }
};

export const NeuralSkillGraph = () => {
  const { lens } = useLens();
  const isLight = lens === 'product';
  const panelStyles = getPanelStyles(lens);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      setDimensions({
        width: rect.width,
        height: rect.height,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!fgRef.current) {
      return;
    }

    const d3Graph = fgRef.current.d3Force.bind(fgRef.current);

    d3Graph('charge', d3.forceManyBody().strength(-300));

    d3Graph(
      'collide',
      d3.forceCollide().radius((node: SimulationNodeDatum) => {
        const graphNode = node as NodeObject<GraphNode>;
        return graphNode.id === 'Me' ? 20 : 10;
      }),
    );

    d3Graph(
      'radial',
      d3.forceRadial((node: SimulationNodeDatum) => {
        const graphNode = node as NodeObject<GraphNode>;
        if (graphNode.id === 'Me') {
          return 0;
        }

        if (graphNode.group && graphNode.group >= 1 && graphNode.group <= 4 && graphNode.name) {
          return 80;
        }

        return 160;
      }).strength(0.8),
    );

    const linkForce = d3Graph('link');
    if (linkForce && 'distance' in linkForce && typeof linkForce.distance === 'function') {
      linkForce.distance((link: { source?: { id?: string } | string; target?: { id?: string } | string }) => {
        const sourceId =
          typeof link.source === 'object' && link.source !== null
            ? String(link.source.id ?? '')
            : String(link.source ?? '');
        const targetId =
          typeof link.target === 'object' && link.target !== null
            ? String(link.target.id ?? '')
            : String(link.target ?? '');

        if (sourceId === 'Me' || targetId === 'Me') {
          return 80;
        }

        return 80;
      });
    }

    fgRef.current.d3ReheatSimulation();
  }, []);

  return (
    <section className={`px-6 py-16 rounded-2xl ${panelStyles.section}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${panelStyles.title}`}>Neural Skill Graph</h2>
          <p className={`mt-2 text-sm md:text-base ${panelStyles.subtitle}`}>
            Interactive network of domain skills and technologies.
          </p>
        </div>

        <div
          ref={containerRef}
          className={`w-full h-[600px] rounded-xl overflow-hidden relative cursor-grab active:cursor-grabbing backdrop-blur-md ${
            isLight ? 'border border-slate-300/70 bg-white/45' : 'border border-purple-500/20 bg-black/40'
          }`}
        >
          <div
            className={`pointer-events-none absolute inset-0 ${
              isLight
                ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(148,163,184,0.16),transparent_45%)]'
                : 'bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.2),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(6,182,212,0.16),transparent_45%)]'
            }`}
          />

          {dimensions.width > 0 && (
            <ForceGraph2D
              ref={fgRef}
              graphData={graphData}
              width={dimensions.width}
              height={dimensions.height}
              backgroundColor="rgba(0,0,0,0)"
              nodeRelSize={4}
              nodeVal="val"
              nodeColor={(node) => {
                const graphNode = node as NodeObject<GraphNode>;
                return groupColor[graphNode.group ?? 1] ?? '#a855f7';
              }}
              linkColor={() => (isLight ? 'rgba(148, 163, 184, 0.4)' : 'rgba(168, 85, 247, 0.3)')}
              linkWidth={1.5}
              linkDirectionalParticles={2}
              linkDirectionalParticleSpeed={0.005}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleColor={() => (isLight ? '#3b82f6' : '#a855f7')}
              cooldownTicks={120}
              onEngineStop={() => {
                fgRef.current?.zoomToFit(700, 90);
              }}
              nodeCanvasObjectMode={() => 'replace'}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const graphNode = node as NodeObject<GraphNode> & { color?: string };
                const label = graphNode.name || graphNode.id;
                const nodeX = graphNode.x ?? 0;
                const nodeY = graphNode.y ?? 0;
                const fontSize = (graphNode.id === 'Me' ? 14 : 10) / globalScale;
                ctx.font = `700 ${fontSize}px Sans-Serif`;
                const nodeRadius = graphNode.id === 'Me' ? 8 : 4;

                ctx.beginPath();
                ctx.arc(nodeX, nodeY, nodeRadius, 0, 2 * Math.PI, false);
                ctx.fillStyle = graphNode.color || (isLight ? '#3b82f6' : '#06b6d4');
                ctx.fill();

                const angle = Math.atan2(nodeY, nodeX);
                const textDistance = nodeRadius + 6 / globalScale;
                const textX = nodeX + Math.cos(angle) * textDistance;
                const textY = nodeY + Math.sin(angle) * textDistance;

                ctx.textAlign = Math.abs(angle) > Math.PI / 2 ? 'right' : 'left';
                ctx.textBaseline = 'middle';
                ctx.lineWidth = 3 / globalScale;
                ctx.strokeStyle = isLight ? 'rgba(248, 250, 252, 0.9)' : 'rgba(2, 6, 23, 0.9)';
                ctx.strokeText(String(label), textX, textY);

                ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
                ctx.fillText(String(label), textX, textY);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
