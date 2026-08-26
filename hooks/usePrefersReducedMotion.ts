"use client";

import { useSyncExternalStore } from "react";

export function usePrefersReducedMotion() {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const getServerSnapshot = () => false;

  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => onChange();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
