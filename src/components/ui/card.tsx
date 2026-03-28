
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-xl border bg-card text-card-foreground transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border shadow-sm",
        elevated: "border-border/50 shadow-md hover:shadow-lg",
        glass: "bg-white/85 backdrop-blur-md border-white/60 shadow-sm",
        ghost: "border-transparent shadow-none bg-transparent",

        // Legacy compat — all map to clean variants
        liquidHeader: "border-border/50 shadow-sm",
        liquidCard: "border-border/50 shadow-md",
        liquidSheet: "border-border/50 shadow-md",
        liquidPopover: "border-border/50 shadow-md",
        glassColored: "bg-white/85 backdrop-blur-md border-white/60 shadow-sm",
        kidsBlue: "border-blue-200 bg-blue-50/50",
        kidsPurple: "border-purple-200 bg-purple-50/50",
        kidsOrange: "border-orange-200 bg-orange-50/50",
        kidsPink: "border-pink-200 bg-pink-50/50",
        kidsLime: "border-green-200 bg-green-50/50",
        kidsTurquoise: "border-teal-200 bg-teal-50/50",
        gaming: "border-border/50 shadow-md",
        fun: "border-border/50 shadow-md",
        elevated2: "border-border/50 shadow-lg",
        subtle: "border-border/40 bg-muted/30",
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
      "text-lg font-semibold leading-none tracking-tight",
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
