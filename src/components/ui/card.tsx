
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-lg text-card-foreground shadow-sm transition-all",
  {
    variants: {
      variant: {
        default: "card-glass-colored text-white backdrop-blur-lg",
        glass: "card-glass-colored text-white backdrop-blur-lg",
        glassColored: "card-glass-colored text-white backdrop-blur-lg",
        kidsBlue: "card-kids-blue text-white shadow-lg backdrop-blur-lg",
        kidsPurple: "card-kids-purple text-white shadow-lg backdrop-blur-lg",
        kidsOrange: "card-kids-orange text-white shadow-lg backdrop-blur-lg",
        kidsPink: "card-kids-pink text-white shadow-lg backdrop-blur-lg",
        kidsLime: "card-kids-lime text-white shadow-lg backdrop-blur-lg",
        kidsTurquoise: "card-kids-turquoise text-white shadow-lg backdrop-blur-lg",
        gaming: "card-kids-gaming text-white shadow-lg backdrop-blur-lg",
        fun: "card-kids-fun text-white shadow-lg backdrop-blur-lg",
        elevated: "bg-background border border-border shadow-lg rounded-3xl",
        subtle: "card-glass-colored text-white backdrop-blur-lg border border-white/30"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
