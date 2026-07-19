"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const MailIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const fadeVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y:  0 },
} as const;

const viewportOptions = { once: true } as const;
const transition      = { duration: 0.5 } as const;

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background border-t border-border/50 px-3">
      <m.div
        variants={fadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        transition={transition}
        className={cn(
          "max-w-4xl mx-auto relative p-8 md:p-16 rounded-[2rem] overflow-hidden",
          "bg-gradient-to-br from-purple-500/10 via-card/50 to-blue-500/10 border border-purple-500/20 shadow-[0_0_40px_rgba(124,58,237,0.1)] backdrop-blur-xl",
          "flex flex-col items-center justify-center text-center"
        )}
      >
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none z-0" />

        <h2 className="relative z-10 text-3xl md:text-5xl font-bold mb-6 tracking-tight">
          Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 from-55% to-blue-500">great.</span>
        </h2>

        <p className="relative z-10 text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
          Open to Full-Stack &amp; Backend Engineering opportunities. Let's discuss architecture, performance, or potential collaborations.
        </p>

        <a
          href="mailto:anasabdoali22@gmail.com"
          className="relative z-10 w-full sm:w-auto group flex items-center justify-center gap-2 h-12 px-8 rounded-full border-2 dark:border-white/10 border-black/10 bg-transparent backdrop-blur-md text-foreground text-[13px] capitalize tracking-[1.5px] transition-[letter-spacing,background-color,border-color,color,box-shadow] duration-[400ms] ease-out hover:tracking-[3px] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white hover:shadow-[0_7px_20px_0_rgba(124,58,237,0.3)] active:translate-y-[1px] active:scale-[0.99] active:shadow-none active:duration-75"
        >
          <MailIcon />
          <span>anasabdoali22@gmail.com</span>
        </a>
      </m.div>
    </section>
  );
}