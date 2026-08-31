/**
 * Numbered section heading — styleguide §9.4: a mono decimal-leading-zero
 * counter, a 44 × 2px --primary rule, then the serif heading.
 *
 * The counter is text under 24px, so it takes --primary-ink, not --primary.
 * The rule is a graphic, so it takes --primary. That pair is §2.3, and it is
 * the pair the previous site got wrong most often.
 */
export function SectionHead({
  n,
  title,
  dek,
  id
}: {
  n: string;
  title: string;
  dek?: string;
  id: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-3">
        <span className="mono-label font-bold text-primary-ink">{n}</span>
        <span aria-hidden="true" className="h-0.5 w-11 bg-primary" />
      </div>
      <h2 id={id} className="mt-4">
        {title}
      </h2>
      {dek ? (
        <p className="prose-measure mt-4 body-lead leading-relaxed text-muted-foreground">
          {dek}
        </p>
      ) : null}
    </header>
  );
}
