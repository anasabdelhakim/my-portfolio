"use client";

import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Journey } from "@/components/sections/Journey";
import { Arsenal } from "@/components/sections/Arsenal";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const docReady = new Promise<void>((res) => {
      if (document.readyState === "complete") res();
      else window.addEventListener("load", () => res(), { once: true });
    });

    Promise.all([
      new Promise<void>((res) => setTimeout(res, 2000)),
      docReady,
    ]).then(() => {
      if (isMounted) {
        setIsLoading(false);
      }
    });
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="bg-background min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loader" />
          ) : (
            <m.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Nav />
              <Hero />
              <Philosophy />
              <Journey />
              <Arsenal />
              <Projects />
              <Contact />
              <Footer />
            </m.div>
          )}
        </AnimatePresence>
      </main>
    </LazyMotion>
  );
}