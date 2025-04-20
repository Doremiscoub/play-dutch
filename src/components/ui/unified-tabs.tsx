
import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export interface UnifiedTabOption {
  value: string
  label: string
  icon?: React.ReactNode
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
    default: "from-dutch-blue to-dutch-purple",
    orange: "from-dutch-orange to-dutch-orange/80",
    purple: "from-dutch-purple to-dutch-purple/80"
  }

  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList 
        className={cn(
          "w-full p-1 h-auto bg-white/40 backdrop-blur-md border border-white/40",
          `grid grid-cols-${columns}`,
          className
        )}
      >
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className={cn(
              "flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r",
              `data-[state=active]:${variantStyles[variant]}`,
              "data-[state=active]:text-dutch-purple font-medium transition-all duration-200",
              "rounded-md py-1.5 px-3"
            )}
          >
            {option.icon}
            <span className="truncate">{option.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
