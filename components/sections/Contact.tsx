"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MailIcon = () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

export function Contact() {
  return (
    // أضفنا px-6 هنا لضمان وجود مسافة جانبية على جميع الشاشات
    <section id="contact" className="py-20 bg-background border-t border-border/50 px-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        // أزلنا px-6 من هنا لأننا نقلناها للحاوية الخارجية
        className={cn(
          "max-w-4xl mx-auto relative p-8 md:p-12 rounded-[1.5rem] overflow-hidden",
          "bg-card border border-purple-500/20 shadow-sm backdrop-blur-md",
          "flex flex-col items-center justify-center text-center"
        )}
      >
        <div className="absolute inset-0 bg-purple-500/5 -z-10" />

        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
          Let's build something <span className="text-purple-500">great.</span>
        </h2>
        
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
          Open to Full-Stack & Backend Engineering opportunities. Let's discuss architecture, performance, or potential collaborations.
        </p>

    <a 
  href="mailto:anasabdoali22@gmail.com"
  className="w-full sm:w-auto group relative flex items-center justify-center gap-2 h-12 px-8 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-foreground text-[13px] capitalize transition-all duration-500 ease-out hover:tracking-[2px] hover:bg-[#7C3AED] hover:border-[#7C3AED] hover:text-white hover:shadow-[0_7px_29px_0_rgba(124,58,237,0.4)] active:translate-y-[1px] active:scale-[0.99] active:shadow-none active:duration-75 z-10"
>
  <MailIcon />
  <span>anasabdoali22@gmail.com</span>
</a>
      </motion.div>
    </section>
  );
}