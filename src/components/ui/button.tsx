
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform-gpu",
  {
    variants: {
      variant: {
        // ===== LIQUID GLASS APPLE VARIANTS =====
        liquidHeader: "lg-header lg-ultrathin lg-tint-primary-50 text-white font-semibold hover:lg-opacity-60 hover:lg-elevation-02 hover:-translate-y-0.5 active:lg-opacity-40 lg-hover-state rounded-xl",
        liquidCard: "lg-card lg-regular lg-tint-secondary-70 text-white font-medium hover:lg-opacity-80 hover:lg-elevation-03 hover:-translate-y-0.5 active:lg-opacity-60 lg-hover-state rounded-xl",
        liquidSheet: "lg-sheet lg-thick lg-tint-accent-60 text-white font-semibold hover:lg-opacity-70 hover:lg-elevation-04 hover:-translate-y-0.5 active:lg-opacity-50 lg-hover-state rounded-xl",
        liquidPopover: "lg-popover lg-tint-primary-70 text-white font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_8px_rgba(255,255,255,0.1)] hover:lg-opacity-80 hover:lg-elevation-03 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_12px_rgba(255,255,255,0.15)] lg-hover-state rounded-xl",
        
        // ===== ENHANCED TRINITY + KIDS VARIANTS =====
        trinity: "btn-kids-primary text-white font-bold hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-blue active:scale-95 lg-hover-state rounded-xl",
        default: "btn-kids-primary text-white font-bold hover:scale-105 hover:-translate-y-0.5 active:scale-95 lg-hover-state rounded-xl shadow-lg",
        kidsPrimary: "btn-kids-primary text-white font-bold hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-blue active:scale-95 lg-hover-state rounded-xl",
        kidsSecondary: "btn-kids-purple text-white font-bold hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-purple active:scale-95 lg-hover-state rounded-xl",
        kidsTertiary: "btn-kids-orange text-white font-bold hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-orange active:scale-95 lg-hover-state rounded-xl",
        fun: "btn-kids-fun text-white font-bold hover:scale-105 hover:-translate-y-0.5 hover:shadow-glow-rainbow active:scale-95 lg-hover-state rounded-xl",
        
        // ===== ENHANCED GLASS VARIANTS =====
        glass: "btn-glass-colored text-white font-semibold hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-glass-lg active:scale-[0.98] lg-hover-state rounded-xl",
        glassColored: "btn-glass-colored text-white font-semibold hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-glass-lg active:scale-[0.98] lg-hover-state rounded-xl",
        
        // ===== ENHANCED SYSTEM VARIANTS =====
        destructive: "bg-gradient-to-r from-red-400 to-red-600 text-white font-bold hover:from-red-500 hover:to-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:scale-95 lg-hover-state rounded-xl",
        outline: "border-2 border-kids-blue bg-kids-blue/20 backdrop-blur-lg text-white hover:bg-kids-blue/40 hover:border-kids-blue hover:-translate-y-0.5 lg-hover-state rounded-xl",
        secondary: "btn-kids-purple text-white hover:scale-105 hover:-translate-y-0.5 lg-hover-state rounded-xl",
        ghost: "bg-kids-blue/10 text-white hover:bg-kids-blue/20 hover:text-white hover:backdrop-blur-lg lg-hover-state rounded-xl",
        link: "text-kids-blue underline-offset-4 hover:underline hover:text-kids-purple",
        
        // ===== ENHANCED GAMING/SPECIAL VARIANTS =====
        gaming: "btn-kids-gaming text-white font-gaming text-xs tracking-wider uppercase hover:scale-110 hover:shadow-glow-rainbow active:scale-90 lg-hover-state rounded-xl",
        success: "btn-kids-lime text-white font-bold hover:scale-105 hover:shadow-glow-lime hover:-translate-y-0.5 active:scale-95 lg-hover-state rounded-xl",
        
        // ===== LEGACY COMPATIBILITY =====
        "dutch-primary": "btn-kids-primary text-white backdrop-blur-[12px] hover:scale-[1.02] lg-hover-state rounded-xl",
        "dutch-glass": "btn-glass-colored text-white backdrop-blur-[15px] lg-hover-state rounded-xl",
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
