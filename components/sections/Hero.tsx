"use client";

import { m } from "framer-motion";
import { useState, useEffect, memo, useCallback } from "react";
import { ShimmerButton } from "../ui/shimmer-button";
import { Marquee } from "../ui/marquee";
import Link from "next/link";
import Image from "next/image";

const springTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

const fadeUpVariant = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { ...springTransition, delay } },
});

const containerVariants = {
  initial: { opacity: 1 },
  animate: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
} as const;

const letterVariants = {
  initial: { y: 80, opacity: 0, rotateX: 90 },
  animate: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: springTransition,
  },
} as const;

const letterStyle = {
  display: "inline-block",
  transformStyle: "preserve-3d" as const,
  willChange: "transform, opacity, filter",
} as const;

const AnimatedTitle = memo(function AnimatedTitle({
  text,
  className,
  gradient = false,
}: {
  text: string;
  className?: string;
  gradient?: boolean;
}) {
  const letters = text.split("");
  return (
    <m.div
      className={`flex overflow-hidden ${className}`}
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {letters.map((char, i) => {
        const isGradient = gradient && char !== " ";
        return (
          <m.span
            key={i}
            variants={letterVariants}
            style={{
              ...letterStyle,
              ...(isGradient
                ? {
                    backgroundImage: "linear-gradient(to right, #a855f7 55%, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    backgroundSize: `${letters.length * 100}% 100%`,
                    backgroundPosition: `${(i / (Math.max(1, letters.length - 1))) * 100}% 0`,
                  }
                : {}),
            }}
          >
            {char === " " ? "\u00A0" : char}
          </m.span>
        );
      })}
    </m.div>
  );
});

const techPhrases = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "NestJS", "System Design", "Bun",
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const elem = document.getElementById("projects");
    if (elem) {
      const offsetPosition = elem.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      window.history.pushState(null, "", "#projects");
    }
  }, []);

  if (!mounted) return null;

  return (
    <section
      id="work"
      className="relative min-h-screen overflow-hidden bg-background pt-12 lg:pt-16"
    >
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 min-h-[calc(100vh-96px)] max-w-7xl mx-auto pb-24 lg:pb-0">

        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-start px-3 sm:px-6 lg:pl-12 lg:pr-4 pt-12 w-full">

          <m.div
            {...fadeUpVariant(0.1)}
            className="mb-6 flex items-center justify-center lg:justify-start gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">
              Open to new opportunities as a Software Engineer
            </span>
          </m.div>

          <div className="mb-6 flex flex-col items-center lg:items-start gap-1 w-full">
            <m.h2
              {...fadeUpVariant(0.2)}
              className="text-base sm:text-[clamp(20px,2.5vw,28px)] font-sans font-medium text-muted-foreground flex items-center"
            >
              <span>Anas Abdelhakim</span>
            </m.h2>

            <div className="text-[68px] sm:text-[90px] lg:text-[120px] font-bold leading-[0.85] lg:leading-[0.95] tracking-[-0.04em] text-foreground flex flex-col items-center lg:items-start mt-2">
              <AnimatedTitle text="Full-Stack" className="justify-center lg:justify-start" />
              <AnimatedTitle
                text="Engineer."
                className="justify-center lg:justify-start"
                gradient={true}
              />
            </div>
          </div>

          <m.div
            {...fadeUpVariant(0.5)}
            className="mb-8 max-w-[95%] lg:max-w-lg mx-auto lg:mx-0 text-muted-foreground text-sm sm:text-base lg:text-lg"
          >
            Specializing in high-performance backend architectures, Clean Architecture
            patterns, and seamless system integrations.
          </m.div>

          <m.div
            {...fadeUpVariant(0.6)}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto px-4 lg:px-0"
          >

            <div className="w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 ease-out z-10">
              <Link href="#projects" onClick={handleScroll} className="w-full sm:w-auto block">
                <ShimmerButton className="shadow-2xl h-12 px-8 w-full sm:w-auto">
                  <span className="text-sm font-medium text-white whitespace-pre-wrap">
                    View My Work
                  </span>
                </ShimmerButton>
              </Link>
            </div>

            <a
              href="/Anas_Abdelhakim_Resume.pdf"
              download="Anas_Abdelhakim_Resume.pdf"
              className="w-full sm:w-auto group relative flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 dark:border-white/10 border-black/10 bg-transparent backdrop-blur-md text-foreground text-[13px] uppercase tracking-[1.5px] transition-[letter-spacing,background-color,border-color,color,box-shadow] duration-[400ms] ease-out hover:tracking-[3px] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white hover:shadow-[0_7px_20px_0_rgba(124,58,237,0.3)] active:translate-y-[1px] active:scale-[0.99] active:shadow-none active:duration-75 z-10"
            >
              <span>Download CV</span>
            </a>
          </m.div>

          <m.div
            {...fadeUpVariant(0.7)}
            className="mt-10 overflow-hidden w-full max-w-md mx-auto lg:mx-0 border-t border-border pt-6"
          >
            <Marquee pauseOnHover className="[--duration:20s]">
              {techPhrases.map((tech) => (
                <span key={tech} className="mx-4 font-mono text-sm text-muted-foreground cursor-default">
                  {tech}
                </span>
              ))}
            </Marquee>
          </m.div>
        </div>

        <div className="hidden lg:flex lg:col-span-5 relative items-start justify-center lg:justify-start px-3 lg:pl-0 lg:pr-12 pt-8 lg:pt-16">
          <m.div
            {...fadeUpVariant(0.4)}
            className="relative w-full max-w-[90%] sm:max-w-[400px] lg:max-w-[450px] mx-auto lg:mx-0"
          >

            <div className="absolute -inset-4 rounded-full opacity-30 blur-3xl bg-purple-500/50" />
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border/50 bg-card/50 shadow-2xl">

              <Image
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                alt="Code Architecture — dark terminal with colorful syntax highlighting"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 0px, 450px"
                className="object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-[mix-blend-mode] duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
          </m.div>
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        role="button"
        aria-label="Scroll down"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          Scroll
        </span>
        <div className="w-5 h-8 border border-muted-foreground/50 rounded-full flex justify-center p-1">
          <m.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-muted-foreground rounded-full"
            style={{ willChange: "transform, opacity" }}
          />
        </div>
      </m.div>
    </section>
  );
}
