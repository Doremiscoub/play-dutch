
export type GameFeatureColor = "fire" | "water" | "electric" | "grass" | "psychic" | "ice";

export interface GameFeature {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: GameFeatureColor;
  bgColor: string;
  borderColor: string;
  action: () => void;
  buttonText: string;
  buttonVariant: "primary" | "secondary" | "accent";
  delay: number;
  badge: string;
}
