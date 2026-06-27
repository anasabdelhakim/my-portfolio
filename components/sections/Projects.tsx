"use client";

import { useState, memo } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "../section-wrapper";

// ─── Inline SVG icons ───
const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ─── Static data & variants — defined at module scope ───
const projects = [
  {
    title: "NeuroMeet",
    description: "A fullstack AI-powered e-learning engagement detection platform with real-time video analytics, custom WebRTC integrations, and instructor dashboards.",
    image: "/neuromeet.avif",
    technologies: ["Next.js 16", "NestJS", "Fastify", "LiveKit WebRTC", "Prisma v7", "PostgreSQL", "Python AI Agent", "PyTorch", "OpenCV", "Docker", "Bun"],
    live: "https://neuromeet.anasdev.shop",
    github: "https://github.com/anasabdelhakim/neuromeet-core.git",
    badge: "Featured Project",
  },
  {
    title: "Quiz Mastro",
    description: "A frontend assessment system featuring AI-assisted question generation via DeepSeek API, interactive testing environment, and advanced data visualization with an integrated grading workflow.",
    image: "/quiz-mastro.avif",
    technologies: ["Angular", "TypeScript", "DeepSeek API", "HTML5", "CSS3", "REST APIs"],
    live: "https://quiz-mastro-c5vv.vercel.app/index",
    github: "https://github.com/anasabdelhakim/Quiz_Mastro.git",
    badge: "Top Project",
  },
  {
    title: "Fuchsia App",
    description: "An e-commerce storefront layout featuring responsive product presentation, category filtering, and clean UI structure.",
    image: "/ecomerce.avif",
    technologies: ["HTML5", "Bootstrap", "JavaScript", "CSS3"],
    live: "https://fuchsia-ecomerce.vercel.app",
    github: "https://github.com/anasabdelhakim/Fuchsia_Ecomerce.git",
  },
  {
    title: "World Wise",
    description: "A travel web app interface for marking visited cities, displaying location insights, and maintaining personalized travel notes.",
    image: "/world-wise.avif",
    technologies: ["JavaScript", "CSS3", "HTML5"],
    live: "https://world-wise-three-rho.vercel.app/",
    github: "https://github.com/anasabdelhakim/World-Wise.git",
  },
] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;

const viewportOptions = { once: true, margin: "-50px" } as const;

const ProjectCard = memo(function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [showmore, setShowmore] = useState(false);

  return (
    <m.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-border/50 bg-gradient-to-b from-card/80 via-card/40 to-background backdrop-blur-xl hover:border-muted-foreground/30 hover:scale-[1.02] hover:shadow-[0_10px_35px_rgba(124,58,237,0.12)] transition-all duration-500 ease-out"
    >
      {/* ─── Image Container with Premium Overlay & Hover Zoom ─── */}
      <div className="relative w-full aspect-video overflow-hidden bg-muted/30 border-b border-border/50">
        {project.badge && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            {project.badge}
          </div>
        )}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Premium elegant neutral theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 z-10" />
      </div>

      {/* ─── Card Body ─── */}
      <div className="relative z-20 flex flex-col flex-1 p-6 sm:p-7 justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground transition-colors duration-300 mb-3">
            {project.title}
          </h3>

          <p
            onClick={() => setShowmore((show) => !show)}
            className="text-muted-foreground text-xs sm:text-sm leading-relaxed cursor-pointer select-none"
          >
            {showmore || project.description.length <= 90 ? (
              <>
                {project.description}
                {project.description.length > 90 && (
                  <span className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors"> see less</span>
                )}
              </>
            ) : (
              <>
                {project.description.slice(0, 90)}
                <span className="font-medium">...</span>
                <span className="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors"> see more</span>
              </>
            )}
          </p>
        </div>

        {/* ─── Technologies ─── */}
        <div className="flex flex-wrap gap-1.5 py-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-purple-500/20 bg-purple-500/10 rounded-full px-3 py-1 text-[11px] font-medium text-purple-300 tracking-wide font-mono shadow-[0_0_10px_rgba(124,58,237,0.05)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ─── Buttons (Smooth App Theme) ─── */}
        <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border/40 flex-wrap">
          {/* Live Demo */}
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 h-10 px-6 rounded-full bg-[#7C3AED] border border-[#7C3AED] text-white text-[11px] uppercase tracking-[1px] hover:tracking-[2px] hover:bg-purple-600 hover:border-purple-600 hover:shadow-[0_5px_15px_0_rgba(124,58,237,0.4)] active:scale-[0.99] transition-all duration-300 ease-out z-10"
          >
            <GlobeIcon />
            <span>Live Demo</span>
          </a>

          {/* GitHub Code */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 h-10 px-6 rounded-full border border-border bg-background/50 hover:bg-muted text-foreground text-[11px] uppercase tracking-[1px] hover:tracking-[2px] active:scale-[0.99] transition-all duration-300 ease-out z-10"
          >
            <GithubIcon />
            <span>Code</span>
          </a>
        </div>
      </div>
    </m.div>
  );
});

export function Projects() {
  return (
    <SectionWrapper
      id="projects"
      subtitle="04 / Projects"
      titleMain="System"
      titleHighlight="Architectures"
    >
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6 lg:gap-8 items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}