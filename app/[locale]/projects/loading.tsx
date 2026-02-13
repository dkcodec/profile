import { Container } from "@/components/ui/Container";

export default function WorkLoading() {
  return (
    <section className="py-12 md:py-24">
      <Container>
        <div className="mb-12 space-y-3">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-subtle" />
          <div className="h-5 w-80 animate-pulse rounded-lg bg-subtle" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="aspect-[16/10] animate-pulse bg-subtle" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-subtle" />
                <div className="h-4 w-full animate-pulse rounded bg-subtle" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-subtle" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-subtle" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
