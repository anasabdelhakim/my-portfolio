"use client";

import { motion } from "framer-motion";

// أيقونات SVG مباشرة لضمان العمل 100%
const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const projects = [
  {
    title: "NeuroMeet",
    description: "AI-powered e-learning engagement detection platform.",
    tech: ["Next.js", "NestJS", "Docker", "AI"],
    link: "#",
    github: "#"
  },
  {
    title: "Vendra",
    description: "High-performance car marketplace with real-time data.",
    tech: ["Supabase", "NestJS", "TypeScript"],
    link: "#",
    github: "#"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-[1500px] mx-auto px-3 lg:px-16">
        <h2 className="text-3xl font-bold mb-12 text-center">System Architectures</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 rounded-[1.5rem] border border-border/50 bg-card hover:border-purple-500/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <div className="flex gap-3">
                  <a href={project.github} className="text-muted-foreground hover:text-purple-500 transition-colors"><GithubIcon /></a>
                  <a href={project.link} className="text-muted-foreground hover:text-purple-500 transition-colors"><ExternalIcon /></a>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-[10px] uppercase tracking-wider font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}