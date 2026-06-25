"use client";

import { motion } from "framer-motion";
import { FlipFadeText } from "./flip-fade-text";
import NumberTicker from "./number-ticker";

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090B]"
    >
      <div className="flex flex-col items-center w-full px-6">
        <div className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
          <FlipFadeText text="Anas Abdelhakim" />
        </div>
        <div className="flex flex-col items-center gap-3 w-full max-w-[350px]">
          <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden relative">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-neutral-500 to-black"
            />
          </div>
          <div className="flex items-center gap-1 font-mono text-sm text-neutral-400">
            <NumberTicker value={100} />%
          </div>
        </div>
      </div>
    </motion.div>
  );
};