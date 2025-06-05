
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
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Dutch game variants
        "dutch-primary": "bg-dutch-primary text-white hover:bg-dutch-primary/90 shadow-sm",
        "dutch-secondary": "bg-dutch-secondary text-white hover:bg-dutch-secondary/90 shadow-sm",
        "dutch-accent": "bg-dutch-accent text-white hover:bg-dutch-accent/90 shadow-sm",
        "dutch-glass": "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80",
        
        // Legacy variants for compatibility
        "gradient": "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90",
        "glass": "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80",
        "vision-glass": "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-800 hover:bg-white/70",
        "pill-glass": "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-800 hover:bg-white/70 rounded-full",
        "game-control": "bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-sm",
        "y2k-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-sm"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        
        // Legacy sizes for compatibility
        "pill-sm": "h-8 rounded-full px-4 text-xs"
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
