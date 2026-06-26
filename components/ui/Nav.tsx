"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ThemeToggler } from "../theme-toggler"; 
import Image from "next/image";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#arsenal", label: "Skills" },
  { href: "#projects", label: "Systems" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // ─── الدالة السحرية للـ Smooth Scroll مع تجنب الـ Navbar ───
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    
    if (elem) {
      const navHeight = 100; // مسافة إضافية عشان العنوان ميبقاش لازق في الـ Nav
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 w-full z-50 py-2 sm:py-4 pointer-events-none flex justify-center" 
    >
      <motion.div 
        initial={{ maxWidth: "1280px", height: "64px" }}
        animate={{
          marginLeft: scrolled ? "8px" : "16px",  
          marginRight: scrolled ? "8px" : "16px",
          paddingLeft: scrolled ? "16px" : "24px",
          paddingRight: scrolled ? "16px" : "24px",
          maxWidth: scrolled ? "900px" : "1280px", 
          height: scrolled ? "56px" : "64px", 
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 1 }}
        className="w-full flex items-center justify-between px-4 sm:px-6 pointer-events-auto relative"
      >
        <motion.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute inset-0 -z-10 bg-background/80 border border-foreground/10 shadow-lg backdrop-blur-md transition-[border-radius] duration-500 ease-out",
            scrolled ? "rounded-full" : "rounded-none"
          )}
        />

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border/50 ring-2 ring-transparent transition-[box-shadow] hover:ring-purple-500/50">
            <Image src="/anas.webp" alt="Anas Abdelhakim" width={150} height={150} className="h-full w-full object-cover" />
          </div>
          <a href="#" onClick={(e) => handleScroll(e, "#work")} className="font-sans text-base font-bold tracking-tight text-foreground transition-colors">
            Anas<span className="text-purple-500">.dev</span>
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <li 
              key={link.href} 
              className="relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)} // 👈 تفعيل النزول الناعم هنا
                className={cn(
                  "relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-300",
                  hoveredIndex === i ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
              {hoveredIndex === i && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 z-0 rounded-full bg-muted border border-border/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggler />
          <a 
            href="#contact" 
            onClick={(e) => handleScroll(e, "#contact")} // 👈 تفعيل النزول الناعم هنا
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform duration-300 active:scale-95 hover:scale-105"
          >
            Let's Talk
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}