"use client";

import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mediaQuery = window.matchMedia(query);
    const handler = () => onChange();
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
