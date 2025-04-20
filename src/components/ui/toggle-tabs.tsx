
import React from 'react';
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const toggleGroupVariants = cva(
  "inline-flex w-full items-center justify-center gap-1 rounded-full bg-white/60 backdrop-blur-md border border-white/40 p-1 shadow-sm",
  {
    variants: {
      size: {
        default: "max-w-md",
        full: "max-w-full",
        sm: "max-w-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const toggleItemVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm",
  {
    variants: {
      variant: {
        default: "text-dutch-blue data-[state=active]:text-dutch-blue data-[state=inactive]:text-dutch-blue/70",
        orange: "text-dutch-orange data-[state=active]:text-dutch-orange data-[state=inactive]:text-dutch-orange/70",
        purple: "text-dutch-purple data-[state=active]:text-dutch-purple data-[state=inactive]:text-dutch-purple/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ToggleTabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toggleGroupVariants> {
  value: string;
  onValueChange: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  variant?: VariantProps<typeof toggleItemVariants>["variant"];
}

export function ToggleTabs({
  value,
  onValueChange,
  options,
  className,
  size,
  variant = "default",
  ...props
}: ToggleTabsProps) {
  return (
    <div className={cn(toggleGroupVariants({ size }), className)} {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onValueChange(option.value)}
          data-state={value === option.value ? "active" : "inactive"}
          className={cn(toggleItemVariants({ variant }), "flex items-center gap-1.5")}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}
