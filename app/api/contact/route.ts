import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas/contact";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 },
      );
    }

    const { name, telegram, message } = result.data;

    console.log(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);

    // Send to Telegram if configured
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = [
        "<b>New Contact Form Submission</b>",
        "",
        `<b>Name:</b> ${escapeHtml(name)}`,
        `<b>Telegram:</b> ${escapeHtml(telegram)}`,
        `<b>Message:</b>`,
        escapeHtml(message),
      ].join("\n");

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text,
            parse_mode: "HTML",
          }),
        },
      );

      if (!response.ok) {
        console.error("Telegram API error:", await response.text());
        return NextResponse.json(
          { error: "Failed to send message" },
          { status: 500 },
        );
      }
    } else {
      // Log to console if Telegram is not configured
      console.log("Contact form submission:", { name, telegram, message });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
