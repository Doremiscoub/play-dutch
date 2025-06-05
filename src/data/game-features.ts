
import { PlayCircle, ClipboardList, BookOpen } from 'lucide-react';
import { GameFeature } from '@/types/game-features';

export const createGameFeatures = (navigate: (path: string) => void): GameFeature[] => [
  {
    icon: PlayCircle,
    title: "Jouer",
    description: "Commencez une partie épique avec vos amis",
    color: "fire",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-200",
    action: () => navigate('/game'),
    buttonText: "C'est parti !",
    buttonVariant: "primary",
    delay: 0.1,
    badge: "ACTION"
  },
  {
    icon: BookOpen,
    title: "Règles", 
    description: "Maîtrisez les techniques de champion",
    color: "water",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-200",
    action: () => navigate('/rules'),
    buttonText: "Apprendre",
    buttonVariant: "secondary",
    delay: 0.2,
    badge: "GUIDE"
  },
  {
    icon: ClipboardList,
    title: "Historique",
    description: "Revivez vos victoires légendaires",
    color: "electric",
    bgColor: "bg-yellow-500/10", 
    borderColor: "border-yellow-200",
    action: () => navigate('/history'),
    buttonText: "Explorer",
    buttonVariant: "accent",
    delay: 0.3,
    badge: "STATS"
  }
];
