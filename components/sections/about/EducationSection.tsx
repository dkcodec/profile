import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationSection() {
  const t = useTranslations("about");
  const tEdu = useTranslations("education");

  return (
    <section className="bg-muted py-12 md:py-24">
      <Container>
        <SectionHeading title={t("education_title")} />

        <div className="rounded-xl border border-border bg-background p-6 md:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-xl font-bold">{tEdu("institution")}</h3>
              <p className="mt-1 text-muted-foreground">{tEdu("degree")}</p>
            </div>
            <div className="text-sm text-placeholder">
              <div>{tEdu("period")}</div>
              <div>{tEdu("location")}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
