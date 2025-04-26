
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 transition-all",
        "vision-glass": "bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm text-gray-800 hover:bg-white/80 transition-all hover:-translate-y-0.5",
        "dutch-glass": "bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm hover:bg-white/80",
        "vision-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90",
        "vision-purple": "bg-dutch-purple text-white hover:bg-dutch-purple/90",
        "vision-orange": "bg-dutch-orange text-white hover:bg-dutch-orange/90",
        "dutch-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90",
        "floating": "bg-white shadow-lg text-gray-800 hover:shadow-xl",
        "pill-glass": "rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm",
        "pill-orange": "rounded-full bg-dutch-orange text-white shadow-sm",
        "pill-blue": "rounded-full bg-dutch-blue text-white shadow-sm",
        "pill-sm": "text-xs px-2 py-1 rounded-full",
        "game-control": "bg-white/70 backdrop-blur-xl text-dutch-blue border border-dutch-blue/20 shadow-sm hover:bg-white/90",
        "glass": "btn-glass-y2k rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-md text-gray-800 hover:bg-white/80",
        "y2k": "btn-y2k rounded-2xl border-2 shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10",
        "2xl": "h-14 rounded-xl px-12 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "game-action": "h-16 text-lg font-medium",
        "pill-sm": "h-7 text-xs",
        "game-icon": "h-12 w-12",
      },
      elevated: {
        true: "shadow-md hover:shadow-lg transform-gpu hover:-translate-y-0.5 transition-all",
        false: "",
      },
      animated: {
        true: "transition-all duration-300 ease-in-out hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  elevated?: boolean;
  animated?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, elevated, animated, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, elevated, animated, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
