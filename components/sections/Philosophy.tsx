"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

const Icons = {
  Architecture: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
  ),
  Runtime: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  ),
  Database: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
  ),
  Scale: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
  ),
};

const philosophyItems = [
  {
    title: "Clean Architecture",
    description: "Frameworks are ephemeral; business logic is sacred. Decoupling core logic ensures systems remain testable.",
    icon: <Icons.Architecture />,
    className: "lg:col-span-2", 
  },
  {
    title: "Runtime Obsession",
    description: "Maximizing throughput and minimizing latency using modern high-performance engines.",
    icon: <Icons.Runtime />,
    className: "lg:col-span-1",
  },
  {
    title: "Data Precision",
    description: "Strict Data Access Layers (DAL) with optimized indexing to prevent bottlenecks at scale.",
    icon: <Icons.Database />,
    className: "lg:col-span-1",
  },
  {
    title: "Pragmatic Scaling",
    description: "Designing modular monoliths that evolve seamlessly into distributed microservices when required.",
    icon: <Icons.Scale />,
    className: "lg:col-span-2",
  },
];

function SpotlightCard({ item, index }: { item: typeof philosophyItems[0], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col justify-between p-6 md:p-8 rounded-[1.5rem] overflow-hidden cursor-default",
        "transition-all duration-300 ease-out",
        "bg-card text-card-foreground border border-border/50 shadow-sm backdrop-blur-md",
        "hover:scale-[1.01] hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5",
        item.className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              rgba(124, 58, 237, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10">
        <div className="w-11 h-11 rounded-xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-105 group-hover:bg-purple-500/10 transition-all duration-300 mb-6">
          {item.icon}
        </div>
        
        <h3 className="text-lg md:text-xl font-semibold mb-2 tracking-tight transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[95%] transition-colors duration-300">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" className="relative py-16 lg:py-24 overflow-hidden border-t border-border/50 bg-background">
      <div className="max-w-[1500px] w-full mx-auto px-3 lg:px-16">
        
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-purple-500/50" />
              <span className="text-purple-500 font-mono text-xs tracking-widest uppercase">Philosophy</span>
              <div className="h-[1px] w-6 bg-purple-500/50" />
            </div>
            <h2 className="text-[28px] md:text-[40px] font-bold tracking-tight text-foreground">
              Engineering <span className="text-muted-foreground">Principles</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
          {philosophyItems.map((item, index) => (
            <SpotlightCard key={item.title} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}