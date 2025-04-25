
/**
 * Configuration UI pour l'écran de configuration de partie
 */
export const SETUP_UI = {
  card: {
    base: "rounded-3xl border border-white/50 bg-white/80 backdrop-blur-md shadow-md",
    content: "p-6",
    title: "text-xl font-semibold text-dutch-blue flex items-center gap-2",
    description: "text-gray-600",
    info: "bg-dutch-blue/5 rounded-xl p-4 text-sm text-gray-600"
  },
  player: {
    container: "flex items-center gap-3",
    number: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-dutch-blue to-dutch-purple flex items-center justify-center text-white font-bold shadow-md",
    input: {
      wrapper: "relative flex-grow",
      glow: "absolute -inset-0.5 bg-gradient-to-r from-dutch-blue/10 to-dutch-purple/10 rounded-lg blur opacity-30",
      base: "dutch-input border border-white/40 shadow-sm relative z-10 backdrop-blur-sm"
    }
  },
  counter: {
    container: "flex items-center justify-center gap-4",
    button: "border border-white/40 shadow-md",
    number: "text-3xl font-bold text-dutch-blue w-10 text-center"
  },
  action: {
    button: "w-full bg-gradient-to-r from-dutch-blue to-dutch-purple text-white rounded-full"
  }
};
