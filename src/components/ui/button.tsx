
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90",
        "ios-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-sm",
        "ios-purple": "bg-dutch-purple text-white hover:bg-dutch-purple/90 shadow-sm",
        "ios-orange": "bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-sm",
        "ios-outline": "border border-white/40 bg-white/60 backdrop-blur-xl text-gray-700 hover:bg-white/70 shadow-sm",
        "ios-glass": "bg-white/70 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/80 shadow-sm",
        "vision-glass": "bg-white/60 backdrop-blur-xl border border-white/50 text-gray-800 hover:bg-white/70 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow-sm",
        "vision-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow-sm",
        "vision-purple": "bg-dutch-purple text-white hover:bg-dutch-purple/90 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow-sm",
        "vision-orange": "bg-dutch-orange text-white hover:bg-dutch-orange/90 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0.5 active:shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-xl px-8 text-base",
        "2xl": "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12 text-lg",
      },
      rounded: {
        default: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
        full: "rounded-full",
      },
      glassmorphism: {
        true: "backdrop-blur-xl bg-white/60 border border-white/50",
        false: "",
      },
      elevated: {
        true: "shadow-sm hover:shadow-md transition-shadow",
        false: "",
      },
      animated: {
        true: "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0.5",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "lg",
      glassmorphism: false,
      elevated: false,
      animated: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, glassmorphism, elevated, animated, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, glassmorphism, elevated, animated, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
