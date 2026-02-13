import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0d1117",
          color: "#e6edf3",
          fontFamily: "monospace",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "5rem", fontWeight: 700, color: "#58a6ff", margin: 0 }}>
            404
          </p>
          <h1 style={{ marginTop: "1rem", fontSize: "1.5rem", fontWeight: 700 }}>
            Page not found
          </h1>
          <p style={{ marginTop: "0.75rem", color: "#8b949e" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/en"
              style={{
                display: "inline-block",
                padding: "0.625rem 1.5rem",
                background: "#58a6ff",
                color: "#0d1117",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
