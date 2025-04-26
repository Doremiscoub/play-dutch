
import React from 'react';
import { cn } from "@/lib/utils";

interface ReceiptCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const ReceiptCard = React.forwardRef<HTMLDivElement, ReceiptCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative bg-white shadow-md",
          "before:absolute before:top-0 before:left-0 before:right-0 before:h-4 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCA0Ij48cGF0aCBkPSJNMCwyaDIwYzAsMCwwLDIsLTEwLDJTMCwyLDAsMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]",
          "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-4 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCA0Ij48cGF0aCBkPSJNMCwyaDIwYzAsMCwwLDIsLTEwLDJTMCwyLDAsMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]",
          className
        )}
        {...props}
      >
        <div className="pt-4 pb-4">
          {children}
        </div>
      </div>
    );
  }
);

ReceiptCard.displayName = "ReceiptCard";

export { ReceiptCard };
