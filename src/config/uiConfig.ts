
export type ThemeColor = 'blue' | 'green' | 'purple' | 'pink' | 'red';

export interface UIConfig {
  colors: {
    dutch: {
      blue: string;
      purple: string;
      pink: string;
      orange: string;
      yellow: string;
      green: string;
      red: string;
    };
    gradients: {
      blue: string;
      purple: string;
      orange: string;
      yellow: string;
      multicolor: string;
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      danger: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
      success: string;
      warning: string;
      danger: string;
    };
  };
  animations: {
    default: {
      duration: number;
      easing: string;
    };
    fast: {
      duration: number;
      easing: string;
    };
    slow: {
      duration: number;
      easing: string;
    };
    spring: {
      stiffness: number;
      damping: number;
    };
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    inner: string;
    focus: string;
  };
  glassmorphism: {
    light: string;
    medium: string;
    strong: string;
  };
}

const uiConfig: UIConfig = {
  colors: {
    dutch: {
      blue: '#1EAEDB',
      purple: '#8B5CF6',
      pink: '#EC4899',
      orange: '#F97316',
      yellow: '#F59E0B',
      green: '#10B981',
      red: '#EF4444'
    },
    gradients: {
      blue: 'from-dutch-blue to-dutch-purple',
      purple: 'from-dutch-purple to-dutch-pink',
      orange: 'from-dutch-orange to-dutch-red',
      yellow: 'from-dutch-yellow to-dutch-orange',
      multicolor: 'from-dutch-blue via-dutch-purple to-dutch-pink',
      primary: 'from-dutch-blue to-dutch-purple',
      secondary: 'from-dutch-orange to-dutch-pink',
      success: 'from-dutch-green to-teal-500',
      warning: 'from-dutch-yellow to-dutch-orange',
      danger: 'from-dutch-red to-rose-500'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
      success: 'text-dutch-green',
      warning: 'text-dutch-orange',
      danger: 'text-dutch-red'
    }
  },
  animations: {
    default: {
      duration: 0.3,
      easing: 'ease-in-out'
    },
    fast: {
      duration: 0.15,
      easing: 'ease-out'
    },
    slow: {
      duration: 0.6,
      easing: 'ease-in-out'
    },
    spring: {
      stiffness: 300,
      damping: 30
    }
  },
  fonts: {
    heading: 'font-sans',
    body: 'font-sans',
    mono: 'font-mono'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    xs: '0.125rem',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '2rem',
    full: '9999px'
  },
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-md',
    xl: 'shadow-lg',
    inner: 'shadow-inner',
    focus: 'ring-2 ring-dutch-blue/50 ring-offset-2'
  },
  glassmorphism: {
    light: 'bg-white/30 backdrop-blur-sm',
    medium: 'bg-white/50 backdrop-blur-md',
    strong: 'bg-white/70 backdrop-blur-lg'
  }
};

export default uiConfig;
