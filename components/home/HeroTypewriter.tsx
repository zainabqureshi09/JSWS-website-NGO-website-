"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroTypewriterProps {
  titleStart: string;
  titleHighlight: string;
  titleEnd: string;
}

export function HeroTypewriter({
  titleStart,
  titleHighlight,
  titleEnd,
}: HeroTypewriterProps) {
  const [displayedStart, setDisplayedStart] = useState("");
  const [displayedHighlight, setDisplayedHighlight] = useState("");
  const [displayedEnd, setDisplayedEnd] = useState("");

  useEffect(() => {
    let index = 0;
    const startLen = titleStart.length;
    const highlightLen = titleHighlight.length;
    const endLen = titleEnd.length;

    setDisplayedStart("");
    setDisplayedHighlight("");
    setDisplayedEnd("");

    const timer = setInterval(() => {
      index++;
      if (index <= startLen) {
        setDisplayedStart(titleStart.slice(0, index));
      } else if (index <= startLen + highlightLen) {
        setDisplayedHighlight(titleHighlight.slice(0, index - startLen));
      } else if (index <= startLen + highlightLen + endLen) {
        setDisplayedEnd(titleEnd.slice(0, index - startLen - highlightLen));
      } else {
        clearInterval(timer);
      }
    }, 45);

    return () => clearInterval(timer);
  }, [titleStart, titleHighlight, titleEnd]);

  return (
    <div className="hero-title-wrap my-2 sm:my-3">
      {/* Blinking Cursor Bar at the Beginning */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2">
        <motion.span
          animate={{ opacity: [1, 0.15, 1], scaleY: [1, 0.85, 1] }}
          transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block w-3 sm:w-4 md:w-5 h-[0.85em] bg-gradient-to-b from-red-500 via-rose-500 to-red-600 rounded-md shadow-[0_0_24px_rgba(239,68,68,0.95)] border-r-2 border-white/90 align-middle shrink-0"
          title="Active Cursor"
        />
        <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-md min-h-[1.2em]">
          {displayedStart}
        </h2>
      </div>

      {/* Highlighted Word Reveal */}
      <h2
        className="my-1 sm:my-2 font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-rose-400 drop-shadow-2xl min-h-[1.1em]"
        style={{ WebkitTextStroke: "1px rgba(225,29,72,0.5)" }}
      >
        {displayedHighlight}
      </h2>

      {/* End Title Line Reveal */}
      <h1 className="mb-6 font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-100 sm:mb-8 min-h-[1.2em]">
        {displayedEnd}
      </h1>
    </div>
  );
}
