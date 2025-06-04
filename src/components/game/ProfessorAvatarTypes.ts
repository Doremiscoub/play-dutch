
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
export const PROFESSOR_SOURCE = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png';
export const PROFESSOR_FALLBACK = '/lovable-uploads/a2234ca1-7b29-4c32-8167-2ff6be271875.png';
