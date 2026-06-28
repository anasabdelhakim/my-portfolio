"use client";

import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useCallback, memo } from "react";
import { ThemeToggler } from "../theme-toggler";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#work",       label: "Work"      },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#arsenal",    label: "Skills"     },
  { href: "#projects",   label: "Systems"    },
] as const;

// ─── Static spring configs — not re-created per render ───
const navSpring    = { type: "spring", stiffness: 100, damping: 20 } as const;
const innerSpring  = { type: "spring", stiffness: 150, damping: 20, mass: 1 } as const;
const pillSpring   = { type: "spring", stiffness: 400, damping: 30 } as const;

// ─── Memoized logo image so re-scroll doesn't re-paint it ───
const NavLogo = memo(function NavLogo() {
  return (
    <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border/50 ring-2 ring-transparent transition-[box-shadow] hover:ring-purple-500/50">
      <Image
        src="/anas.webp"
        alt="Anas Abdelhakim"
        width={36}
        height={36}
        // Nav avatar is above-fold but tiny — skip priority to avoid competing with hero image
        className="h-full w-full object-cover"
      />
    </div>
  );
});

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled]     = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // ─── Threshold hysteresis prevents flicker at boundary ───
    setScrolled((prev) => (latest > 60 ? true : latest < 40 ? false : prev));
  });

  // ─── Stable scroll handler — useCallback prevents re-registering on every render ───
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
        {/* Backdrop pill */}
        <m.div
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "absolute inset-0 -z-10 bg-background/80 border border-foreground/10 shadow-lg backdrop-blur-md transition-[border-radius] duration-500 ease-out",
            scrolled ? "rounded-full" : "rounded-none"
          )}
        />

        {/* Logo */}
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

        {/* Nav links */}
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

        {/* CTA */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggler />
          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact")}
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform duration-300 active:scale-95 hover:scale-105"
          >
            Let's Talk
          </Link>
        </div>
      </m.div>
    </m.nav>
  );
}