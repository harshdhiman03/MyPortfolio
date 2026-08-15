'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLens, type LensType } from '@/context/LensContext';
import * as d3 from 'd3-force';
import type { SimulationNodeDatum } from 'd3-force';
import type { ForceGraphMethods, NodeObject } from 'react-force-graph-2d';
import { projects, type Project } from '@/lib/data';

const ForceGraph2D = dynamic(
  () => import('react-force-graph-2d').then((module) => module.default),
  { ssr: false },
);

type GraphNode = {
  id: string;
  group: number;
  val: number;
  proficiency?: number;
  name?: string;
  relatedProjects?: string[];
  fx?: number;
  fy?: number;
};

type GraphLink = {
  source: string;
  target: string;
};

const groupNames: Record<number, string> = {
  0: 'You',
  1: 'AI & Machine Learning',
  2: 'Cloud & Data',
  3: 'Full Stack Engineering',
  4: 'Developer Tools',
};

const skillVal = (proficiency: number) => 5 + proficiency / 8;

const graphData: { nodes: GraphNode[]; links: GraphLink[] } = {
  nodes: [
    { id: 'Me', group: 0, val: 30, name: 'Harsh Dhiman', relatedProjects: ['mestor-ai', 'foodoptima', 'hacksuraksha', 'internal-comm-tool', 'neural-translator'] },

    { id: 'AI', group: 1, val: 24, name: 'AI & Machine Learning', relatedProjects: ['mestor-ai', 'foodoptima', 'hacksuraksha', 'neural-translator', 'omnilisten'] },
    { id: 'Cloud', group: 2, val: 18, name: 'Cloud & Data', relatedProjects: ['mestor-ai'] },
    { id: 'Web', group: 3, val: 22, name: 'Full Stack Engineering', relatedProjects: ['internal-comm-tool', 'omnilisten'] },
    { id: 'Tools', group: 4, val: 16, name: 'Developer Tools', relatedProjects: ['mestor-ai', 'foodoptima', 'hacksuraksha'] },

    // AI / ML
    { id: 'Python', group: 1, val: skillVal(95), proficiency: 95, relatedProjects: ['mestor-ai', 'hacksuraksha', 'neural-translator', 'omnilisten'] },
    { id: 'TensorFlow', group: 1, val: skillVal(82), proficiency: 82, relatedProjects: ['neural-translator'] },
    { id: 'Transformers', group: 1, val: skillVal(80), proficiency: 80, relatedProjects: ['neural-translator', 'foodoptima'] },
    { id: 'LangChain', group: 1, val: skillVal(70), proficiency: 70, relatedProjects: ['mestor-ai'] },
    { id: 'LangGraph', group: 1, val: skillVal(72), proficiency: 72, relatedProjects: ['mestor-ai'] },
    { id: 'Scikit-learn', group: 1, val: skillVal(75), proficiency: 75 },
    { id: 'Pandas', group: 1, val: skillVal(92), proficiency: 92, relatedProjects: ['mestor-ai'] },
    { id: 'NumPy', group: 1, val: skillVal(90), proficiency: 90 },
    { id: 'Hugging Face', group: 1, val: skillVal(68), proficiency: 68, relatedProjects: ['hacksuraksha'] },

    // Cloud & Data
    { id: 'Azure', group: 2, val: skillVal(85), proficiency: 85, relatedProjects: ['mestor-ai'] },
    { id: 'Databricks', group: 2, val: skillVal(80), proficiency: 80 },
    { id: 'PostgreSQL', group: 2, val: skillVal(70), proficiency: 70, relatedProjects: ['omnilisten'] },
    { id: 'MongoDB', group: 2, val: skillVal(65), proficiency: 65, relatedProjects: ['internal-comm-tool'] },
    { id: 'MySQL', group: 2, val: skillVal(72), proficiency: 72 },

    // Full Stack
    { id: 'React.js', group: 3, val: skillVal(90), proficiency: 90, relatedProjects: ['internal-comm-tool'] },
    { id: 'Next.js', group: 3, val: skillVal(85), proficiency: 85, relatedProjects: ['omnilisten'] },
    { id: 'JavaScript', group: 3, val: skillVal(88), proficiency: 88, relatedProjects: ['internal-comm-tool'] },
    { id: 'TypeScript', group: 3, val: skillVal(80), proficiency: 80, relatedProjects: ['omnilisten'] },
    { id: 'Node.js', group: 3, val: skillVal(75), proficiency: 75, relatedProjects: ['internal-comm-tool'] },
    { id: 'Express.js', group: 3, val: skillVal(72), proficiency: 72, relatedProjects: ['internal-comm-tool'] },
    { id: '.NET Core', group: 3, val: skillVal(75), proficiency: 75 },
    { id: 'Tailwind CSS', group: 3, val: skillVal(92), proficiency: 92, relatedProjects: ['internal-comm-tool'] },

    // Tools
    { id: 'Git', group: 4, val: skillVal(90), proficiency: 90 },
    { id: 'Postman', group: 4, val: skillVal(70), proficiency: 70 },
    { id: 'REST APIs', group: 4, val: skillVal(85), proficiency: 85 },
    { id: 'Streamlit', group: 4, val: skillVal(88), proficiency: 88, relatedProjects: ['mestor-ai', 'foodoptima', 'hacksuraksha'] },
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
    { source: 'AI', target: 'LangChain' },
    { source: 'AI', target: 'LangGraph' },
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
    { source: 'React.js', target: 'Node.js' },
    { source: 'Python', target: 'Azure' },
    { source: 'Streamlit', target: 'Python' },
    { source: 'REST APIs', target: 'Azure' },
    { source: 'Next.js', target: 'REST APIs' },
    { source: 'Pandas', target: 'PostgreSQL' },
    { source: 'React.js', target: 'REST APIs' },
    { source: 'LangChain', target: 'Azure' },
    { source: 'LangGraph', target: 'LangChain' },
    { source: 'LangGraph', target: 'Azure' },
  ],
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

const groupColorDim: Record<number, string> = {
  0: 'rgba(148, 163, 184, 0.4)',
  1: 'rgba(168, 85, 247, 0.3)',
  2: 'rgba(59, 130, 246, 0.3)',
  3: 'rgba(6, 182, 212, 0.3)',
  4: 'rgba(16, 185, 129, 0.3)',
};

const LEGEND: { group: number; label: string; color: string }[] = [
  { group: 0, label: 'You', color: '#94a3b8' },
  { group: 1, label: 'AI & Machine Learning', color: '#a855f7' },
  { group: 2, label: 'Cloud & Data', color: '#3b82f6' },
  { group: 3, label: 'Full Stack Engineering', color: '#06b6d4' },
  { group: 4, label: 'Developer Tools', color: '#10b981' },
];

const nodeById = new Map<string, GraphNode>();
graphData.nodes.forEach((node) => nodeById.set(node.id, node));

const linkEndpoints = (link: { source?: unknown; target?: unknown }) => {
  const source =
    typeof link.source === 'object' && link.source !== null
      ? String((link.source as { id?: string }).id ?? '')
      : String(link.source ?? '');
  const target =
    typeof link.target === 'object' && link.target !== null
      ? String((link.target as { id?: string }).id ?? '')
      : String(link.target ?? '');
  return { source, target };
};

const adjacentMap = new Map<string, Set<string>>();
graphData.links.forEach((link) => {
  const { source, target } = linkEndpoints(link);
  if (!adjacentMap.has(source)) {
    adjacentMap.set(source, new Set());
  }
  if (!adjacentMap.has(target)) {
    adjacentMap.set(target, new Set());
  }
  adjacentMap.get(source)!.add(target);
  adjacentMap.get(target)!.add(source);
});

const isCrossLink = (source: string, target: string) => {
  const sourceGroup = nodeById.get(source)?.group;
  const targetGroup = nodeById.get(target)?.group;
  return sourceGroup !== undefined && targetGroup !== undefined && sourceGroup !== targetGroup;
};

const nodeRadiusFor = (node: NodeObject<GraphNode>) => {
  if (node.id === 'Me') {
    return 15;
  }
  if (node.name) {
    return 5 + Math.sqrt(node.val) * 1.6;
  }
  return 4 + (node.proficiency ?? 70) * 0.11;
};

const getPanelStyles = (lens: LensType) => {
  switch (lens) {
    case 'product':
      return {
        section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
        title: 'text-slate-900',
        subtitle: 'text-slate-600',
        tooltip: 'bg-white/95 border border-slate-200 text-slate-900 shadow-xl',
        chip: 'bg-white border border-slate-200 text-slate-800 hover:border-blue-400 hover:shadow-md',
        chipMeta: 'text-slate-400',
        panelTitle: 'text-slate-900',
        panelBody: 'text-slate-500',
      };
    case 'engineering':
      return {
        section: 'bg-slate-950 border border-slate-800',
        title: 'text-slate-100 font-mono',
        subtitle: 'text-slate-400 font-mono text-xs uppercase tracking-widest',
        tooltip: 'bg-slate-900/95 border border-cyan-500/40 text-cyan-100 shadow-xl font-mono',
        chip: 'bg-slate-900/80 border border-cyan-500/30 text-cyan-100 hover:border-cyan-300',
        chipMeta: 'text-cyan-400/70',
        panelTitle: 'text-cyan-100 font-mono',
        panelBody: 'text-slate-400 font-mono text-xs',
      };
    case 'agentic':
      return {
        section: 'bg-[#0a0a0f] border border-violet-500/25',
        title: 'text-violet-100',
        subtitle: 'text-violet-300/70',
        tooltip: 'bg-[#0d0a1a]/95 border border-violet-500/40 text-violet-100 shadow-xl',
        chip: 'bg-violet-950/60 border border-violet-500/30 text-violet-100 hover:border-violet-300',
        chipMeta: 'text-violet-300/60',
        panelTitle: 'text-violet-100',
        panelBody: 'text-violet-300/70',
      };
    default:
      return {
        section: 'bg-gradient-to-br from-slate-50 to-blue-50/70 border border-slate-200/70',
        title: 'text-slate-900',
        subtitle: 'text-slate-600',
        tooltip: 'bg-white/95 border border-slate-200 text-slate-900 shadow-xl',
        chip: 'bg-white border border-slate-200 text-slate-800 hover:border-blue-400 hover:shadow-md',
        chipMeta: 'text-slate-400',
        panelTitle: 'text-slate-900',
        panelBody: 'text-slate-500',
      };
  }
};

export const NeuralSkillGraph = () => {
  const { lens } = useLens();
  const isLight = lens === 'product';
  const panelStyles = getPanelStyles(lens);
  const router = useRouter();
  const reduceMotion = Boolean(useReducedMotion());

  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods | undefined>(undefined);
  const zoomRef = useRef(1);
  const rafRef = useRef<number | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 600 });
  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [highlightGroup, setHighlightGroup] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const hoverNode = hoverNodeId ? nodeById.get(hoverNodeId) : undefined;
  const selectedNode = selectedNodeId ? nodeById.get(selectedNodeId) : undefined;
  const selectedProjects: Project[] = (selectedNode?.relatedProjects ?? [])
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

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
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
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
        return nodeRadiusFor(graphNode) + 4;
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

  const baseLinkColor = isLight ? 'rgba(148, 163, 184, 0.4)' : 'rgba(168, 85, 247, 0.3)';
  const dimLinkColor = isLight ? 'rgba(148, 163, 184, 0.08)' : 'rgba(168, 85, 247, 0.08)';
  const activeLinkColor = isLight ? '#3b82f6' : '#a855f7';
  const crossLinkColor = isLight ? '#f59e0b' : '#fbbf24';

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (hoverNodeId === null || rafRef.current !== null) {
      return;
    }
    const clientX = event.clientX;
    const clientY = event.clientY;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
    });
  };

  const tooltipX = Math.min(mousePos.x + 14, Math.max(0, dimensions.width - 230));

  return (
    <section className={`px-6 py-16 rounded-2xl ${panelStyles.section}`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className={`text-3xl md:text-4xl font-bold ${panelStyles.title}`}>Neural Skill Graph</h2>
          <p className={`mt-2 text-sm md:text-base ${panelStyles.subtitle}`}>
            Interactive network of domain skills and technologies. Hover to inspect, click a linked node to explore
            projects.
          </p>
        </div>

        <div
          ref={containerRef}
          role="img"
          aria-label="Interactive network graph of Harsh's skills grouped into AI and machine learning, cloud and data, full stack engineering, and developer tools. Hover nodes for proficiency details and click linked nodes to view related projects."
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverNodeId(null)}
          className={`relative w-full h-[600px] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing backdrop-blur-md ${
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
                if (graphNode.id === hoverNodeId) {
                  return isLight ? '#2563eb' : '#22d3ee';
                }
                if (hoverNodeId !== null && !adjacentMap.get(hoverNodeId)?.has(graphNode.id ?? '')) {
                  return groupColorDim[graphNode.group ?? 1] ?? 'rgba(168, 85, 247, 0.3)';
                }
                if (highlightGroup !== null && graphNode.group !== highlightGroup) {
                  return groupColorDim[graphNode.group ?? 1] ?? 'rgba(168, 85, 247, 0.3)';
                }
                if (graphNode.id === 'Me') {
                  return isLight ? '#3b82f6' : '#f8fafc';
                }
                return groupColor[graphNode.group ?? 1] ?? '#a855f7';
              }}
              linkColor={(link) => {
                const { source, target } = linkEndpoints(link);
                const active =
                  hoverNodeId !== null && (source === hoverNodeId || target === hoverNodeId);
                if (active) {
                  return activeLinkColor;
                }
                const cross = isCrossLink(source, target);
                if (highlightGroup !== null) {
                  const sourceGroup = nodeById.get(source)?.group;
                  const targetGroup = nodeById.get(target)?.group;
                  const inGroup = sourceGroup === highlightGroup || targetGroup === highlightGroup;
                  if (!inGroup) {
                    return dimLinkColor;
                  }
                  return cross ? crossLinkColor : baseLinkColor;
                }
                return cross ? crossLinkColor : baseLinkColor;
              }}
              linkWidth={(link) => {
                const { source, target } = linkEndpoints(link);
                const active =
                  hoverNodeId !== null && (source === hoverNodeId || target === hoverNodeId);
                if (active) {
                  return 2.5;
                }
                return isCrossLink(source, target) ? 1.5 : 1.2;
              }}
              linkLineDash={(link) => {
                const { source, target } = linkEndpoints(link);
                return isCrossLink(source, target) ? [4, 3] : null;
              }}
              linkDirectionalParticles={(link) => {
                if (reduceMotion) {
                  return 0;
                }
                const { source, target } = linkEndpoints(link);
                const active =
                  hoverNodeId !== null && (source === hoverNodeId || target === hoverNodeId);
                if (active || isCrossLink(source, target)) {
                  return 2;
                }
                return 0;
              }}
              linkDirectionalParticleSpeed={0.006}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleColor={() => crossLinkColor}
              cooldownTicks={120}
              onEngineStop={() => {
                fgRef.current?.zoomToFit(700, 90);
              }}
              onNodeHover={(node) => {
                setHoverNodeId(node ? String(node.id ?? '') : null);
              }}
              onNodeClick={(node) => {
                const graphNode = node as NodeObject<GraphNode>;
                if (!graphNode.relatedProjects?.length) {
                  return;
                }
                setSelectedNodeId((prev) => (prev === graphNode.id ? null : String(graphNode.id)));
              }}
              onBackgroundClick={() => setSelectedNodeId(null)}
              onZoom={(transform) => {
                zoomRef.current = transform.k;
              }}
              showPointerCursor={(obj) => {
                if (!obj || typeof obj === 'string') {
                  return false;
                }
                if ('relatedProjects' in obj) {
                  return Boolean((obj as NodeObject<GraphNode>).relatedProjects?.length);
                }
                return false;
              }}
              nodeCanvasObjectMode={() => 'replace'}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const graphNode = node as NodeObject<GraphNode>;
                const label = graphNode.name || graphNode.id;
                const nodeX = graphNode.x ?? 0;
                const nodeY = graphNode.y ?? 0;
                const isMe = graphNode.id === 'Me';
                const isHub = Boolean(graphNode.name);
                const fontSize = (isMe ? 14 : isHub ? 12 : 10) / globalScale;
                ctx.font = `700 ${fontSize}px Sans-Serif`;
                const nodeRadius = nodeRadiusFor(graphNode);
                const isHovered = graphNode.id === hoverNodeId;

                if (isHovered) {
                  ctx.save();
                  ctx.shadowColor = isLight ? 'rgba(59, 130, 246, 0.8)' : 'rgba(34, 211, 238, 0.8)';
                  ctx.shadowBlur = 14;
                }

                ctx.beginPath();
                ctx.arc(nodeX, nodeY, nodeRadius, 0, 2 * Math.PI, false);
                ctx.fillStyle = isHovered
                  ? isLight
                    ? '#2563eb'
                    : '#22d3ee'
                  : isMe
                  ? isLight
                    ? '#3b82f6'
                    : '#f8fafc'
                  : groupColor[graphNode.group ?? 1] ?? '#a855f7';
                ctx.fill();

                if (isHovered) {
                  ctx.restore();
                }

                if (isMe) {
                  ctx.beginPath();
                  ctx.arc(nodeX, nodeY, nodeRadius + 3, 0, 2 * Math.PI, false);
                  ctx.strokeStyle = isLight ? '#2563eb' : '#a855f7';
                  ctx.lineWidth = 2 / globalScale;
                  ctx.stroke();
                } else if (isHub) {
                  ctx.beginPath();
                  ctx.arc(nodeX, nodeY, nodeRadius + 2, 0, 2 * Math.PI, false);
                  ctx.strokeStyle =
                    (groupColor[graphNode.group ?? 1] ?? '#a855f7') + (isLight ? '66' : '55');
                  ctx.lineWidth = 1.5 / globalScale;
                  ctx.stroke();
                }

                if (isHub || zoomRef.current >= 0.7) {
                  const alignLeft = nodeX >= 0;
                  const textDistance = nodeRadius + 6 / globalScale;
                  const textX = nodeX + (alignLeft ? textDistance : -textDistance);

                  ctx.textAlign = alignLeft ? 'left' : 'right';
                  ctx.textBaseline = 'middle';

                  if (!isMe) {
                    ctx.lineWidth = 3 / globalScale;
                    ctx.strokeStyle = isLight ? 'rgba(248, 250, 252, 0.9)' : 'rgba(2, 6, 23, 0.9)';
                    ctx.strokeText(String(label), textX, nodeY);
                  }

                  ctx.fillStyle = isLight ? '#0f172a' : '#f8fafc';
                  ctx.fillText(String(label), textX, nodeY);

                  if (graphNode.relatedProjects?.length) {
                    const underlineWidth = ctx.measureText(String(label)).width;
                    ctx.beginPath();
                    ctx.moveTo(textX, nodeY + fontSize * 0.7);
                    ctx.lineTo(textX + (alignLeft ? underlineWidth : -underlineWidth), nodeY + fontSize * 0.7);
                    ctx.strokeStyle = isLight ? '#3b82f6' : '#a855f7';
                    ctx.lineWidth = 1 / globalScale;
                    ctx.stroke();
                  }
                }
              }}
              nodePointerAreaPaint={(node, color, ctx) => {
                const graphNode = node as NodeObject<GraphNode>;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(graphNode.x ?? 0, graphNode.y ?? 0, nodeRadiusFor(graphNode), 0, 2 * Math.PI, false);
                ctx.fill();
              }}
            />
          )}

          {hoverNode && hoverNode.id !== 'Me' && (
            <div
              className={`pointer-events-none absolute z-10 w-[210px] rounded-xl border p-3 text-xs shadow-lg backdrop-blur-md ${panelStyles.tooltip}`}
              style={{ left: tooltipX, top: mousePos.y + 14 }}
            >
              <p className="font-semibold">{hoverNode.name || hoverNode.id}</p>
              <p className="mt-0.5 opacity-70">{groupNames[hoverNode.group] ?? 'Skill'}</p>
              {hoverNode.proficiency !== undefined && (
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span>Proficiency</span>
                    <span className="font-mono">{hoverNode.proficiency}%</span>
                  </div>
                  <div className={`mt-1 h-1.5 w-full rounded-full ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${hoverNode.proficiency}%`,
                        background: groupColor[hoverNode.group ?? 1] ?? '#a855f7',
                      }}
                    />
                  </div>
                </div>
              )}
              {hoverNode.relatedProjects?.length ? (
                <p className="mt-2 text-[11px] opacity-80">
                  {hoverNode.relatedProjects.length} project{hoverNode.relatedProjects.length === 1 ? '' : 's'} — click
                  to explore
                </p>
              ) : null}
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedNode && selectedProjects.length > 0 && (
            <motion.div
              key={selectedNode.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`mt-4 rounded-xl border p-4 backdrop-blur-md ${isLight ? 'border-blue-200 bg-white/70' : lens === 'engineering' ? 'border-cyan-500/20 bg-slate-900/60' : 'border-violet-500/20 bg-violet-950/40'}`}
            >
              <p className={`text-sm font-semibold ${panelStyles.panelTitle}`}>
                {selectedNode.name || selectedNode.id}
              </p>
              <p className={`mt-0.5 text-xs ${panelStyles.panelBody}`}>
                {selectedNode.id === 'Me'
                  ? `All ${selectedProjects.length} projects — select one to open the deep dive:`
                  : `Used in ${selectedProjects.length} project${selectedProjects.length === 1 ? '' : 's'} — select one to open the deep dive:`}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => router.push(`/?project=${project.id}`)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${panelStyles.chip}`}
                  >
                    <span className="font-medium">{project.title}</span>
                    <span className={`text-[10px] uppercase tracking-wider ${panelStyles.chipMeta}`}>
                      {project.category}
                    </span>
                    <ArrowUpRight size={12} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2"
          onMouseLeave={() => setHighlightGroup(null)}
        >
          {LEGEND.map((item) => (
            <button
              key={item.label}
              type="button"
              onMouseEnter={() => setHighlightGroup(item.group)}
              onClick={() => setHighlightGroup((prev) => (prev === item.group ? null : item.group))}
              className={`flex items-center gap-2 text-xs font-medium transition-opacity ${
                highlightGroup !== null && highlightGroup !== item.group ? 'opacity-40' : 'opacity-100'
              } ${isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'}`}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: item.color }}
                aria-hidden="true"
              />
              {item.label}
            </button>
          ))}
          <span
            className={`hidden md:inline ml-auto text-[11px] ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Hover a legend chip to focus a domain · Dashed links are cross-domain connections
          </span>
        </div>
      </div>
    </section>
  );
};