'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Project, EngineeringContent } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

type ArchitectureFlow = EngineeringContent['architectureFlow'];
type ArchitectureNode = ArchitectureFlow['nodes'][number];
type ArchitectureEdge = ArchitectureFlow['edges'][number];

type FlowSegment = {
  groupId?: string;
  nodes: ArchitectureNode[];
};

const buildFlowSegments = (nodes: ArchitectureNode[]): FlowSegment[] => {
  const segments: FlowSegment[] = [];

  nodes.forEach((node) => {
    const lastSegment = segments[segments.length - 1];

    if (lastSegment && lastSegment.groupId === node.groupId) {
      lastSegment.nodes.push(node);
      return;
    }

    segments.push({
      groupId: node.groupId,
      nodes: [node],
    });
  });

  return segments;
};

const ArchitectureNodeCard = ({ node }: { node: ArchitectureNode }) => (
  <div className="w-40 h-24 bg-blue-950/40 border-2 border-blue-500/50 rounded flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(59,130,246,0.15)] z-10 relative">
    <div className="text-blue-100 font-bold text-sm px-2">{node.title}</div>
    <div className="text-blue-400/70 text-xs mt-1 px-2">{node.tech}</div>
  </div>
);

const ArchitectureConnector = ({ edge }: { edge?: ArchitectureEdge }) => (
  <div className="relative w-24 h-16 flex-shrink-0">
    <div className="absolute left-0 right-2 top-1/2 -translate-y-1/2 border-t border-dashed border-blue-500/70" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-blue-400/90" />
    <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-blue-500 whitespace-nowrap">
      {edge?.labelTop ?? ''}
    </div>
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-blue-500 whitespace-nowrap">
      {edge?.labelBottom ?? ''}
    </div>
  </div>
);

const ArchitectureDiagram = ({ flow }: { flow: ArchitectureFlow }) => {
  const edgeLookup = new Map(
    flow.edges.map((edge) => [`${edge.fromId}->${edge.toId}`, edge] as const),
  );
  const groupLookup = new Map(flow.groups.map((group) => [group.id, group.title] as const));
  const segments = buildFlowSegments(flow.nodes);

  const getEdge = (fromId: string, toId: string) => edgeLookup.get(`${fromId}->${toId}`);

  const renderSegment = (segment: FlowSegment) => {
    const segmentContent = (
      <div className="flex flex-row items-center justify-center gap-12">
        {segment.nodes.map((node, index) => {
          const nextNode = segment.nodes[index + 1];
          return (
            <React.Fragment key={node.id}>
              <ArchitectureNodeCard node={node} />
              {nextNode && <ArchitectureConnector edge={getEdge(node.id, nextNode.id)} />}
            </React.Fragment>
          );
        })}
      </div>
    );

    if (!segment.groupId) {
      return segmentContent;
    }

    return (
      <div className="border border-dashed border-blue-700/50 bg-blue-900/10 p-6 rounded-lg relative">
        <span className="text-blue-500 text-xs absolute -top-3 right-4 bg-[#030b14] px-2">
          {groupLookup.get(segment.groupId) ?? segment.groupId}
        </span>
        {segmentContent}
      </div>
    );
  };

  return (
    <div className="bg-[#030b14] border border-blue-900/50 rounded-xl p-8 relative overflow-x-auto">
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 min-w-max">
        <div className="flex flex-row items-center justify-center gap-12">
          {segments.map((segment, index) => {
            const nextSegment = segments[index + 1];
            const lastNode = segment.nodes[segment.nodes.length - 1];
            const nextNode = nextSegment?.nodes[0];

            return (
              <React.Fragment key={`${segment.groupId ?? 'ungrouped'}-${lastNode.id}`}>
                {renderSegment(segment)}
                {nextNode && <ArchitectureConnector edge={getEdge(lastNode.id, nextNode.id)} />}
              </React.Fragment>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[10px] text-blue-500">
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-blue-500" />
            <span>Data Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-dashed border-blue-500" />
            <span>Services</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EngineeringDeveloperTool = ({ project }: { project: Project }) => {
  const content = project.content.engineering;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 font-mono text-xs"
    >
      {/* System Status Header */}
      <motion.div variants={itemVariants} className="border border-slate-700 bg-slate-900/50 p-4 rounded-none">
        <div className="flex items-center justify-between mb-3">
          <span className="text-cyan-400 font-bold">STATUS_BAR</span>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50" />
              ONLINE
            </div>
            <span></span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700" />
      </motion.div>

      {/* Headline */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-slate-100 border-b border-slate-700 pb-4">
          {content.headline}
        </h2>
      </motion.div>

      {/* Architecture */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-2 font-bold"> SYSTEM_ARCHITECTURE</p>
        <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/30 border border-slate-800 p-3 rounded-none">
          {content.architecture}
        </p>
      </motion.div>

      {/* Architecture Blueprint */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> ARCHITECTURE_FLOW_BLUEPRINT</p>
        <ArchitectureDiagram flow={content.architectureFlow} />
      </motion.div>

      {/* Core Implementation */}
      {/* <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> CORE_IMPLEMENTATION</p>
        <pre className="bg-[#0d1117] border border-slate-800 rounded-md p-4 overflow-x-auto">
          <code className="text-emerald-400 text-xs leading-relaxed">{content.coreSnippet}</code>
        </pre>
      </motion.div> */}

      {/* Tech Stack */}
      <motion.div variants={itemVariants}>
        <p className="text-cyan-400 text-xs uppercase tracking-widest mb-3 font-bold"> TECH_STACK</p>
        <div className="flex flex-wrap gap-2">
          {content.techStack.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className="bg-slate-900 border border-slate-700 px-3 py-1 text-xs text-slate-300 rounded-none hover:border-cyan-500/50 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
