"use client";

import { m, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useCallback, memo, useEffect } from "react";
import { ThemeToggler } from "../theme-toggler";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#work",       label: "Work"      },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#journey",    label: "Journey"    },
  { href: "#arsenal",    label: "Skills"     },
  { href: "#projects",   label: "Systems"    },
] as const;

const navSpring    = { type: "spring", stiffness: 100, damping: 20 } as const;
const innerSpring  = { type: "spring", stiffness: 150, damping: 20, mass: 1 } as const;
const pillSpring   = { type: "spring", stiffness: 400, damping: 30 } as const;

const NavLogo = memo(function NavLogo() {
  return (
    <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border/50 ring-2 ring-transparent transition-[box-shadow] hover:ring-purple-500/50">
      <Image
        src="/anas.webp"
        alt="Anas Abdelhakim"
        width={36}
        height={36}
        
        className="h-full w-full object-cover"
      />
    </div>
  );
});

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]     = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    
    setScrolled((prev) => (latest > 60 ? true : latest < 40 ? false : prev));
  });

  const handleScroll = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const offsetPosition = elem.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        window.history.pushState(null, "", href);
      }
    },
    []
  );
  return (
    <m.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={navSpring}
      className="fixed top-0 w-full z-50 py-2 sm:py-4 pointer-events-none flex justify-center"
    >
      <m.div
        initial={{ maxWidth: "1280px", height: "64px" }}
        animate={{
          marginLeft:   scrolled ? "8px"    : "16px",
          marginRight:  scrolled ? "8px"    : "16px",
          paddingLeft:  scrolled ? "16px"   : "24px",
          paddingRight: scrolled ? "16px"   : "24px",
          maxWidth:     scrolled ? "900px"  : "1280px",
          height:       scrolled ? "56px"   : "64px",
        }}
        transition={innerSpring}
        className="w-full flex items-center justify-between px-4 sm:px-6 pointer-events-auto relative"
      >

        <m.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute inset-0 -z-10 bg-background/80 border border-foreground/10 shadow-lg backdrop-blur-md transition-[border-radius] duration-500 ease-out",
            scrolled ? "rounded-full" : "rounded-none"
          )}
        />

        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <NavLogo />
          <Link
            href="#work"
            onClick={(e) => handleScroll(e, "#work")}
            className="font-sans text-base font-bold tracking-tight text-foreground transition-colors"
          >
            Anas<span className="text-purple-500">.dev</span>
          </Link>
        </div>

        <ul
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <Link
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={cn(
                  "relative z-10 block px-4 py-2 text-sm font-medium transition-colors duration-300",
                  hoveredIndex === i ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
              {hoveredIndex === i && (
                <m.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 z-0 rounded-full bg-muted border border-border/50"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={pillSpring}
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-4 relative z-[60]">
          <ThemeToggler />
          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform duration-300 active:scale-95 hover:scale-105"
          >
            Let's Talk
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-full border border-border/50 bg-background hover:bg-muted transition-colors relative z-50 pointer-events-auto"
            aria-label="Toggle Menu"
          >
            <span className={cn("w-3.5 h-[1.5px] bg-foreground transition-all duration-300 absolute", mobileMenuOpen ? "rotate-45" : "-translate-y-1")} />
            <span className={cn("w-3.5 h-[1.5px] bg-foreground transition-all duration-300 absolute", mobileMenuOpen ? "opacity-0" : "opacity-100")} />
            <span className={cn("w-3.5 h-[1.5px] bg-foreground transition-all duration-300 absolute", mobileMenuOpen ? "-rotate-45" : "translate-y-1")} />
          </button>
        </div>
      </m.div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[40] bg-background/40 backdrop-blur-sm md:hidden pointer-events-auto"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Sidebar Drawer */}
            <m.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 z-[50] w-[75%] max-w-[300px] bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl md:hidden pointer-events-auto flex flex-col pt-24 px-6 pb-12"
            >
              <div className="flex flex-col gap-4 mt-4 flex-1">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 px-4">Navigation</p>
                {navLinks.map((link, i) => (
                  <m.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        setMobileMenuOpen(false);
                        handleScroll(e, link.href);
                      }}
                      className="text-lg font-medium tracking-wide text-foreground/80 hover:text-purple-500 hover:bg-muted/50 transition-colors block py-3 px-4 rounded-xl"
                    >
                      {link.label}
                    </Link>
                  </m.div>
                ))}
              </div>
              <m.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.05, ease: [0.76, 0, 0.24, 1] }}
                className="mt-8 border-t border-border/50 pt-8 px-4"
              >
                <Link
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleScroll(e, "#contact");
                  }}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-8 text-sm font-semibold text-background transition-transform active:scale-95"
                >
                  Let's Talk
                </Link>
              </m.div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </m.nav>
  );
}