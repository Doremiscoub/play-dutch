
export interface ProfessorAvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  animate?: boolean;
  mood?: 'happy' | 'excited' | 'thinking' | 'surprised' | 'neutral';
  showParticles?: boolean;
}

export type MoodAnimations = {
  [K in NonNullable<ProfessorAvatarProps['mood']>]: {
    rotate: number[];
    scale: number[];
  };
};

export type MoodColors = {
  [K in NonNullable<ProfessorAvatarProps['mood']>]: string;
};

export type SizeClasses = {
  [K in NonNullable<ProfessorAvatarProps['size']>]: string;
};

// URLs corrigées - utiliser l'image qui existe réellement dans public/
export const PROFESSOR_SOURCE = '/professor.png';
export const PROFESSOR_FALLBACK = '/professor.png'; // Même image comme fallback pour l'instant
