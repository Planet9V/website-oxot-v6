import { ENTRIES, type GlossaryEntry } from "./content";

export interface LetterGroup {
  letter: string;
  /** Anchor for the letter rule itself, so the A–Z strip has somewhere to go. */
  id: string;
  entries: GlossaryEntry[];
}

/**
 * Group the entries under their initial letter.
 *
 * ONE MODULE, TWO CONSUMERS — the A–Z strip and the entry list both need
 * the identical grouping. Computing it in each of them is how an index
 * ends up offering a letter the page below does not have.
 *
 * DELIBERATELY KEYED ON `term.en`, in both locales. The anchor ids in
 * content.ts are English slugs and are meant to be linked from other
 * pages, so the letter a term files under has to agree with the id it
 * files under; a Dutch translation starting with a different letter would
 * put a term under a heading its own anchor contradicts. When the NL pass
 * happens this is the decision to revisit — either translate the ids too,
 * or keep the English filing and say so on the page.
 *
 * Relies on ENTRIES already being alphabetical (content.ts says so, and
 * says why): this groups consecutive runs rather than sorting, so a term
 * inserted out of order produces a duplicated letter heading — visible in
 * review, which is the point.
 */
export function letterGroups(entries: readonly GlossaryEntry[] = ENTRIES): readonly LetterGroup[] {
  const groups: LetterGroup[] = [];
  for (const entry of entries) {
    const letter = entry.term.en.slice(0, 1).toUpperCase();
    const last = groups.at(-1);
    if (last && last.letter === letter) last.entries.push(entry);
    else groups.push({ letter, id: `letter-${letter.toLowerCase()}`, entries: [entry] });
  }
  return groups;
}
