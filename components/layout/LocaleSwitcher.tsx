"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-border p-0.5 font-mono text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded px-2.5 py-1 text-xs font-medium uppercase transition-all",
            locale === loc
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={`Switch to ${loc === "en" ? "English" : "Russian"}`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
