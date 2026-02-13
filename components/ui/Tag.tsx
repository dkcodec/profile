import { cn } from "@/lib/utils";

interface TagProps {
  children: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

export function Tag({ children, className, active, onClick }: TagProps) {
  const Component = onClick ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium transition-colors",
        active
          ? "border-accent/50 bg-accent/10 text-accent"
          : "border-border/50 bg-subtle text-muted-foreground",
        onClick &&
          "cursor-pointer hover:border-accent/50 hover:bg-accent/5 hover:text-accent",
        className,
      )}
    >
      {children}
    </Component>
  );
}
