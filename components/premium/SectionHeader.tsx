"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

import { BlurRevealText, SplitWordReveal } from "./TextAnimations";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  dark = false,
  className,
  children,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cn("mb-16 md:mb-20", className)}>
      <div
        className={cn(
          "space-y-4",
          align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl text-left rtl:text-right"
        )}
      >
        {badge && (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-transform duration-300 hover:scale-105",
              dark
                ? "border border-red-500/30 bg-red-500/10 text-red-200"
                : "border border-red-200/80 bg-red-50 text-[var(--color-primary)]"
            )}
          >
            {badge}
          </span>
        )}
        <h2
          className={cn(
            "font-heading text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl transition-colors duration-300",
            dark ? "text-white" : "text-gray-900"
          )}
        >
          <SplitWordReveal text={title} />
        </h2>
        {description && (
          <BlurRevealText delay={0.15}>
            <p
              className={cn(
                "text-base leading-relaxed sm:text-lg font-medium",
                dark ? "text-gray-300" : "text-gray-600"
              )}
            >
              {description}
            </p>
          </BlurRevealText>
        )}
        {children}
      </div>
    </ScrollReveal>
  );
}
