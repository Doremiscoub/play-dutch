
import * as React from "react"
import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type UnifiedButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "glass";
type UnifiedButtonSize = "sm" | "md" | "lg" | "xl";

interface UnifiedButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  variant?: UnifiedButtonVariant;
  size?: UnifiedButtonSize;
}

const variantMap: Record<UnifiedButtonVariant, string> = {
  primary: "kidsPrimary",
  secondary: "kidsSecondary", 
  accent: "kidsTertiary",
  ghost: "ghost",
  glass: "glassColored"
};

const sizeMap: Record<UnifiedButtonSize, string> = {
  sm: "sm",
  md: "default",
  lg: "lg", 
  xl: "xl"
};

export const UnifiedButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    console.log("UnifiedButton render:", { variant, mappedVariant: variantMap[variant], size, mappedSize: sizeMap[size] });
    return (
      <Button
        ref={ref}
        variant={variantMap[variant] as any}
        size={sizeMap[size] as any}
        className={cn(className)}
        {...props}
      />
    )
  }
)
UnifiedButton.displayName = "UnifiedButton"
