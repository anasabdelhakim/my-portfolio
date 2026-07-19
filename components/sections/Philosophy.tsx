"use client";

import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { MouseEvent, memo } from "react";
import { SectionWrapper } from "../section-wrapper";

const Icons = {
  Architecture: () => <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
  Runtime:      () => <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Database:     () => <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Scale:        () => <svg className="w-8 h-8 md:w-9 md:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const } }),
} as const;

const viewportOptions = { once: true, margin: "-50px" } as const;

const philosophyItems = [
  { title: "Clean Architecture",  description: "Frameworks are ephemeral; business logic is sacred. Decoupling core logic ensures systems remain testable.", icon: <Icons.Architecture />, className: "lg:col-span-2" },
  { title: "Runtime Obsession",   description: "Maximizing throughput and minimizing latency using modern high-performance engines.",                        icon: <Icons.Runtime />,      className: "lg:col-span-1" },
  { title: "Data Precision",      description: "Strict Data Access Layers (DAL) with optimized indexing to prevent bottlenecks at scale.",                  icon: <Icons.Database />,     className: "lg:col-span-1" },
  { title: "Pragmatic Scaling",   description: "Designing modular monoliths that evolve seamlessly into distributed microservices when required.",            icon: <Icons.Scale />,        className: "lg:col-span-2" },
];

const SpotlightCard = memo(function SpotlightCard({
  item,
  index,
}: {
  item: (typeof philosophyItems)[0];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const background = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(124, 58, 237, 0.12), transparent 80%)`;

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col justify-between p-6 md:p-8 rounded-[1.5rem] overflow-hidden cursor-default",
        
        "transition-[opacity,box-shadow,border-color,background] duration-500 ease-out",
        "bg-gradient-to-br from-purple-500/10 via-white/60 to-blue-500/10 dark:from-purple-500/5 dark:via-card/50 dark:to-blue-500/5",
        "text-card-foreground border border-purple-500/30 dark:border-purple-500/10 shadow-[0_5px_30px_rgba(124,58,237,0.1)] dark:shadow-[0_0_30px_rgba(124,58,237,0.02)] backdrop-blur-md",
        "hover:border-purple-500/50 dark:hover:border-purple-500/30 hover:shadow-[0_10px_40px_rgba(124,58,237,0.15)] dark:hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]",
        item.className
      )}
    >

      <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <m.div
        className="pointer-events-none absolute -inset-px rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col items-center text-center md:items-start md:text-left h-full">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 shadow-[0_0_15px_rgba(124,58,237,0.05)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0" />
          <div className="relative z-10 transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">{item.title}</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[100%] md:max-w-[95%] mx-auto md:mx-0">
          {item.description}
        </p>
      </div>
    </m.div>
  );
});

export function Philosophy() {
  return (
    <SectionWrapper
      id="philosophy"
      subtitle="02 / Philosophy"
      titleMain="Engineering"
      titleHighlight="Principles"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {philosophyItems.map((item, index) => (
          <SpotlightCard key={item.title} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}