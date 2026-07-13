"use client";

import { useState, useMemo, memo } from "react";
import { m, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../section-wrapper";

const categories = ["All", "Backend & Core", "Frontend", "Database & Deployment"] as const;
type Category = (typeof categories)[number];

const skills = [
  { name: "TypeScript",   category: "Backend & Core",       desc: "Type-safe development across the stack"  },
  { name: "NestJS",       category: "Backend & Core",       desc: "Enterprise scalable architecture"    },
  { name: "Node.js",      category: "Backend & Core",       desc: "V8 engine optimizations"              },
  { name: "Bun",          category: "Backend & Core",       desc: "Ultra-fast runtime & edge computing"  },
  { name: "Next.js",      category: "Frontend",             desc: "App Router & Server Components"       },
  { name: "React",        category: "Frontend",             desc: "Concurrent features & Hooks"          },
  { name: "Tailwind CSS", category: "Frontend",             desc: "Design system architecture"           },
  { name: "Shadcn UI",    category: "Frontend",             desc: "Accessible headless architecture"     },
  { name: "PostgreSQL",   category: "Database & Deployment",     desc: "Complex relational queries"           },
  { name: "Prisma",       category: "Database & Deployment",     desc: "Type-safe ORM & migrations"           },
  { name: "MongoDB",      category: "Database & Deployment",     desc: "Document-based data modeling"         },
  { name: "Docker",       category: "Database & Deployment",  desc: "Containerized dev & production environments" },
  { name: "Cloudflare",   category: "Database & Deployment",  desc: "Edge security & CDN delivery"         },
  { name: "Hugging Face", category: "Database & Deployment",  desc: "Model & app hosting infrastructure"   },
  { name: "Vercel",       category: "Database & Deployment",  desc: "CI/CD & serverless deployment"        },
] as const;

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
} as const;

const tabSpringTransition = { type: "spring", stiffness: 400, damping: 30 } as const;

const SkillCard = memo(function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  return (
    <m.div
      key={skill.name}
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group p-5 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 transition-colors cursor-default flex flex-col justify-center"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-foreground tracking-tight">{skill.name}</h3>
        <span className="text-[10px] uppercase tracking-wider text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md font-mono">
          {skill.category.split(" ")[0]}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{skill.desc}</p>
    </m.div>
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

      <m.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </AnimatePresence>
      </m.div>
    </SectionWrapper>
  );
}