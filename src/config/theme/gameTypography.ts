
/**
 * Game-inspired typography configuration
 * Inspired by UNO, Pokémon TCG, and Classic Cards
 */

export const GAME_TYPOGRAPHY = {
  // Game-inspired font stacks
  fontFamily: {
    // UNO-style: Bold, rounded headers
    game: ['"Fredoka One"', '"Nunito Black"', 'system-ui', 'sans-serif'],
    // Action text: Condensed, bold for buttons/CTAs  
    action: ['"Bebas Neue"', '"Oswald"', 'condensed', 'sans-serif'],
    // Numbers: Clear, game-like for scores
    score: ['"Orbitron"', '"Rajdhani"', 'monospace', 'sans-serif'],
    // Adventure: Dynamic titles with personality
    adventure: ['"Bangers"', '"Creepster"', 'fantasy', 'cursive'],
    // Body: Clean, readable
    body: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', 'system-ui', 'sans-serif'],
    // Classic: Elegant serif for traditional elements
    classic: ['"Playfair Display"', '"Georgia"', 'serif']
  },

  // Game-inspired font sizes
  fontSize: {
    'game-xs': '0.75rem',      // 12px - small UI text
    'game-sm': '0.875rem',     // 14px - body text
    'game-base': '1rem',       // 16px - default
    'game-lg': '1.125rem',     // 18px - large body
    'game-xl': '1.25rem',      // 20px - small headers
    'game-2xl': '1.5rem',      // 24px - card titles
    'game-3xl': '1.875rem',    // 30px - section headers
    'game-4xl': '2.25rem',     // 36px - page headers
    'game-5xl': '3rem',        // 48px - hero titles
    'game-6xl': '3.75rem',     // 60px - display titles
    'game-7xl': '4.5rem',      // 72px - huge displays
    'score-sm': '1.5rem',      // 24px - small scores
    'score-md': '2.5rem',      // 40px - medium scores
    'score-lg': '4rem',        // 64px - large scores
    'score-xl': '6rem'         // 96px - display scores
  },

  // Game-inspired font weights
  fontWeight: {
    'game-light': 300,
    'game-normal': 400,
    'game-medium': 500,
    'game-semibold': 600,
    'game-bold': 700,
    'game-extrabold': 800,
    'game-black': 900
  },

  // Text styles for different game elements
  textStyles: {
    // Hero titles - adventure game style
    hero: {
      fontFamily: 'adventure',
      fontSize: 'game-6xl',
      fontWeight: 'game-black',
      lineHeight: '1',
      letterSpacing: '-0.02em'
    },
    // Game headers - UNO style
    gameHeader: {
      fontFamily: 'game',
      fontSize: 'game-4xl',
      fontWeight: 'game-bold',
      lineHeight: '1.1',
      letterSpacing: '-0.01em'
    },
    // Action buttons - condensed style
    actionButton: {
      fontFamily: 'action',
      fontSize: 'game-lg',
      fontWeight: 'game-bold',
      lineHeight: '1',
      letterSpacing: '0.05em',
      textTransform: 'uppercase'
    },
    // Score displays - clear numbers
    scoreDisplay: {
      fontFamily: 'score',
      fontSize: 'score-md',
      fontWeight: 'game-bold',
      lineHeight: '1',
      letterSpacing: '0.02em'
    },
    // Card text - classic style
    cardText: {
      fontFamily: 'classic',
      fontSize: 'game-base',
      fontWeight: 'game-medium',
      lineHeight: '1.4'
    }
  }
};

// CSS custom properties for dynamic use
export const GAME_CSS_VARS = {
  '--font-game': GAME_TYPOGRAPHY.fontFamily.game.join(', '),
  '--font-action': GAME_TYPOGRAPHY.fontFamily.action.join(', '),
  '--font-score': GAME_TYPOGRAPHY.fontFamily.score.join(', '),
  '--font-adventure': GAME_TYPOGRAPHY.fontFamily.adventure.join(', '),
  '--font-body': GAME_TYPOGRAPHY.fontFamily.body.join(', '),
  '--font-classic': GAME_TYPOGRAPHY.fontFamily.classic.join(', ')
};
