
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        // Kids System - Boutons colorés et visibles
        default: "btn-kids-primary text-white font-bold hover:scale-105 hover:-translate-y-1 active:scale-95 rounded-xl shadow-lg",
        kidsPrimary: "btn-kids-blue text-white font-bold hover:scale-105 hover:-translate-y-1 hover:shadow-glow-blue active:scale-95 rounded-xl",
        kidsSecondary: "btn-kids-purple text-white font-bold hover:scale-105 hover:-translate-y-1 hover:shadow-glow-purple active:scale-95 rounded-xl",
        kidsTertiary: "btn-kids-orange text-white font-bold hover:scale-105 hover:-translate-y-1 hover:shadow-glow-orange active:scale-95 rounded-xl",
        fun: "btn-kids-fun text-white font-bold hover:scale-105 hover:-translate-y-1 hover:shadow-glow-rainbow active:scale-95 rounded-xl",
        
        // Glass coloré - Remplace l'ancien glass transparent
        glass: "btn-glass-colored text-white font-semibold backdrop-blur-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] rounded-xl",
        glassColored: "btn-glass-colored text-white font-semibold backdrop-blur-lg hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] rounded-xl",
        
        // Trinity amélioré
        trinity: "btn-kids-primary text-white font-bold shadow-glow-blue hover:scale-105 hover:shadow-glow-rainbow rounded-xl",
        
        // Enhanced variants colorés
        destructive: "bg-gradient-to-r from-red-400 to-red-600 text-white font-bold hover:from-red-500 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-red-500/30 rounded-xl",
        outline: "border-2 border-kids-blue bg-kids-blue/20 backdrop-blur-lg text-white hover:bg-kids-blue/40 hover:border-kids-blue hover:-translate-y-1 rounded-xl",
        secondary: "btn-kids-purple text-white hover:scale-105 hover:-translate-y-0.5 rounded-xl",
        ghost: "hover:bg-kids-blue/20 hover:text-white hover:backdrop-blur-lg rounded-xl",
        link: "text-kids-blue underline-offset-4 hover:underline hover:text-kids-purple",
        
        // Gaming variants
        gaming: "btn-kids-gaming text-white font-gaming text-xs tracking-wider uppercase hover:scale-110 hover:shadow-glow-rainbow rounded-xl",
        success: "btn-kids-lime text-white font-bold hover:scale-105 hover:shadow-glow-lime rounded-xl",
        
        // Legacy compatibility (maintenant colorés)
        "dutch-primary": "btn-kids-primary text-white hover:scale-[1.02] rounded-xl",
        "dutch-glass": "btn-glass-colored text-white rounded-xl",
        "gradient": "trinity",
        "vision-glass": "glassColored",
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
