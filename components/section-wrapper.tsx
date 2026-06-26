"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  subtitle: string;
  titleMain: string;
  titleHighlight?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}

export function SectionWrapper({
  id,
  subtitle,
  titleMain,
  titleHighlight,
  children,
  className,
  headerClassName = "mb-10 lg:mb-14",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 lg:py-24 overflow-hidden border-t border-border/50 bg-background",
        className
      )}
    >
      <div className="max-w-[1500px] w-full mx-auto px-3 lg:px-16">
        
        {/* ─── Animated Section Header (Fast & Snappy) ─── */}
        <div className={cn("flex flex-col items-center text-center", headerClassName)}>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(2px)" }} // تقليل المسافة والبلور لسرعة الأداء
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.1 }} // تبدأ الحركة مبكراً فور ظهور القسم
            transition={{ duration: 0.4, ease: "easeOut" }} // مدة سريعة ومتناسقة
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-purple-500/50" />
              <span className="text-purple-500 font-mono text-xs tracking-widest uppercase">
                {subtitle}
              </span>
              <div className="h-[1px] w-6 bg-purple-500/50" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              {titleMain}{" "}
              {titleHighlight && (
                <span className="text-muted-foreground">{titleHighlight}</span>
              )}
            </h2>
          </motion.div>
        </div>

        {/* ─── Section Content (Fast & Snappy) ─── */}
        <motion.div
            initial={{ opacity: 0, y: 20 }} // تقليل مسافة الطلوع لعدم الإحساس بالبطء
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }} // التأخير خفيف جداً (0.1) ليعمل تتابع سريع
        >
            {children}
        </motion.div>

      </div>
    </section>
  );
}