"use client";

import { m } from "framer-motion";
import { SectionWrapper } from "../section-wrapper";

// ─── Inline SVG icons — no lucide-react import overhead ───
const GithubIcon  = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
const ExternalIcon = () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;

// ─── Static data & variants — defined at module scope (not re-created per render) ───
const projects = [
  { title: "NeuroMeet", description: "AI-powered e-learning engagement detection platform.", tech: ["Next.js", "NestJS", "Docker", "AI"], link: "#", github: "#" },
  { title: "Vendra",    description: "High-performance car marketplace with real-time data.", tech: ["Supabase", "NestJS", "TypeScript"],  link: "#", github: "#" },
] as const;

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;

const viewportOptions = { once: true, margin: "-50px" } as const;

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      subtitle="04 / Projects"
      titleMain="System"
      titleHighlight="Architectures"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {projects.map((project, i) => (
          <m.div
            key={project.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            // ─── No hover:scale — border/shadow are composited, no layout thrash ───
            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-[1.5rem] border border-border/50 bg-card hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-[border-color,box-shadow] duration-300 ease-out"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg md:text-xl font-semibold tracking-tight">{project.title}</h3>
                <div className="flex gap-3">
                  <a href={project.github} aria-label={`${project.title} GitHub`} className="text-muted-foreground hover:text-purple-500 transition-colors">
                    <GithubIcon />
                  </a>
                  <a href={project.link} aria-label={`${project.title} live`} className="text-muted-foreground hover:text-purple-500 transition-colors">
                    <ExternalIcon />
                  </a>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[95%] mb-6">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-500 text-[10px] uppercase tracking-wider font-mono">
                  {t}
                </span>
              ))}
            </div>
          </m.div>
        ))}
      </div>
    </SectionWrapper>
  );
}