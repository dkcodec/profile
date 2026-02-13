"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[60vh] items-center py-12 md:py-24">
      <Container>
        <div className="text-center">
          <p className="text-7xl font-bold text-accent">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-4 text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
          <div className="mt-8">
            <Button variant="primary" onClick={reset}>
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
