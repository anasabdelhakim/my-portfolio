"use client";

import { useState, memo } from "react";
import { m } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "../section-wrapper";

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

type ProjectType = {
  title: string;
  description: string;
  image: string;
  technologies: readonly string[];
  live: string;
  github: string;
  badge?: string;
};

const projects: ProjectType[] = [
  {
    title: "NeuroMeet",
    description: "A real-time meeting platform with role-based dashboards, LiveKit WebRTC integration, and a high-performance NestJS backend running on Bun — deployed as a Dockerized monorepo across Vercel and Hugging Face Spaces with Cloudflare edge security.",
    image: "/neuromeet.avif",
    technologies: ["Next.js", "NestJS", "Bun", "LiveKit WebRTC", "Prisma", "PostgreSQL", "Docker", "Cloudflare", "Hugging Face"],
    live: "https://neuromeet.anasdev.shop",
    github: "https://github.com/anasabdelhakim/neuromeet-core",
    badge: "Featured Project",
  },
  {
    title: "Quiz Maestro",
    description: "A production-grade assessment platform featuring dual-role access, AI-assisted quiz building, enterprise Zod validation, and an immersive Tailwind UI.",
    image: "/quiz-mastro.avif",
    technologies: ["Angular", "TypeScript", "Tailwind CSS", "NgRx", "RxJS", "Zod"],
    live: "https://quiz-mastro-c5vv.vercel.app/index",
    github: "https://github.com/anasabdelhakim/Quiz_Mastro",
  },
  {
    title: "e-plantShopping",
    description: "A modern React + TypeScript shopping application that allows users to browse houseplants, add them to a cart, and manage quantities with a smooth and responsive UI.",
    image: "/e-shopping.avif",
    technologies: ["React", "TypeScript", "Vite", "Redux Toolkit", "CSS"],
    live: "https://nursery-shopping-q3d3t9ti6-anasabdelhakims-projects.vercel.app/",
    github: "https://github.com/anasabdelhakim/paradise-nursery",
  },
  {
    title: "Book Review App",
    description: "A RESTful API backend service built with Express and MongoDB for managing books, user reviews, and authentication. Features JWT security, password hashing, and structured MVC architecture.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT"],
    live: "",
    github: "https://github.com/anasabdelhakim/book-review-app",
  },
  {
    title: "World Wise",
    description: "A travel web app interface for marking visited cities, displaying location insights, and maintaining personalized travel notes.",
    image: "/world-wise.avif",
    technologies: ["JavaScript", "CSS3", "HTML5"],
    live: "https://world-wise-three-rho.vercel.app/",
    github: "https://github.com/anasabdelhakim/World-Wise",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
} as const;

const viewportOptions = { once: true, margin: "-50px" } as const;

const ProjectCard = memo(function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  const [showmore, setShowmore] = useState(false);

  return (
    <m.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOptions}
      className="group relative flex flex-col h-full overflow-hidden rounded-[1.5rem] border border-border/50 bg-gradient-to-b from-card/80 via-card/40 to-background backdrop-blur-xl hover:border-muted-foreground/30 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)] transition-all duration-500 ease-out"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-muted/30 transform-gpu isolate">
        {project.badge && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-500 text-[11px] font-semibold tracking-wide backdrop-blur-md shadow-[0_0_15px_rgba(124,58,237,0.2)]">
            {project.badge}
          </div>
        )}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80 z-10 pointer-events-none" />
      </div>
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

        <div className="flex flex-wrap gap-1.5 py-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="border border-purple-500/20 bg-purple-500/10 rounded-full px-3 py-1 text-[11px] font-medium text-purple-500 tracking-wide font-mono shadow-[0_0_10px_rgba(124,58,237,0.05)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border/40 flex-wrap">

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex items-center justify-center gap-2 h-10 px-6 rounded-full border-2 dark:border-white/10 border-black/10 bg-transparent backdrop-blur-md text-foreground text-[11px] uppercase tracking-[1.5px] transition-[letter-spacing,background-color,border-color,color,box-shadow] duration-[400ms] ease-out hover:tracking-[3px] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white hover:shadow-[0_7px_20px_0_rgba(124,58,237,0.3)] active:translate-y-[1px] active:scale-[0.99] active:shadow-none active:duration-75 z-10"
            >
              <GlobeIcon />
              <span>Live Demo</span>
            </a>
          )}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex items-center justify-center gap-2 h-10 px-6 rounded-full border border-border bg-background/50 hover:bg-muted text-foreground text-[11px] uppercase tracking-[1px] active:scale-[0.99] transition-all duration-300 ease-out z-10"
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
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-6 lg:gap-8 items-stretch">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}