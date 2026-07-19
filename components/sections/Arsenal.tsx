"use client";

import { useState, useMemo, memo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../section-wrapper";

const categories = ["All", "Backend & Core", "Frontend", "Database & Deployment"] as const;
type Category = (typeof categories)[number];

const skills = [
  { name: "TypeScript",   category: "Backend & Core",         desc: "Type-safe development across the stack" },
  { name: "NestJS",       category: "Backend & Core",         desc: "Enterprise scalable backend architecture" },
  { name: "Node.js",      category: "Backend & Core",         desc: "V8 engine optimizations for high scaling" },
  { name: "Bun",          category: "Backend & Core",         desc: "Ultra-fast runtime & edge compute APIs" },
  { name: "Next.js",      category: "Frontend",               desc: "App Router & Server Components systems" },
  { name: "React",        category: "Frontend",               desc: "Concurrent features & modern React Hooks" },
  { name: "Tailwind",     category: "Frontend",               desc: "Design system & fast UI architecture" },
  { name: "Shadcn UI",    category: "Frontend",               desc: "Accessible headless component structures" },
  { name: "PostgreSQL",   category: "Database & Deployment",  desc: "Complex relational query optimizations" },
  { name: "Prisma",       category: "Database & Deployment",  desc: "Type-safe ORM models & data migrations" },
  { name: "MongoDB",      category: "Database & Deployment",  desc: "Document-based NoSQL data modeling" },
  { name: "Docker",       category: "Database & Deployment",  desc: "Containerized dev & production systems" },
  { name: "Cloudflare",   category: "Database & Deployment",  desc: "Edge security routing & CDN delivery" },
  { name: "HuggingFa.",   category: "Database & Deployment",  desc: "Model & AI app hosting infrastructure" },
  { name: "Vercel",       category: "Database & Deployment",  desc: "CI/CD pipelines & serverless deployments" },
] as const;

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
} as const;

const tabSpringTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

const SkillCard = memo(function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <div
      className={cn(
        "group p-5 rounded-2xl cursor-default flex flex-col justify-center",
        "transition-all duration-300 ease-out backdrop-blur-md",
        "bg-gradient-to-br from-purple-500/10 via-white/60 to-blue-500/10 dark:from-purple-500/5 dark:via-card/40 dark:to-blue-500/5",
        "border border-purple-500/30 dark:border-border/50",
        "shadow-[0_5px_20px_rgba(124,58,237,0.1)] dark:shadow-none hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(124,58,237,0.15)]",
        "hover:border-purple-500/50 dark:hover:border-purple-500/30"
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-foreground tracking-tight">{skill.name}</h3>
        <span className="text-[10px] uppercase tracking-wider bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-mono font-bold shadow-[0_0_10px_rgba(124,58,237,0.05)]">
          {skill.category.split(" ")[0]}
        </span>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground">{skill.desc}</p>
    </div>
  );
});

export function Arsenal() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredSkills = useMemo(
    () => skills.filter((s) => activeCategory === "All" || s.category === activeCategory),
    [activeCategory]
  );
  return (
    <SectionWrapper
      id="arsenal"
      subtitle="03 / Skills"
      titleMain="Technical"
      titleHighlight="Arsenal"
    >

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
              <m.div
                layoutId="active-tab"
                className="absolute inset-0 bg-purple-600 rounded-full z-0"
                initial={false}
                transition={tabSpringTransition}
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <m.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 min-h-[300px] content-start"
        >
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </m.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}