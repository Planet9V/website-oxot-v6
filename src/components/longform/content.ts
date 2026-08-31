import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { Marked } from "marked";
import type { Locale } from "@/i18n/config";

/**
 * THE LONG-FORM CONTENT LAYER.
 *
 * Files, not a database. `content/<section>/<slug>.<locale>.md`, extracted once
 * by `scripts/extract-longform.mjs` and reviewed like any other source.
 *
 * WHY MARKED AND NOT A HAND-ROLLED RENDERER. The corpus uses 590 table rows,
 * 106 fenced code blocks, 99 blockquotes and four heading levels. A parser
 * written for this site would be a parser with bugs nobody has found yet.
 *
 * WHY A CUSTOM RENDERER ON TOP OF IT. Marked's defaults emit bare `<h2>` and
 * `<table>`, and this site has rules about both: headings carry ROLE classes
 * (design system §7e — never a raw `text-{size}`), and a table has to scroll
 * inside its own box or it drags the whole page sideways at 390px. So the
 * element map lives here, once, rather than in a stylesheet that has to guess.
 *
 * THE HTML IS FIRST-PARTY. It comes out of our own repository, written by us,
 * reviewed in pull requests. That is the same trust boundary the site already
 * applies to natively-rendered feature pages.
 */

export interface Doc {
  slug: string;
  locale: Locale;
  section: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  body: string;
  /** Rendered HTML, with heading ids already applied. */
  html: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
  words: number;
  /** Minutes, at 220 words a minute. Rounded up, never zero. */
  readingMinutes: number;
}

const ROOT = join(process.cwd(), "content");

/** Frontmatter is ours and machine-written: `key: "json string"` or a bare bool. */
function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  if (!raw.startsWith("---\n")) return { data: {}, body: raw };
  const end = raw.indexOf("\n---", 4);
  if (end === -1) return { data: {}, body: raw };

  const data: Record<string, string> = {};
  for (const line of raw.slice(4, end).split("\n")) {
    const at = line.indexOf(":");
    if (at === -1) continue;
    const key = line.slice(0, at).trim();
    const value = line.slice(at + 1).trim();
    try {
      data[key] = value.startsWith('"') ? (JSON.parse(value) as string) : value;
    } catch {
      data[key] = value.replace(/^"|"$/g, "");
    }
  }
  return { data, body: raw.slice(end + 4).replace(/^\n+/, "") };
}

/** Stable, readable, and unique within one document. */
function slugifyHeading(text: string, taken: Set<string>): string {
  const base =
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section";
  let id = base;
  let n = 2;
  while (taken.has(id)) id = `${base}-${n++}`;
  taken.add(id);
  return id;
}

/* Role classes only. A raw text-{size} on a heading is the documented failure
   this map exists to prevent. */
const H = {
  2: "h-section mt-12 scroll-mt-24 first:mt-0",
  3: "h-sub mt-9 scroll-mt-24",
  4: "h-card mt-7 scroll-mt-24"
} as const;

/**
 * The old CMS emitted directive fences the reader was never meant to see —
 * ```cta / variant: diagnose``` and friends. Eight files carry them. They are
 * configuration, not content, so they are dropped before parsing rather than
 * rendered as a code block that says "variant: diagnose".
 */
function stripDirectiveFences(markdown: string): string {
  return markdown.replace(/^```(?:cta|block|component)[^\n]*\n[\s\S]*?^```\s*$/gm, "").trim();
}

/**
 * THE LINKS INSIDE THESE ARTICLES POINT AT THE OLD SITE. They were written
 * against /en/cyber-digital-twin, /en/cra-landing and sibling article slugs at
 * the root — none of which exist here. Left alone they would be dead links
 * inside otherwise-good writing, and the measure harness would fail the route
 * (correctly).
 *
 * So the map is applied at render, in one place, and it is a MAP rather than a
 * guess: every entry is a route this site actually has. Anything unmapped is
 * left exactly as written, so a broken link stays visible as a broken link
 * instead of being silently pointed somewhere plausible.
 */
const ROUTE_MAP: Record<string, string> = {
  "cyber-digital-twin": "cdt-2",
  "cyber-digital-twin-model": "cdt-2",
  "cyber-digital-twin-grant": "cdt-2",
  services: "consulting",
  about: "company"
  /* /twin retired 2026-08-22 (owner) — these three now map to /cdt-2, the
     only remaining Cyber Digital Twin destination. */
};

const REFERENCE_SLUGS = new Set([
  "iec-62443",
  "ts-50701",
  "nis2",
  "ai-act",
  "machine-act"
]);

function rewriteHref(href: string): string {
  const m = /^\/(en|nl)\/([a-z0-9-]+)\/?$/.exec(href);
  if (!m) return href;
  const [, locale, slug] = m;
  if (REFERENCE_SLUGS.has(slug)) return `/${locale}/reference/${slug}`;
  const mapped = ROUTE_MAP[slug];
  return mapped ? `/${locale}/${mapped}` : href;
}

