
import * as React from "react"
import { cn } from "@/lib/utils"

interface SignProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "default" | "sm" | "lg";
}

export const Sign = React.forwardRef<HTMLDivElement, SignProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-primary text-primary-foreground",
      success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
      error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    }

    const sizeClasses = {
      default: "p-4",
      sm: "p-2 text-sm",
      lg: "p-6 text-lg",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-md",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)

Sign.displayName = "Sign"
