import type { Transition } from "motion/react";

export const easeDefault = [0.23, 1, 0.32, 1] as const;
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const duration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
} as const;

export const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1,
} as const;

export const fadeTransition: Transition = {
  duration: duration.normal,
  ease: easeDefault,
};

export const slideTransition: Transition = {
  duration: duration.normal,
  ease: easeOut,
};
