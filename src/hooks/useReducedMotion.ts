
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const getPreference = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [shouldReduce, setShouldReduce] = useState<boolean>(getPreference);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setShouldReduce(mediaQuery.matches);
    
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return shouldReduce;
}
