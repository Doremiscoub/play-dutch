
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-800 hover:bg-white/90 shadow-sm",
        primary: "bg-dutch-blue text-white hover:bg-dutch-blue/90 shadow-sm",
        secondary: "bg-dutch-blue/10 text-dutch-blue hover:bg-dutch-blue/20 shadow-sm",
        outline: "border border-white/30 bg-white/60 backdrop-blur-sm hover:bg-white/70 hover:text-gray-900 shadow-sm",
        ghost: "bg-transparent hover:bg-white/60 text-gray-700 hover:text-gray-900",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        link: "text-dutch-blue underline-offset-4 hover:underline bg-transparent",
        primary_gradient: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 shadow-sm",
        gradient: "bg-gradient-to-r from-dutch-blue to-dutch-purple text-white hover:opacity-90 shadow-sm",
        dropdown: "bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-sm",
        ios: "bg-white/70 backdrop-blur-md border border-white/40 text-gray-800 shadow-sm hover:bg-white/80",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-xl",
        xs: "h-7 rounded-xl px-2.5 text-xs",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-xl px-6",
        xl: "h-12 rounded-xl px-8 text-base",
        "2xl": "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-xl",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
      iconPosition: {
        left: "[&_svg]:order-first",
        right: "[&_svg]:order-last",
      },
      glassmorphism: {
        true: "bg-white/70 backdrop-blur-md border border-white/40",
      },
      elevated: {
        true: "shadow-md hover:shadow-lg active:shadow-sm transition-shadow",
      },
      rounded: {
        default: "rounded-xl",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
    },
    compoundVariants: [
      {
        variant: ["default", "primary", "secondary", "outline", "ghost", "destructive"],
        glassmorphism: true,
        className: "bg-white/70 backdrop-blur-md border border-white/40",
      },
      {
        size: ["icon", "icon-sm", "icon-lg"],
        className: "p-0 aspect-square flex-shrink-0 flex-grow-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      iconPosition: "left",
      glassmorphism: false,
      elevated: false,
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, iconPosition, glassmorphism, elevated, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, iconPosition, glassmorphism, elevated, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
