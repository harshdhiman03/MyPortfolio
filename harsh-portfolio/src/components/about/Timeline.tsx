// 'use client';

// import React from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useLens } from '@/context/LensContext';
// import { experiences } from '@/lib/data';

// export const Timeline = () => {
//   const { lens } = useLens();

//   const getStyles = () => {
//     switch (lens) {
//       case 'product':
//         return {
//           container: 'bg-indigo-50',
//           title: 'text-slate-900',
//           subtitle: 'text-slate-600',
//           role: 'text-indigo-700 font-semibold',
//           period: 'text-slate-500',
//           content: 'text-slate-600',
//           dotBg: 'bg-indigo-600',
//           lineBg: 'bg-indigo-200',
//         };
//       case 'engineering':
//         return {
//           container: 'bg-slate-900',
//           title: 'text-slate-100',
//           subtitle: 'text-cyan-400',
//           role: 'text-cyan-400 font-mono font-semibold',
//           period: 'text-slate-400 font-mono',
//           content: 'text-slate-300',
//           dotBg: 'bg-cyan-400',
//           lineBg: 'bg-slate-700',
//         };
//       case 'agentic':
//         return {
//           container: 'bg-violet-900/20',
//           title: 'text-violet-100',
//           subtitle: 'text-violet-400',
//           role: 'text-violet-400 font-semibold',
//           period: 'text-violet-400/70',
//           content: 'text-violet-200',
//           dotBg: 'bg-violet-500',
//           lineBg: 'bg-violet-500/30',
//         };
//       default:
//         return {
//           container: 'bg-indigo-50',
//           title: 'text-slate-900',
//           subtitle: 'text-slate-600',
//           role: 'text-indigo-700 font-semibold',
//           period: 'text-slate-500',
//           content: 'text-slate-600',
//           dotBg: 'bg-indigo-600',
//           lineBg: 'bg-indigo-200',
//         };
//     }
//   };

//   const styles = getStyles();

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`px-6 py-20 rounded-2xl transition-all duration-700 ${styles.container}`}
//     >
//       <div className="max-w-4xl mx-auto">
//         <h2 className={`text-3xl md:text-4xl font-bold mb-16 ${styles.title}`}>
//           Experience Timeline
//         </h2>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Vertical line */}
//           <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-1 ${styles.lineBg}`} />

//           {/* Timeline items */}
//           <div className="space-y-12">
//             <AnimatePresence mode="wait">
//               {experiences.map((exp, index) => {
//                 const content = exp.content[lens].summary;

//                 return (
//                   <motion.div
//                     key={exp.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className="relative"
//                   >
//                     {/* Dot */}
//                     <div
//                       className={`absolute left-0 md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-6 w-9 h-9 rounded-full ${styles.dotBg} border-4 border-current z-10 transition-all duration-700`}
//                     />

//                     {/* Content */}
//                     <div className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-12 md:w-1/2' : 'md:ml-auto md:pl-12 md:w-1/2'}`}>
//                       <div className={`p-6 rounded-lg ${styles.container === 'bg-indigo-50' ? 'bg-white border border-indigo-100' : styles.container === 'bg-slate-900' ? 'bg-slate-800 border border-slate-700' : 'bg-violet-900/30 border border-violet-500/30'}`}>
//                         <div className="flex items-start justify-between gap-4 mb-2">
//                           <div>
//                             <h3 className={`text-xl font-bold ${styles.title}`}>
//                               {exp.company}
//                             </h3>
//                             <p className={`${styles.role}`}>{exp.role}</p>
//                           </div>
//                           <span className={`text-sm whitespace-nowrap ${styles.period}`}>
//                             {exp.period}
//                           </span>
//                         </div>
//                         <p className={`${styles.content} leading-relaxed`}>{content}</p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };
