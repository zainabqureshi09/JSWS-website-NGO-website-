"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TypewriterHeadingProps {
  text: string;
  prefixText?: string;
  suffixText?: string;
  highlightText?: string;
  className?: string;
  cursorPosition?: "start" | "end";
  speed?: number;
}

export function TypewriterHeading({
  text,
  prefixText = "",
  suffixText = "",
  highlightText = "",
  className,
  cursorPosition = "start",
  speed = 45,
}: TypewriterHeadingProps) {
  const [displayedText, setDisplayedText] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    setDisplayedText("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, prefersReducedMotion]);

  const Cursor = () => (
    <span
      className="inline-block w-2.5 sm:w-3.5 md:w-4.5 h-[0.75em] bg-gradient-to-b from-red-500 via-rose-500 to-red-600 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.9)] border-r-2 border-white/90 align-middle animate-pulse mx-1.5"
      aria-hidden="true"
    />
  );

  return (
    <div className={cn("inline-flex items-center flex-wrap gap-x-2", className)}>
      {cursorPosition === "start" && <Cursor />}
      {prefixText && <span className="text-white">{prefixText} </span>}
      <span className="text-white">{displayedText}</span>
      {highlightText && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-rose-400 font-black">
          {" "}{highlightText}
        </span>
      )}
      {suffixText && <span className="text-gray-200"> {suffixText}</span>}
      {cursorPosition === "end" && <Cursor />}
    </div>
  );
}

interface BlurRevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurRevealText({
  children,
  className,
  delay = 0,
  duration = 0.7,
}: BlurRevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: "blur(12px)", y: 24 }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(12px)", y: 24 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SplitWordRevealProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export function SplitWordReveal({
  text,
  className,
  stagger = 0.05,
  delay = 0,
}: SplitWordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap gap-x-1.5", className)}>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          className="inline-block overflow-hidden py-0.5"
          initial={{ opacity: 0, y: "100%", filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: "0%", filter: "blur(0px)" } : { opacity: 0, y: "100%", filter: "blur(4px)" }}
          transition={{
            duration: 0.6,
            delay: delay + idx * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
