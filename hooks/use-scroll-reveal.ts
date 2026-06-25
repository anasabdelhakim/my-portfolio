"use client";

import { useAnimation, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export function useScrollReveal(threshold = 0.1) {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: threshold, once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return { ref, controls };
}
