
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
  light: "bg-white/80 backdrop-blur-md border border-white/50 shadow-sm",
  glass: "bg-white/60 backdrop-blur-xl border border-white/40 shadow-md",
  elevated: "bg-white shadow-lg border border-gray-200",
  subtle: "bg-gray-50/80 border border-gray-200/50"
};

const paddingVariants = {
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
        className={cn(
          cardVariants[variant],
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
