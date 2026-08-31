import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { INPUTS, PASSIVE, QUESTION } from "./content";
import { ENCLAVE } from "./content-modes";
import { PullQuote, SectionHead, TraceList } from "./primitives";

/**
 * Sections 01–03: why deployment is the first question a sensitive buyer
 * asks, the passive-first commitment that answers most of it, and the
 * material the model is actually built from.
 *
 * This is the argument BEFORE the three boundaries. It exists because the
 * diagrams in section 04 are only meaningful once a reader accepts the
 * premise underneath all three — that the Twin is built from approved
 * exports rather than from a connection to the plant. Lead with the
 * diagrams instead and every reader silently assumes an agent somewhere.
 *
 * Split from DeployModes and DeploySovereignty purely to keep every file
 * under 500 lines; the three read as one continuous article and the
 * section numbering runs straight through them.
 */
export function DeployFoundation({ locale }: { locale: Locale }) {
  return (
    <>
      <section aria-labelledby="question">
        <SectionHead
          n={QUESTION.n}
          id="question"
          title={pick(QUESTION.title, locale)}
          dek={pick(QUESTION.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(QUESTION.intro, locale)}
        </p>
        <TraceList items={QUESTION.concerns.map((c) => pick(c, locale))} />
        <PullQuote>{pick(QUESTION.pullQuote, locale)}</PullQuote>
        <p className="prose-measure body-lead leading-relaxed text-foreground">{pick(QUESTION.close, locale)}</p>
      </section>

      <section aria-labelledby="passive-first" className="mt-16 border-t border-border pt-12">
        <SectionHead
          n={PASSIVE.n}
          id="passive-first"
          title={pick(PASSIVE.title, locale)}
          dek={pick(PASSIVE.dek, locale)}
        />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(PASSIVE.intro, locale)}
        </p>
        <TraceList items={PASSIVE.rules.map((r) => pick(r, locale))} />
        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(PASSIVE.close, locale)}
        </p>
      </section>

      <section aria-labelledby="inputs" className="mt-16 border-t border-border pt-12">
        <SectionHead n={INPUTS.n} id="inputs" title={pick(INPUTS.title, locale)} dek={pick(INPUTS.dek, locale)} />
        <p className="prose-measure mt-6 body-lead leading-relaxed text-foreground">
          {pick(INPUTS.intro, locale)}
        </p>

        {/* The same list the diagrams in section 04 render as chips, read
            here as prose. One record (ENCLAVE.imports), two presentations —
            so the list a security authority reviews and the list drawn
            inside the boundary cannot disagree. */}
        <TraceList items={ENCLAVE.imports.map((i) => pick(i, locale))} />

        <p className="prose-measure mt-8 border-l-2 border-primary/40 pl-5 body-copy leading-relaxed text-muted-foreground">
          {pick(INPUTS.note, locale)}
        </p>
        <p className="prose-measure mt-8 body-lead leading-relaxed text-foreground">
          {pick(INPUTS.close, locale)}
        </p>
      </section>
    </>
  );
}
