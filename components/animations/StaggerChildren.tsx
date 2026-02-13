"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.1,
  className,
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = el.querySelectorAll<HTMLElement>(".stagger-item");
          items.forEach((item, i) => {
            item.classList.add("is-visible", "dir-up");
            item.style.animationDuration = "0.5s";
            item.style.animationDelay = `${i * stagger}s`;
          });
          observer.unobserve(el);
        }
      },
      { rootMargin: "-50px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`fade-in stagger-item ${className ?? ""}`}>{children}</div>
  );
}
