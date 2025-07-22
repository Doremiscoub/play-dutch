
import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

type UnifiedCardVariant = "light" | "glass" | "elevated" | "subtle";
type UnifiedCardPadding = "sm" | "md" | "lg" | "xl";

interface UnifiedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: UnifiedCardVariant;
  padding?: UnifiedCardPadding;
  children: React.ReactNode;
}

const cardVariants = {
  light: "kidsBlue",
  glass: "glassColored",
  elevated: "elevated",
  subtle: "kidsPurple"
};

const paddingVariants = {
  sm: "p-4",
  md: "p-6", 
  lg: "p-8",
  xl: "p-10"
};

export const UnifiedCard = React.forwardRef<HTMLDivElement, UnifiedCardProps>(
  ({ className, variant = "light", padding = "md", children, ...props }, ref) => {
    console.log("UnifiedCard render:", { variant, mappedVariant: cardVariants[variant], padding });
    return (
      <Card
        ref={ref}
        variant={cardVariants[variant] as any}
        className={cn(
          paddingVariants[padding],
          "rounded-xl transition-all",
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
