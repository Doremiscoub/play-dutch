
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Base variants
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // Dutch theme variants
        primary: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 shadow-md hover:shadow-lg",
        accent: "bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-md hover:shadow-lg",
        
        // Glass variants
        glass: "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 shadow-sm hover:shadow-md",
        "glass-light": "bg-white/60 backdrop-blur-xl border border-white/40 text-gray-800 hover:bg-white/75",
        
        // Gaming variants
        legendary: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-yellow-900 shadow-lg hover:shadow-xl border-2 border-yellow-300 font-bold",
        shiny: "bg-gradient-to-r from-gray-300 via-white to-gray-300 text-gray-800 shadow-lg hover:shadow-xl border-2 border-gray-200 font-semibold",
        
        // Flat variants
        flat: "bg-dutch-blue text-white rounded-full shadow-sm hover:shadow-md",
        "flat-secondary": "bg-dutch-purple text-white rounded-full shadow-sm hover:shadow-md",
        "flat-accent": "bg-dutch-orange text-white rounded-full shadow-sm hover:shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-md",
        sm: "h-9 px-3 rounded-md text-sm",
        lg: "h-11 px-8 rounded-md",
        xl: "h-12 px-10 rounded-md text-lg",
        "2xl": "h-14 px-12 rounded-xl text-lg",
        icon: "h-10 w-10 rounded-md",
        "icon-sm": "h-8 w-8 rounded-md",
        "icon-lg": "h-12 w-12 rounded-md",
        pill: "px-6 py-2 rounded-full",
        "pill-sm": "h-7 px-3 rounded-full text-xs",
      },
      animated: {
        true: "hover:-translate-y-0.5 active:translate-y-0 transition-transform",
        false: "",
      },
      elevated: {
        true: "shadow-md hover:shadow-lg",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animated: false,
      elevated: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animated, elevated, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animated, elevated, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
