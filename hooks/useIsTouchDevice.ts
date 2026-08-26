"use client";

import { useSyncExternalStore } from "react";

function getTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export function useIsTouchDevice() {
  return useSyncExternalStore(
    (onChange) => {
      const handler = () => onChange();
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    },
    getTouchDevice,
    () => false
  );
}
