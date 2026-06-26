"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ShimmerButton } from "../ui/shimmer-button";
import { Marquee } from "../ui/marquee";

// ─── توحيد وقت وشكل الحركة لكل عناصر الصفحة ───
const springTransition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

// ─── 3D Staggered Text Animation (للنص الكبير) ───
function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const letters = text.split("");
  return (
    <motion.div
      className={`flex overflow-hidden ${className}`}
      initial="initial"
      animate="animate"
      variants={{
        initial: { opacity: 1 },
        animate: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
      }}
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            initial: { y: 80, opacity: 0, rotateX: 90, filter: "blur(8px)" },
            animate: { 
              y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)",
              transition: springTransition
            },
          }}
          style={{ display: "inline-block", transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const techPhrases = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "NestJS", "System Design", "Bun"];

  if (!mounted) return null;

  return (
    <section id="work" className="relative min-h-screen overflow-hidden bg-background pt-12 lg:pt-16">
      


      {/* Grid Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 min-h-[calc(100vh-96px)] max-w-7xl mx-auto pb-24 lg:pb-0">
        
        {/* Left Column (Text) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-start px-3 sm:px-6 lg:pl-12 lg:pr-4 pt-12 w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ ...springTransition, delay: 0.1 }}
            className="mb-6 flex items-center justify-center lg:justify-start gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">Open to new opportunities as a Software Engineer</span>
          </motion.div>

          <div className="mb-6 flex flex-col items-center lg:items-start gap-1 w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ ...springTransition, delay: 0.2 }}
              className="text-base sm:text-[clamp(20px,2.5vw,28px)] font-sans font-medium text-muted-foreground"
            >
              Anas Abdelhakim
            </motion.h2>
            
            <div className="text-[68px] sm:text-[90px] lg:text-[120px] font-bold leading-[0.85] lg:leading-[0.95] tracking-[-0.04em] text-foreground flex flex-col items-center lg:items-start mt-2">
               <AnimatedTitle text="Full-Stack" className="justify-center lg:justify-start" />
               <AnimatedTitle text="Engineer." className="text-purple-500/90 dark:text-purple-400 justify-center lg:justify-start" />
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ ...springTransition, delay: 0.5 }} 
            className="mb-8 max-w-[95%] lg:max-w-lg mx-auto lg:mx-0 text-muted-foreground text-sm sm:text-base lg:text-lg"
          >
            Specializing in high-performance backend architectures, Clean Architecture patterns, and seamless system integrations.
          </motion.div>

          {/* ─── الأزرار ─── */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ ...springTransition, delay: 0.6 }} 
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto px-4 lg:px-0"
          >
            <div className="w-full sm:w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 ease-out z-10">
              <ShimmerButton className="shadow-2xl h-12 px-8 w-full sm:w-auto">
                <span className="text-sm font-medium text-white whitespace-pre-wrap">View My Work</span>
              </ShimmerButton>
            </div>
            
           <a href="/cv.pdf" download className="w-full sm:w-auto group relative flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-foreground text-[13px] uppercase tracking-[1.5px] transition-all duration-300 ease-out 
           hover:tracking-[3px] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white hover:shadow-[0_7px_20px_0_rgba(124,58,237,0.3)] 
           active:translate-y-[1px] active:scale-[0.99] active:shadow-none active:duration-75 z-10">
              <span>Download CV</span>
           </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ ...springTransition, delay: 0.7 }}
            className="mt-10 overflow-hidden w-full max-w-md mx-auto lg:mx-0 border-t border-border pt-6"
          >
             <Marquee pauseOnHover className="[--duration:20s]">
              {techPhrases.map((tech) => (
                <span key={tech} className="mx-4 font-mono text-sm text-muted-foreground cursor-default">
                  {tech}
                </span>
              ))}
            </Marquee>
          </motion.div>

        </div>

        {/* Right Column (Image) */}
        <div className="hidden lg:flex lg:col-span-5 relative items-start justify-center lg:justify-start px-3 lg:pl-0 lg:pr-12 pt-8 lg:pt-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ ...springTransition, delay: 0.4 }} 
            className="relative w-full max-w-[90%] sm:max-w-[400px] lg:max-w-[450px] mx-auto lg:mx-0"
          >
            <div className="absolute -inset-4 rounded-full opacity-30 blur-3xl bg-purple-500/50" />
            
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-border/50 bg-card/50 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" 
                alt="Code Architecture" 
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Animated Scroll Indicator (الماوس المتحرك للأسفل) ─── */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <div className="w-5 h-8 border border-muted-foreground/50 rounded-full flex justify-center p-1">
          <motion.div 
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-muted-foreground rounded-full"
          />
        </div>
      </motion.div>

    </section>
  );
}