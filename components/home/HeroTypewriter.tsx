"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, useGSAP);

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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = gsap.utils.toArray<HTMLElement>(".hero-line", headingRef.current);
      const splits = lines.map((line) =>
        SplitText.create(line, { type: "words", wordsClass: "hero-word", mask: "words" }),
      );
      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

      splits.forEach((split, index) => {
        timeline.fromTo(
          split.words,
          { autoAlpha: 0, yPercent: 110, filter: "blur(7px)" },
          {
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.065,
            clearProps: "filter,transform,opacity,visibility",
          },
          index * 0.14,
        );
      });

      return () => splits.forEach((split) => split.revert());
    },
    {
      scope: headingRef,
      dependencies: [titleStart, titleHighlight, titleEnd],
      revertOnUpdate: true,
    },
  );

  return (
    <h1 ref={headingRef} className="hero-title-wrap mb-6 max-w-4xl font-heading">
      <span className="hero-line hero-line--soft">{titleStart}</span>
      <span className="hero-line hero-line--highlight">{titleHighlight}</span>
      <span className="hero-line hero-line--subtle">{titleEnd}</span>
    </h1>
  );
}
