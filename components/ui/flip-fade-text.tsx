"use client"

import { useEffect, useState, useCallback } from "react"
import { m, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface FlipFadeTextProps {
    
    words?: string[]
    
    interval?: number
    
    className?: string
    
    textClassName?: string
    
    letterDuration?: number
    
    staggerDelay?: number
    
    exitStaggerDelay?: number
}

const defaultWords = ["LOADING", "COMPUTING", "SEARCHING", "RETRIEVING", "ASSEMBLING"]

const letterStyle = { transformStyle: "preserve-3d" as const } as const;

function Letter({
    char,
    letterDuration
}: {
    char: string
    letterDuration: number
}) {
    return (
        <m.span
            style={letterStyle}
            variants={{
                initial: { rotateX: 90, y: 20, opacity: 0, filter: "blur(8px)" },
                animate: { rotateX: 0, y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: letterDuration, ease: [0.2, 0.65, 0.3, 0.9] } },
                exit:    { rotateX: -90, y: -20, opacity: 0, filter: "blur(8px)", transition: { duration: letterDuration * 0.67, ease: "easeIn" } },
            }}
            className="inline-block"
        >
            {char}
        </m.span>
    )
}

function Word({
    text,
    staggerDelay,
    exitStaggerDelay,
    letterDuration,
    textClassName
}: {
    text: string
    staggerDelay: number
    exitStaggerDelay: number
    letterDuration: number
    textClassName?: string
}) {
    return (
        <m.div
            className={cn(
                "flex gap-[0.1em] text-5xl md:text-7xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-100",
                textClassName
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
                initial: { opacity: 1 },
                animate: { opacity: 1, transition: { staggerChildren: staggerDelay } },
                exit:    { opacity: 1, transition: { staggerChildren: exitStaggerDelay } },
            }}
        >
            {text.split("").map((char, i) => (
                <Letter
                    key={`${char}-${i}`}
                    char={char}
                    letterDuration={letterDuration}
                />
            ))}
        </m.div>
    )
}

export function FlipFadeText({
    words = defaultWords,
    interval = 2500,
    className,
    textClassName,
    letterDuration = 0.6,
    staggerDelay = 0.1,
    exitStaggerDelay = 0.05,
}: FlipFadeTextProps) {
    const [index, setIndex] = useState(0)

    const updateIndex = useCallback(() => {
        setIndex((prev) => (prev + 1) % words.length)
    }, [words.length])

    useEffect(() => {
        const timer = setInterval(updateIndex, interval)
        return () => clearInterval(timer)
    }, [updateIndex, interval])

    return (
        <div className={cn("flex items-center justify-center min-h-[120px] sm:min-h-[200px]", className)}>
            <div className="relative flex items-center justify-center" style={{ perspective: "1000px" }}>
                <AnimatePresence mode="wait">
                    <Word
                        key={words[index]}
                        text={words[index]}
                        staggerDelay={staggerDelay}
                        exitStaggerDelay={exitStaggerDelay}
                        letterDuration={letterDuration}
                        textClassName={textClassName}
                    />
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FlipFadeText
