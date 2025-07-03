
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
      <div className="bg-gradient-to-r from-white/90 via-trinity-blue-50/80 to-trinity-purple-50/80 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-3 relative overflow-hidden">
        {/* Glassmorphic background accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-trinity-blue-100/20 via-transparent to-trinity-purple-100/20 rounded-2xl" />
        
        <div className="flex gap-3 relative z-10">
          {options.map((option) => (
            <button
              key={option.value}
              disabled={option.disabled}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] justify-center relative overflow-hidden",
                value === option.value 
                  ? "bg-gradient-to-r from-trinity-blue-500 via-trinity-purple-500 to-trinity-blue-600 text-white shadow-xl scale-105 transform border border-white/20" 
                  : "bg-white/60 backdrop-blur-sm text-trinity-blue-700 hover:bg-gradient-to-r hover:from-trinity-blue-100/70 hover:to-trinity-purple-100/70 hover:text-trinity-purple-700 hover:shadow-lg hover:scale-102 border border-white/40",
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
