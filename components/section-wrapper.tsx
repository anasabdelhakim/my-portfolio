"use client";

import { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const headerVariants = {
  hidden:  { opacity: 0, y: 20, filter: "blur(2px)" },
  visible: { opacity: 1, y:  0, filter: "blur(0px)" },
} as const;

const contentVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y:  0 },
} as const;

const fastTransition  = { duration: 0.4, ease: "easeOut" } as const;
const contentDelay    = { duration: 0.4, delay: 0.1, ease: "easeOut" } as const;
const viewportOptions = { once: true, amount: 0.1 } as const; 

interface SectionWrapperProps {
  id: string;
  subtitle: string;
  titleMain: string;
  titleHighlight?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export function SectionWrapper({
  id,
  subtitle,
  titleMain,
  titleHighlight,
  children,
  className,
  headerClassName = "mb-10 lg:mb-14",
}: SectionWrapperProps) {
  return (
    
    <section
      id={id}
      className={cn(
        "relative py-16 lg:py-24 overflow-hidden border-t border-border/50 bg-background",
        className
      )}
    >
      <div className="max-w-[1500px] w-full mx-auto px-3 lg:px-16">

        {}
        <div className={cn("flex flex-col items-center text-center", headerClassName)}>
          <m.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOptions}
            transition={fastTransition}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-purple-500/50" />
              <span className="text-purple-500 font-mono text-xs tracking-widest uppercase">
                {subtitle}
              </span>
              <div className="h-[1px] w-6 bg-purple-500/50" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {titleMain}{" "}
              {titleHighlight && (
                <span className="text-muted-foreground">{titleHighlight}</span>
              )}
            </h2>
          </m.div>
        </div>

        {}
        <m.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          transition={contentDelay}
        >
          {children}
        </m.div>

      </div>
    </section>
  );
}