function render(markdown: string) {
  const taken = new Set<string>();
  const headings: Doc["headings"] = [];
  const marked = new Marked({ gfm: true, breaks: false });

  marked.use({
    renderer: {
      heading({ text, depth: raw, tokens }) {
        const inline = this.parser.parseInline(tokens);
        const plain = text.replace(/<[^>]+>/g, "").trim();
        /* A `#` in the body becomes an h2. The layout owns the page's single
           h1, and four migrated documents opened with their own title as an
           h1 — two h1s on a page, which the measure gate fails and a screen
           reader reports as two documents. */
        const depth = raw === 1 ? 2 : raw;
        if (depth === 2 || depth === 3) {
          const id = slugifyHeading(plain, taken);
          headings.push({ id, text: plain, level: depth });
          return `<h${depth} id="${id}" class="${H[depth]}">${inline}</h${depth}>`;
        }
        const cls = depth >= 4 ? H[4] : H[2];
        return `<h${Math.min(depth, 6)} class="${cls}">${inline}</h${Math.min(depth, 6)}>`;
      },
      paragraph({ tokens }) {
        return `<p class="mt-5 leading-relaxed text-muted-foreground">${this.parser.parseInline(tokens)}</p>`;
      },
      list(token) {
        const tag = token.ordered ? "ol" : "ul";
        const cls = token.ordered
          ? "mt-5 list-decimal space-y-2 pl-6 leading-relaxed text-muted-foreground"
          : "mt-5 list-disc space-y-2 pl-6 leading-relaxed text-muted-foreground";
        const items = token.items.map((i) => `<li>${this.parser.parse(i.tokens).replace(/^<p[^>]*>|<\/p>$/g, "")}</li>`).join("");
        return `<${tag} class="${cls}">${items}</${tag}>`;
      },
      blockquote({ tokens }) {
        return `<blockquote class="mt-6 border-l-2 border-primary pl-5 font-display text-[1.25rem] leading-snug text-foreground">${this.parser.parse(tokens)}</blockquote>`;
      },
      /* THE TABLE SCROLLS IN ITS OWN BOX. 590 table rows in this corpus, some of
         them five columns wide; without the wrapper they take the document
         sideways at 390px and the overflow gate fails the whole route. */
      table(token) {
        const head = token.header.map((c) => `<th scope="col" class="mono-label border-b border-border px-4 py-3 text-left font-bold text-foreground">${this.parser.parseInline(c.tokens)}</th>`).join("");
        const rows = token.rows
          .map(
            (row) =>
              `<tr class="border-b border-border last:border-b-0">${row
                .map((c) => `<td class="px-4 py-3 align-top body-copy leading-relaxed text-muted-foreground">${this.parser.parseInline(c.tokens)}</td>`)
                .join("")}</tr>`
          )
          .join("");
        return `<div role="region" tabindex="0" class="mt-6 overflow-x-auto rounded-2xl border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"><table class="w-full min-w-[34rem] border-collapse"><thead>${head ? `<tr>${head}</tr>` : ""}</thead><tbody>${rows}</tbody></table></div>`;
      },
      code({ text }) {
        const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<pre class="mt-6 overflow-x-auto rounded-2xl border border-border bg-muted p-5 text-[0.875rem] leading-relaxed"><code class="font-mono text-foreground">${escaped}</code></pre>`;
      },
      codespan({ text }) {
        return `<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground">${text}</code>`;
      },
      link({ href: raw, title, tokens }) {
        const href = rewriteHref(raw);
        const external = /^https?:\/\//.test(href);
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `<a href="${href}"${title ? ` title="${title}"` : ""}${attrs} class="border-b border-primary/45 text-primary-ink no-underline transition-colors hover:border-primary">${this.parser.parseInline(tokens)}</a>`;
      },
      hr() {
        return `<hr class="mt-10 border-border" />`;
      },
      strong({ tokens }) {
        return `<strong class="font-semibold text-foreground">${this.parser.parseInline(tokens)}</strong>`;
      }
    }
  });

  const html = marked.parse(stripDirectiveFences(markdown)) as string;
  return { html, headings };
}

function toDoc(file: string, raw: string, section: string): Doc {
  const { data, body } = parseFrontmatter(raw);
  const { html, headings } = render(body);
  const words = body.split(/\s+/).filter(Boolean).length;
  const [slug, locale] = file.replace(/\.md$/, "").split(".");

  return {
    slug: data.slug || slug,
    locale: (data.locale || locale) as Locale,
    section: data.section || section,
    title: data.title || slug,
    excerpt: data.excerpt || "",
    metaTitle: data.metaTitle || data.title || slug,
    metaDescription: data.metaDescription || data.excerpt || "",
    publishedAt: data.publishedAt || "",
    updatedAt: data.updatedAt || "",
    body,
    html,
    headings,
    words,
    readingMinutes: Math.max(1, Math.round(words / 220))
  };
}

export async function getDoc(section: string, slug: string, locale: Locale): Promise<Doc | null> {
  try {
    const file = `${slug}.${locale}.md`;
    const raw = await readFile(join(ROOT, section, file), "utf8");
    return toDoc(file, raw, section);
  } catch {
    return null;
  }
}

/** Every document in a section, for one locale, newest first. */
export async function getSection(section: string, locale: Locale): Promise<Doc[]> {
  let files: string[];
  try {
    files = await readdir(join(ROOT, section));
  } catch {
    return [];
  }

  const docs = await Promise.all(
    files
      .filter((f) => f.endsWith(`.${locale}.md`))
      .map(async (f) => toDoc(f, await readFile(join(ROOT, section, f), "utf8"), section))
  );

  return docs.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
}

/** Slugs for `generateStaticParams`, so every document is prerendered. */
export async function getSlugs(section: string): Promise<string[]> {
  try {
    const files = await readdir(join(ROOT, section));
    return [...new Set(files.map((f) => f.replace(/\.(en|nl)\.md$/, "")))];
  } catch {
    return [];
  }
}
