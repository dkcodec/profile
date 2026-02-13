import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Dmitriy Kairgeldin — Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#ff6b35",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: 700,
              color: "white",
            }}
          >
            DK
          </div>
        </div>

        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          Dmitriy Kairgeldin
        </div>

        <div
          style={{
            fontSize: "32px",
            color: "#ff6b35",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          Frontend Engineer
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#a3a3a3",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Building fast, accessible, and beautiful web experiences with React,
          Next.js, and TypeScript.
        </div>
      </div>
    ),
    { ...size }
  );
}
