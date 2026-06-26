"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../section-wrapper";

// ─── Categories & Data ───
const categories = ["All", "Backend & Core", "Frontend", "Database & Infra"] as const;
type Category = typeof categories[number];

const skills = [
  { name: "NestJS", category: "Backend & Core", desc: "Enterprise scalable architecture" },
  { name: "Bun", category: "Backend & Core", desc: "Ultra-fast runtime & edge computing" },
  { name: "Fastify", category: "Backend & Core", desc: "High-throughput APIs" },
  { name: "Node.js", category: "Backend & Core", desc: "V8 engine optimizations" },
  { name: "Next.js", category: "Frontend", desc: "App Router & Server Components" },
  { name: "React", category: "Frontend", desc: "Concurrent features & Hooks" },
  { name: "Tailwind CSS", category: "Frontend", desc: "Design system architecture" },
  { name: "Shadcn UI", category: "Frontend", desc: "Accessible headless architecture" },
  { name: "PostgreSQL", category: "Database & Infra", desc: "Complex relational queries" },
  { name: "Prisma v7", category: "Database & Infra", desc: "Advanced ORM & init configs" },
  { name: "Supabase", category: "Database & Infra", desc: "Realtime DB & Auth" },
  { name: "Docker", category: "Database & Infra", desc: "Containerized environments" },
];

export function Arsenal() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <SectionWrapper
      id="arsenal"
      subtitle="03 / Skills"
      titleMain="Technical"
      titleHighlight="Arsenal"
    >
      {/* ─── Filter Tabs ─── */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors duration-300",
              activeCategory === category ? "text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeCategory === category && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-purple-600 rounded-full z-0"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      {/* ─── Skills Grid ─── */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group p-5 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-colors cursor-default flex flex-col justify-center"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground tracking-tight">{skill.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md font-mono">
                  {skill.category.split(' ')[0]}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}