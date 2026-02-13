import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  className,
  hover = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-muted p-6",
        hover &&
          "transition-all duration-200 hover:border-accent/30 hover:shadow-lg hover:shadow-accent-glow",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
