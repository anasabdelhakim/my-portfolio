"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Philosophy } from "@/components/sections/Philosophy";
import { Arsenal } from "@/components/sections/Arsenal";
import { Contact } from "@/components/sections/Contact";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/sections/footer";

// Lazy Loading للـ components الكبيرة
const Nav = lazy(() => import("@/components/ui/Nav").then(m => ({ default: m.Nav })));
const Hero = lazy(() => import("@/components/sections/Hero").then(m => ({ default: m.Hero })));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // التحقق من التحميل الكامل مع وقت أدنى
    Promise.all([
      new Promise((res) => setTimeout(res, 2000)),
      new Promise((res) => {
        if (document.readyState === "complete") res(true);
        else window.addEventListener("load", () => res(true));
      })
    ]).then(() => setIsLoading(false));
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <Suspense fallback={null}>
            <Nav />
            <Hero />
            <Philosophy />
            <Arsenal />
            <Projects />
            <Contact />
            <Footer />
          </Suspense>
        )}
      </AnimatePresence>
    </main>
  );
}