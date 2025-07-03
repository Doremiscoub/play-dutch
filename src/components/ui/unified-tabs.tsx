
import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface UnifiedTabOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface UnifiedTabsProps {
  value: string
  onValueChange: (value: string) => void
  options: UnifiedTabOption[]
  columns?: number
  variant?: "default" | "orange" | "purple"
  className?: string
}

export function UnifiedTabs({
  value,
  onValueChange,
  options,
  columns = options.length,
  variant = "default",
  className
}: UnifiedTabsProps) {
  
  return (
    <div className="flex justify-center mb-8 px-4">
      <div className="lg-card lg-regular lg-tint-primary-50 p-2 lg-elevation-02">
        <div className="flex gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              disabled={option.disabled}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 min-w-[140px] justify-center lg-hover-state",
                value === option.value 
                  ? "lg-popover lg-tint-accent-70 text-white lg-elevation-03 scale-105 transform" 
                  : "text-foreground hover:lg-tint-primary-30 hover:lg-elevation-02 hover:scale-102",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={() => !option.disabled && onValueChange(option.value)}
            >
              {option.icon && (
                <span className="text-current">
                  {option.icon}
                </span>
              )}
              <span className="truncate font-black">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
