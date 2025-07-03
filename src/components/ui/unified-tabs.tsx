
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
      <div className="bg-white/80 backdrop-blur-xl border-0 shadow-xl rounded-2xl p-2">
        <div className="flex gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              disabled={option.disabled}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-bold transition-all duration-300 min-w-[140px] justify-center",
                value === option.value 
                  ? "bg-gradient-to-r from-trinity-blue-500 to-trinity-purple-500 text-white shadow-lg scale-105 transform" 
                  : "text-gray-700 hover:bg-white/70 hover:shadow-md hover:scale-102",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              onClick={() => !option.disabled && onValueChange(option.value)}
            >
              {option.icon && (
                <span className="text-current">
                  {option.icon}
                </span>
              )}
              <span className="truncate">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
