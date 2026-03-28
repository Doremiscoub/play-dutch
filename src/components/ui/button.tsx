
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent/10 hover:text-accent-foreground",
        ghost:
          "hover:bg-accent/10 hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        // Brand variants
        trinity:
          "bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(258,90%,66%)] text-white hover:from-[hsl(221,83%,46%)] hover:to-[hsl(258,90%,58%)] shadow-sm",
        accent:
          "bg-accent text-accent-foreground hover:bg-[hsl(25,95%,46%)] shadow-sm",
        success:
          "bg-[hsl(142,71%,45%)] text-white hover:bg-[hsl(142,71%,38%)] shadow-sm",

        // Legacy compat aliases — map to clean variants
        kidsPrimary: "bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(258,90%,66%)] text-white hover:from-[hsl(221,83%,46%)] hover:to-[hsl(258,90%,58%)] shadow-sm",
        kidsSecondary: "bg-[hsl(258,90%,66%)] text-white hover:bg-[hsl(258,90%,58%)] shadow-sm",
        kidsTertiary: "bg-accent text-accent-foreground hover:bg-[hsl(25,95%,46%)] shadow-sm",
        glass: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        glassColored: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        fun: "bg-gradient-to-r from-[hsl(221,83%,53%)] via-[hsl(258,90%,66%)] to-[hsl(25,95%,53%)] text-white shadow-sm",
        gaming: "bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(258,90%,66%)] text-white font-bold uppercase tracking-wide shadow-sm",
        liquidHeader: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        liquidCard: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        liquidSheet: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        liquidPopover: "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        "dutch-primary": "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        "dutch-glass": "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
        gradient: "bg-gradient-to-r from-[hsl(221,83%,53%)] to-[hsl(258,90%,66%)] text-white hover:from-[hsl(221,83%,46%)] hover:to-[hsl(258,90%,58%)] shadow-sm",
        "vision-glass": "bg-white/85 backdrop-blur-md border border-black/[0.06] text-foreground hover:bg-white shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6",
        xl: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
        "pill-sm": "h-8 rounded-full px-4 text-xs",
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
