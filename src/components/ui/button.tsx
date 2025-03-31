
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
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
        gradient: "bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600",
        "ios-blue": "bg-ios-blue text-white hover:bg-ios-blue/90 rounded-xl shadow-sm",
        "ios-green": "bg-ios-green text-white hover:bg-ios-green/90 rounded-xl shadow-sm",
        "ios-red": "bg-ios-red text-white hover:bg-ios-red/90 rounded-xl shadow-sm",
        "ios-outline": "border border-ios-gray/20 bg-white/80 text-ios-blue hover:bg-ios-light-gray/30 rounded-xl shadow-sm",
        "dutch-blue": "bg-dutch-blue text-white hover:bg-dutch-blue/90 rounded-xl shadow-sm",
        "dutch-orange": "bg-dutch-orange text-white hover:bg-dutch-orange/90 rounded-xl shadow-sm",
        "dutch-purple": "bg-dutch-purple text-white hover:bg-dutch-purple/90 rounded-xl shadow-sm",
        "dutch-outline": "border border-gray-200/60 bg-white/80 text-dutch-blue hover:bg-gray-100/50 rounded-xl shadow-sm",
        "dutch-glass": "bg-white/40 backdrop-blur-sm border border-white/30 text-gray-700 hover:bg-white/50 rounded-xl shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-md",
        "2xl": "h-14 rounded-md px-8 text-lg",
      },
      glassmorphism: {
        true: "backdrop-blur-md bg-white/10 border border-white/30",
        false: "",
      },
      elevated: {
        true: "shadow-md hover:shadow-lg transition-shadow",
        false: "",
      },
      animated: {
        true: "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
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
  ({ className, variant, size, glassmorphism, elevated, animated, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glassmorphism, elevated, animated, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
