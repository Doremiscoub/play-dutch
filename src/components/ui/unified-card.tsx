
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "./card"

type UnifiedCardVariant = "light" | "glass" | "elevated" | "subtle";
type UnifiedCardPadding = "sm" | "md" | "lg" | "xl";

interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: UnifiedCardVariant;
  padding?: UnifiedCardPadding;
  children: React.ReactNode;
}

const cardVariants: Record<UnifiedCardVariant, string> = {
  light: "default",
  glass: "glass",
  elevated: "elevated",
  subtle: "ghost"
};

const paddingVariants: Record<UnifiedCardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10"
};

export const UnifiedCard = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({ className, variant = "light", padding = "md", children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant={cardVariants[variant] as any}
        className={cn(
          paddingVariants[padding],
          className
        )}
        {...props}
      >
        {children}
      </Card>
    )
  }
)
UnifiedCard.displayName = "UnifiedCard"
