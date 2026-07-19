"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionWrapper } from "../section-wrapper";
import { Briefcase, GraduationCap, MapPin, CalendarDays } from "lucide-react";

const journeyItems = [
  {
    type: "experience",
    title: "Software Engineer (Intern)",
    organization: "NTG Clarity",
    location: "Cairo, Egypt",
    date: "Jul. 2025 — Sep. 2025",
    description: [
      "Engineered scalable Angular UIs integrated with Spring Boot and PostgreSQL REST APIs across the full Agile SDLC, improving data-fetching latency by 30%",
      "Collaborated with cross-functional QA and DevOps teams on automated testing and deployment workflows, reducing manual release overhead",
      "Engineered advanced data-binding and state management logic, contributing to more responsive UI performance and improved system stability"
    ],
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    type: "experience",
    title: "Full-Stack Software Engineer",
    organization: "Freelance",
    location: "Remote",
    date: "Jun. 2024 — Sep. 2024",
    description: [
      "Engineered the backend architecture for Al-Shahd, a commercial e-learning platform serving ~500 registered users, owning the complete lifecycle from system design to zero-downtime production deployment",
      "Designed and deployed secure RESTful APIs utilizing Node.js, Express, and MongoDB to support core domains including session management, course delivery, and resilient data processing"
    ],
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    type: "education",
    title: "B.Sc. in Computer Science",
    organization: "Nile University",
    location: "Giza, Egypt",
    date: "Expected: Jul. 2026",
    description: [
      "Focusing on foundational computer science principles, advanced software engineering practices, and distributed systems architecture."
    ],
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export function Journey() {
  return (
    <SectionWrapper
      id="journey"
      subtitle="03 / Journey"
      titleMain="Experience &"
      titleHighlight="Education"
    >
      <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-24">
        <div className="flex flex-col gap-8 md:gap-24 relative z-10">
          
          {/* Mobile continuous line (runs behind cards) - colored on entrance */}
          <div className="md:hidden absolute top-4 bottom-4 left-[19px] w-[2px] bg-purple-500/40 dark:bg-purple-500/30 z-0 pointer-events-none" />

          {journeyItems.map((item, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === journeyItems.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "relative flex w-full group",
                  // Mobile: stack node above card. Desktop: flex-row for alternating
                  "flex-col items-start md:flex-row md:items-center",
                  isEven ? "md:justify-start" : "md:justify-end"
                )}
              >
                {/* 
                  Desktop Zigzag Timeline Wire - Part 1
                */}
                {!isLast && (
                  <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
                    <m.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className={cn(
                        "absolute top-[50%] bottom-[calc(-3rem-2px)] transition-colors duration-1000",
                        "border-purple-500/40 dark:border-purple-500/30",
                        isEven 
                          ? "left-[24px] right-[50%] border-l-2 border-b-2 rounded-bl-[3rem]"
                          : "left-[50%] right-[24px] border-r-2 border-b-2 rounded-br-[3rem]"
                      )}
                    />
                  </div>
                )}

                {/* 
                  Desktop Zigzag Timeline Wire - Part 2
                */}
                {index > 0 && (
                  <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
                    <m.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className={cn(
                        "absolute top-[calc(-3rem)] bottom-[50%] transition-colors duration-1000",
                        // Colored paths when entering the section
                        "border-purple-500/40 dark:border-purple-500/30",
                        isEven 
                          ? "left-[24px] right-[50%] border-l-2 border-t-2 rounded-tl-[3rem]"
                          : "left-[50%] right-[24px] border-r-2 border-t-2 rounded-tr-[3rem]"
                      )}
                    />
                  </div>
                )}
                
                {/* Node */}
                <div
                  className={cn(
                    "flex items-center justify-center z-20",
                    // Mobile: normal flex flow, above card, gap downwards
                    "w-10 h-10 mb-3 md:mb-0",
                    // Desktop: absolute, positioned inside container to avoid overflow collapse
                    "md:absolute md:top-[50%] md:-translate-y-1/2 md:w-12 md:h-12",
                    isEven ? "md:left-0" : "md:right-0"
                  )}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Multi-color glow behind node */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 to-blue-500/40 blur-md opacity-60" />
                    <div className="w-10 h-10 rounded-full bg-background border-2 border-purple-500/40 flex items-center justify-center text-purple-500 z-10 shadow-[0_0_15px_rgba(124,58,237,0.15)] dark:shadow-none">
                      <div className="scale-75">{item.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Content Card container */}
                <div
                  className={cn(
                    "relative z-10 w-full md:w-[95%]",
                    // Mobile: standard 100% width, no margin
                    "ml-0",
                    // Desktop: restore 95% alternating geometry
                    isEven ? "md:pl-20 md:pr-0" : "md:pl-0 md:pr-20"
                  )}
                >
                  <m.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className={cn(
                      "relative flex flex-col p-6 sm:p-8 rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 ease-out",
                      "bg-gradient-to-br from-purple-500/10 via-white/60 to-blue-500/10 dark:from-purple-500/5 dark:via-card/40 dark:to-blue-500/5",
                      "border border-purple-500/30 dark:border-purple-500/10 shadow-[0_10px_40px_rgba(124,58,237,0.1)] dark:shadow-[0_0_30px_rgba(124,58,237,0.05)]",
                      "hover:border-purple-500/50 hover:shadow-[0_15px_50px_rgba(124,58,237,0.15)] dark:hover:border-purple-500/30 dark:hover:shadow-[0_0_40px_rgba(124,58,237,0.1)]"
                    )}
                  >
                    {/* Premium glowing orbs in card background */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-500/20 rounded-full blur-[60px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mb-4 md:mb-6">
                        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                          {item.title}
                        </h3>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 from-55% to-blue-500 font-bold text-[10px] sm:text-xs w-fit shrink-0 shadow-[0_0_10px_rgba(124,58,237,0.05)]">
                          <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-500" />
                          <span className="text-foreground/90 font-semibold tracking-wide">{item.date}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-4 md:mb-8 text-xs sm:text-sm font-medium text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            {item.type === "education" ? <GraduationCap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                          </div>
                          <span className="text-foreground/80">{item.organization}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                          </div>
                          <span>{item.location}</span>
                        </div>
                      </div>

                      <ul className="space-y-2.5 sm:space-y-4">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start text-sm sm:text-base text-muted-foreground leading-relaxed">
                            <span className="mr-2.5 sm:mr-4 mt-1.5 h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </m.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
