import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/bilingual";
import { localePath, PATHS } from "@/components/shell/nav";
import { StaticTable } from "@/components/ui/static-table";
import { REGULATORY } from "./content.regulatory";

/**
 * S08 · REGULATORY CONTEXT — a static three-column reference matrix, and the
 * same treatment S01's ten-row table gets, because it is the same content
 * shape: a reference matrix whose cells are sentences.
 *
 * THAT SAMENESS IS THE CONSISTENCY RULE SATISFIED, NOT A MONOTONY FAILURE.
 * The Consistency category's own test is "repeatable" — the same shape must get
 * the same treatment — and its named opposite failure is ungrounded variation,
 * i.e. inventing a different look for identical content to appear varied. Two
 * prose matrices get one table treatment; the technology enumeration in S02
 * gets a different one because it is a different shape.
 *
 * LINK HONESTY. Two of nine rows link out, and seven do not, because only two
 * destinations exist: `/assurance` (NIS2 — `/assurance/nis2` does NOT exist,
 * verified against the live routes) and `/assurance/iec-62443`. That asymmetry
 * is honest and is deliberately NOT evened out with placeholder links, which
 * the Foundation Spec's acceptance criteria forbid outright.
 *
 * AND IT IS ONE ROW IN DUTCH, NOT TWO — measured, not assumed. `/assurance` is
 * one of the two pages on this site still gated `locale !== "en"`, so
 * `/nl/assurance` returns 404 while `/nl/assurance/iec-62443` returns 200 (the
 * five framework pages render both locales). A link that 404s in the reader's
 * own language is a dead link, so the NIS2 row renders as plain text in Dutch
 * and as a link in English. Sending a Dutch reader to an English URL would be
 * the other way to "fix" this and is worse: it breaks the locale-prefix rule
 * the whole routing layer exists to keep.
 */

const DESTINATIONS = {
  assurance: PATHS.assurance,
  iec62443: PATHS.assuranceIec62443
} as const;

export function Regulatory({ locale }: { locale: Locale }) {
  return (
    <div>
      <StaticTable
        minWidth="56rem"
        head={[
          pick(REGULATORY.headings.framework, locale),
          pick(REGULATORY.headings.relevance, locale),
          pick(REGULATORY.headings.support, locale)
        ]}
        rows={REGULATORY.rows.map((row) => [
          row.href && (row.href !== "assurance" || locale === "en") ? (
            <Link
              key={row.framework}
              href={localePath(locale, DESTINATIONS[row.href])}
              className="text-primary-ink underline-offset-4 hover:underline"
            >
              {row.framework}
            </Link>
          ) : (
            row.framework
          ),
          pick(row.relevance, locale),
          pick(row.support, locale)
        ])}
      />

      <div className="mt-8 space-y-3 border-t border-border pt-6">
        {/* No `prose-measure` (removed 2026-08-25) — see DecisionSwitchboard.tsx's
            identical fix for the reasoning. All 3 notes are short standalone
            sentences, not long-form body copy. */}
        {REGULATORY.notes.map((note, i) => (
          <p key={i} className="body-copy leading-relaxed text-muted-foreground">
            {pick(note, locale)}
          </p>
        ))}
      </div>
    </div>
  );
}
