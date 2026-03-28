
import * as React from "react"
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
      <div className="bg-white border border-border shadow-md rounded-2xl p-3 relative overflow-hidden">
        <div className="flex gap-3 relative z-10">
          {options.map((option) => (
            <button
              key={option.value}
              disabled={option.disabled}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] justify-center relative overflow-hidden",
                value === option.value 
                  ? "bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-blue-600 text-white shadow-xl scale-105 transform border border-border" 
                  : "bg-gray-50 text-trinity-blue-700 hover:bg-gray-100 hover:text-trinity-purple-700 hover:shadow-sm border border-border",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={() => !option.disabled && onValueChange(option.value)}
            >
              {/* Shimmer effect for active tab */}
              {value === option.value && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-[shimmer_2s_ease-in-out_infinite]" />
              )}
              
              {option.icon && (
                <span className="text-current relative z-10">
                  {option.icon}
                </span>
              )}
              <span className="truncate relative z-10">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
