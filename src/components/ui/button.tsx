
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        // Dutch Trinity System
        default: "btn-glass-trinity text-white font-semibold hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] rounded-xl",
        glass: "btn-glass text-foreground font-medium hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] rounded-xl",
        trinity: "bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-orange-500 text-white font-bold shadow-trinity hover:scale-105 rounded-xl",
        
        // Enhanced variants
        destructive: "bg-gradient-to-r from-error to-error-dark text-white hover:from-error-dark hover:to-error shadow-lg hover:shadow-error/30 rounded-xl",
        outline: "border-2 border-glass-border-light bg-glass-light/50 backdrop-blur-lg text-foreground hover:bg-glass-light hover:border-glass-border-medium hover:-translate-y-1 rounded-xl",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5 rounded-xl",
        ghost: "hover:bg-glass-light/60 hover:text-trinity-blue-500 hover:backdrop-blur-lg rounded-xl",
        link: "text-trinity-blue-500 underline-offset-4 hover:underline hover:text-trinity-blue-600",
        
        // Gaming variants
        gaming: "bg-gradient-to-r from-trinity-purple-500 to-trinity-blue-500 text-white font-gaming text-xs tracking-wider uppercase hover:scale-105 shadow-glow-purple rounded-xl",
        success: "bg-gradient-to-r from-success to-success-dark text-white hover:from-success-dark hover:to-success shadow-lg hover:shadow-success/30 rounded-xl",
        
        // Legacy compatibility (mapped to new system)
        "dutch-primary": "btn-glass-trinity text-white hover:scale-[1.02] rounded-xl",
        "dutch-glass": "btn-glass text-foreground rounded-xl",
        "gradient": "trinity",
        "vision-glass": "glass",
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
