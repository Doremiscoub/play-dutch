
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

export const PROFESSOR_SOURCE = '/lovable-uploads/f78df6b3-591c-497c-b2d2-516b2fb7b5a4.png';
export const PROFESSOR_FALLBACK = '/professor.png';
