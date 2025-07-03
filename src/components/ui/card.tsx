
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "rounded-lg text-card-foreground shadow-sm transition-all lg-hover-state",
  {
    variants: {
      variant: {
        // ===== LIQUID GLASS APPLE VARIANTS =====
        liquidHeader: "lg-header lg-ultrathin lg-tint-primary-50 text-white backdrop-blur-[4px] rounded-xl animate-lg-reveal",
        liquidCard: "lg-card lg-regular lg-tint-secondary-70 text-white backdrop-blur-[12px] hover:lg-elevation-03 hover:-translate-y-0.5 rounded-2xl",
        liquidSheet: "lg-sheet lg-thick lg-tint-accent-60 text-white backdrop-blur-[16px] hover:lg-elevation-04 hover:-translate-y-0.5 rounded-2xl",
        liquidPopover: "lg-popover lg-tint-primary-70 text-white backdrop-blur-[12px] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_8px_rgba(255,255,255,0.1)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_12px_rgba(255,255,255,0.15)] rounded-xl",
        
        // ===== ENHANCED KIDS VARIANTS WITH APPLE POLISH =====
        default: "card-glass-colored text-white backdrop-blur-[15px] hover:shadow-glass-lg hover:-translate-y-0.5 rounded-2xl",
        glass: "card-glass-colored text-white backdrop-blur-[15px] hover:shadow-glass-lg hover:-translate-y-0.5 rounded-2xl",
        glassColored: "card-glass-colored text-white backdrop-blur-[15px] hover:shadow-glass-lg hover:-translate-y-0.5 rounded-2xl",
        kidsBlue: "card-kids-blue text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-blue hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        kidsPurple: "card-kids-purple text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-purple hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        kidsOrange: "card-kids-orange text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-orange hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        kidsPink: "card-kids-pink text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-pink hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        kidsLime: "card-kids-lime text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-lime hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        kidsTurquoise: "card-kids-turquoise text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-turquoise hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        gaming: "card-kids-gaming text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-rainbow hover:scale-[1.02] hover:backdrop-blur-[14px] rounded-2xl",
        fun: "card-kids-fun text-white shadow-lg backdrop-blur-[12px] hover:shadow-glow-rainbow hover:-translate-y-0.5 hover:backdrop-blur-[14px] rounded-2xl",
        
        // ===== SYSTEM VARIANTS =====
        elevated: "bg-background border border-border shadow-lg lg-elevation-02 hover:lg-elevation-03 hover:-translate-y-0.5 rounded-3xl",
        subtle: "card-glass-colored text-white backdrop-blur-[15px] border border-white/30 hover:border-white/50 hover:-translate-y-0.5 rounded-2xl"
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
