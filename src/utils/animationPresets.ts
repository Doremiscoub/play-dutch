// Shared animation presets for consistent motion across the app
export const ANIMATION_DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

export const SPRING_PRESETS = {
  gentle: { type: 'spring' as const, stiffness: 200, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15 },
  stiff: { type: 'spring' as const, stiffness: 400, damping: 25 },
} as const;

export const FADE_IN = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
} as const;

export const SLIDE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
} as const;

export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
} as const;

// Use this to disable animations when user prefers reduced motion
export const getReducedMotionProps = (prefersReducedMotion: boolean) => {
  if (prefersReducedMotion) {
    return { initial: false, animate: undefined, exit: undefined, transition: { duration: 0 } };
  }
  return {};
};
