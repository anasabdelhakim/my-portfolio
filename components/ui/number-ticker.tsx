"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
}: {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // بنحدد البداية بناءً على الاتجاه (لو up يبدأ من 0، لو down يبدأ من الرقم)
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  
  // إعدادات الـ Physics بتاعة الأنيميشن عشان يبقى ناعم
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        // بنفرمت الرقم عشان لو معدي الألف يحط فاصلة (مثال: 1,000)
        ref.current.textContent = Intl.NumberFormat("en-US").format(
          Number(latest.toFixed(0))
        );
      }
    });
  }, [springValue]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums tracking-wider text-black dark:text-white",
        className
      )}
      ref={ref}
    />
  );
}