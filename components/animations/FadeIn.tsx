"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible", `dir-${direction}`);
          el.style.animationDuration = `${duration}s`;
          el.style.animationDelay = `${delay}s`;
          observer.unobserve(el);
        }
      },
      { rootMargin: "-50px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [direction, delay, duration]);

  return (
    <div ref={ref} className={`fade-in ${className ?? ""}`}>
      {children}
    </div>
  );
}
