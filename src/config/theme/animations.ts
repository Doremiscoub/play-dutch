
/**
 * Configuration des animations - Inspirées iOS/VisionOS
 */
export const ANIMATIONS = {
  duration: {
    fastest: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slowest: '0.8s',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    dynamicIsland: 'cubic-bezier(0.33, 1, 0.68, 1)',
  },
  transition: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    button: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

