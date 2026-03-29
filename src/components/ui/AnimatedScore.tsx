import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedScoreProps {
  score: number;
  previousScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showDelta?: boolean;
  highlight?: boolean;
}

const sizeStyles = {
  sm: "text-lg font-semibold",
  md: "text-3xl font-bold",
  lg: "text-5xl font-extrabold",
} as const;

const deltaSizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

/**
 * A springy, game-feel animated score counter.
 *
 * - Numbers roll up/down with spring physics
 * - A +N / -N delta badge floats up and fades out
 * - The background flashes red (score went up = bad) or green (score went down = good)
 * - An optional highlight glow pulses dutch-blue when the value is fresh
 */
function AnimatedScore({
  score,
  previousScore,
  size = "md",
  className,
  showDelta = true,
  highlight = false,
}: AnimatedScoreProps) {
  const delta = previousScore !== undefined ? score - previousScore : 0;
  const hasDelta = delta !== 0;

  // ---- animated number via spring ----
  const spring = useSpring(previousScore ?? score, {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });

  const displayed = useTransform(spring, (v) => Math.round(v));
  const [displayedValue, setDisplayedValue] = useState(score);

  useEffect(() => {
    spring.set(score);
  }, [score, spring]);

  useEffect(() => {
    const unsubscribe = displayed.on("change", (v) => setDisplayedValue(v));
    return unsubscribe;
  }, [displayed]);

  // ---- flash key so AnimatePresence re-triggers on each change ----
  const flashKey = useRef(0);
  useEffect(() => {
    if (hasDelta) flashKey.current += 1;
  }, [score]); // eslint-disable-line react-hooks/exhaustive-deps

  const flashColor =
    delta > 0
      ? "rgba(239, 68, 68, 0.25)" // red-500 @ 25%
      : "rgba(16, 185, 129, 0.25)"; // emerald-500 @ 25%

  return (
    <motion.div
      className={cn("relative inline-flex items-center justify-center", className)}
    >
      {/* background flash */}
      <AnimatePresence>
        {hasDelta && (
          <motion.div
            key={`flash-${flashKey.current}`}
            className="absolute inset-0 rounded-xl"
            initial={{ backgroundColor: flashColor, scale: 1.15 }}
            animate={{ backgroundColor: "rgba(0,0,0,0)", scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ zIndex: 0, pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>

      {/* highlight glow ring */}
      {highlight && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ boxShadow: "0 0 0px 0px hsl(var(--dutch-blue) / 0)" }}
          animate={{
            boxShadow: [
              "0 0 8px 2px hsl(var(--dutch-blue) / 0.5)",
              "0 0 20px 6px hsl(var(--dutch-blue) / 0.25)",
              "0 0 8px 2px hsl(var(--dutch-blue) / 0.5)",
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: 0, pointerEvents: "none" }}
        />
      )}

      {/* the score number */}
      <motion.span
        className={cn(
          "relative z-10 tabular-nums tracking-tight",
          sizeStyles[size],
        )}
        // little bounce when value lands
        key={score}
        initial={{ scale: hasDelta ? 1.2 : 1, y: hasDelta ? -2 : 0 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        {displayedValue}
      </motion.span>

      {/* delta indicator */}
      <AnimatePresence>
        {showDelta && hasDelta && (
          <motion.span
            key={`delta-${flashKey.current}`}
            className={cn(
              "absolute -top-1 -right-1 z-20 font-bold pointer-events-none select-none",
              deltaSizeStyles[size],
              delta > 0 ? "text-red-500" : "text-emerald-500",
            )}
            initial={{ opacity: 1, y: 0, scale: 1.1 }}
            animate={{ opacity: 0, y: -24, scale: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {delta > 0 ? `+${delta}` : delta}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export { AnimatedScore };
export type { AnimatedScoreProps };
