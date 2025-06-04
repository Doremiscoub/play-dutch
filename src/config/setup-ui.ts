
/**
 * Configuration UI pour l'écran de configuration de partie
 */
export const SETUP_UI = {
  card: {
    base: "rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md",
    content: "p-6",
    title: "text-xl font-semibold text-game-primary flex items-center gap-2",
    description: "text-gray-600",
    info: "bg-game-primary/5 rounded-xl p-4 text-sm text-gray-600"
  },
  player: {
    container: "flex items-center gap-3",
    number: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-game-primary to-game-secondary flex items-center justify-center text-white font-bold shadow-md",
    input: {
      wrapper: "relative flex-grow",
      glow: "absolute -inset-0.5 bg-gradient-to-r from-game-primary/10 to-game-secondary/10 rounded-lg blur opacity-30",
      base: "game-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
    }
  },
  counter: {
    container: "flex items-center justify-center gap-4",
    button: "border border-white/40 shadow-md",
    number: "text-3xl font-bold text-game-primary w-10 text-center"
  },
  action: {
    button: "w-full bg-gradient-to-r from-game-primary to-game-secondary text-white rounded-full"
  }
};
