
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
  
  const variantStyles = {
    default: "from-trinity-blue-500 to-trinity-purple-500",
    orange: "from-trinity-orange-500 to-trinity-purple-500",
    purple: "from-trinity-purple-500 to-trinity-blue-500"
  }

  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList 
        className={cn(
          "w-full p-2 h-auto bg-white/70 backdrop-blur-xl border-0 shadow-xl rounded-2xl",
          `grid grid-cols-${columns} gap-2`,
          className
        )}
      >
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={cn(
              "flex items-center justify-center gap-2 transition-all duration-300 ease-out",
              "rounded-xl py-3 px-4 font-bold text-sm relative overflow-hidden",
              "data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:bg-white/50",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:text-white data-[state=active]:shadow-lg",
              "data-[state=active]:scale-105 data-[state=active]:z-10",
              `data-[state=active]:${variantStyles[variant]}`,
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "hover:scale-[1.02] active:scale-95"
            )}
          >
            {/* Effet de brillance pour l'onglet actif */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 data-[state=active]:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10 flex items-center gap-2">
              {option.icon && (
                <span className="text-current">
                  {option.icon}
                </span>
              )}
              <span className="truncate font-black">
                {option.label}
              </span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
