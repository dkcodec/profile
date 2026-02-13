"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send");

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-mono text-sm font-medium"
        >
          {t("name_label")}
        </label>
        <input
          id="name"
          type="text"
          placeholder={t("name_placeholder")}
          className={`w-full rounded-lg border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-placeholder focus:outline-none ${
            errors.name
              ? "border-syntax-red focus:border-syntax-red"
              : "border-border focus:border-accent"
          }`}
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-syntax-red">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="telegram"
          className="mb-1.5 block font-mono text-sm font-medium"
        >
          {t("telegram_label")}
        </label>
        <input
          id="telegram"
          type="text"
          placeholder={t("telegram_placeholder")}
          className={`w-full rounded-lg border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-placeholder focus:outline-none ${
            errors.telegram
              ? "border-syntax-red focus:border-syntax-red"
              : "border-border focus:border-accent"
          }`}
          {...register("telegram")}
        />
        {errors.telegram && (
          <p className="mt-1 text-xs text-syntax-red">
            {errors.telegram.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-mono text-sm font-medium"
        >
          {t("message_label")}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t("message_placeholder")}
          className={`w-full resize-none rounded-lg border bg-muted px-4 py-2.5 text-sm text-foreground placeholder:text-placeholder focus:outline-none ${
            errors.message
              ? "border-syntax-red focus:border-syntax-red"
              : "border-border focus:border-accent"
          }`}
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-syntax-red">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "sending"}
      >
        {status === "sending" ? t("sending") : t("submit")}
      </Button>

      {status === "success" && (
        <p className="rounded-lg bg-syntax-green/10 p-3 text-center font-mono text-sm text-syntax-green">
          {t("success")}
        </p>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-syntax-red/10 p-3 text-center font-mono text-sm text-syntax-red">
          {t("error")}
        </p>
      )}
    </form>
  );
}
