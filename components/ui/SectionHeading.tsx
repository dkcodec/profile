import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  prefix?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  prefix,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn("mb-12", align === "center" && "text-center", className)}
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {prefix && (
          <span className="font-mono text-muted-foreground">{prefix} </span>
        )}
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 font-mono text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
