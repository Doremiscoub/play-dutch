
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

// Updated with the new professor image from uploads
export const PROFESSOR_SOURCE = '/lovable-uploads/4374ea3c-9e56-4f21-8c9c-cd399f89300d.png';
export const PROFESSOR_FALLBACK = '/lovable-uploads/4374ea3c-9e56-4f21-8c9c-cd399f89300d.png';
