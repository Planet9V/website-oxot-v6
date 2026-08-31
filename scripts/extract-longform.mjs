/**
 * EXTRACT THE LONG-FORM CONTENT OUT OF THE OLD SITE'S DATABASE.
 *
 * Run once, reviewed, then never again — but kept, because a migration nobody
 * can re-run is a migration nobody can check.
 *
 * WHY IT READS `page_blocks` AND NOT `pages.body`. For `content_type='blocks'`
 * rows the body column is a DEAD MIRROR (CLAUDE.md §7c). The live text is the
 * `markdown` key inside each block's `config` jsonb, in `position` order.
 * Extracting from `body` would have silently shipped a stale copy of every
 * article.
 *
 * It talks to the database through `docker exec psql` rather than a
 * connection string, because the old site's Postgres publishes no host port —
 * it is reachable only from inside the compose network.
 *
 *   node scripts/extract-longform.mjs            # write the files
 *   node scripts/extract-longform.mjs --dry-run  # list what it would write
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const DB = "oxot_website_july2026-db-1";
const ROOT = join(process.cwd(), "content");
const DRY = process.argv.includes("--dry-run");

/**
 * What moves, and where it lands. The slugs are the old site's; the sections
 * are this site's. Anything not listed here stays behind on purpose.
 */
const SETS = {
  insights: [
    /* The series index the articles themselves point at — every one of them
       opens "Part of the Cybersecurity as Physics series". Missed on the
       first pass, which is how a series ends up with no spine. */
    "cybersecurity-as-physics",
    "seven-layers-of-reality",
    "tacam-seven-dimension-threat-intelligence",
    "cdt-fooled-by-randomness",
    "death-wobble-grid-frequency-instability",
    "cra-2026-zero-bodies-one-deadline",
    "cra-annex-i-13-and-8",
    "nis2-is-not-a-policy-document"
  ],
  reference: [
    "cra",
    "cra-ce-marking-pathways",
    "cra-technical-reference",
    "iec-62443",
    "nis2",
    "ai-act",
    "machine-act",
    "ts-50701"
  ],
  "track-record": ["track-record", "track-record-rail", "track-record-cra", "track-record-cyber-digital-twin"],
  /* The long-form service pages. These are where the real detail behind the
     six Consulting cards lives — written once, on the old site, and worth far
     more than a second draft of the same thing. */
  services: [
    "services",
    "ot-security-assessments",
    "ot-security-programmes",
    "architecture-segmentation",
    "secure-remote-access",
    "ot-security-baseline",
    "capability-transfer"
  ],
  /* NOT frameworks. That page is not prose — it is a structured hub built from
     breadcrumb / splitHero / magazineCards / citedCallout blocks, so there is
     no markdown to extract. It gets rebuilt as code, like every other designed
     page on this site, using the harvested render as reference. */
};

const LOCALES = ["en", "nl"];

function psql(sql) {
  return execFileSync("docker", ["exec", DB, "psql", "-U", "oxot", "-d", "oxot", "-tAc", sql], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024
  });
}

/** One JSON document per page, so the shell never has to quote markdown. */
function fetchPage(slug, locale) {
  const sql = `
    select coalesce(json_build_object(
      'slug', p.slug,
      'locale', p.locale,
      'title', p.title,
      'excerpt', p.excerpt,
      'metaTitle', p.meta_title,
      'metaDescription', p.meta_description,
      'published', p.published,
      'publishedAt', p.published_at,
      'updatedAt', p.updated_at,
      'blocks', (
        select coalesce(json_agg(json_build_object('type', b.type, 'markdown', b.config->>'markdown')
                                 order by b.position), '[]'::json)
        from page_blocks b where b.slug = p.slug and b.locale = p.locale
      )
    )::text, '')
    from pages p where p.slug = '${slug}' and p.locale = '${locale}'`;
  const out = psql(sql).trim();
  return out ? JSON.parse(out) : null;
}

/** YAML-safe scalar. Titles contain colons and quotes often enough to matter. */
const y = (v) => (v == null || v === "" ? '""' : JSON.stringify(String(v)));

let written = 0;
const missing = [];

for (const [section, slugs] of Object.entries(SETS)) {
  for (const slug of slugs) {
    for (const locale of LOCALES) {
      const page = fetchPage(slug, locale);
      if (!page) {
        missing.push(`${section}/${slug}.${locale}`);
        continue;
      }

      const body = (page.blocks || [])
        .map((b) => (b.markdown || "").trim())
        .filter(Boolean)
        .join("\n\n");

      if (!body) {
        missing.push(`${section}/${slug}.${locale} (no prose blocks)`);
        continue;
      }

      const file = join(ROOT, section, `${slug}.${locale}.md`);
      const front = [
        "---",
        `title: ${y(page.title)}`,
        `slug: ${y(slug)}`,
        `locale: ${y(locale)}`,
        `section: ${y(section)}`,
        `excerpt: ${y(page.excerpt)}`,
        `metaTitle: ${y(page.metaTitle)}`,
        `metaDescription: ${y(page.metaDescription)}`,
        `publishedAt: ${y(page.publishedAt)}`,
        `updatedAt: ${y(page.updatedAt)}`,
        `sourceWasPublished: ${page.published ? "true" : "false"}`,
        `extractedFrom: "page_blocks (the live source; pages.body is a dead mirror)"`,
        `extractedOn: "2026-08-09"`,
        "---",
        ""
      ].join("\n");

      console.log(`${DRY ? "would write" : "wrote"}  ${section}/${slug}.${locale}.md  ${body.length} chars, ${page.blocks.length} blocks`);
      if (!DRY) {
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, front + body + "\n");
      }
      written += 1;
    }
  }
}

console.log(`\n${DRY ? "would write" : "wrote"} ${written} files`);
if (missing.length) console.log(`not found (${missing.length}): ${missing.join(", ")}`);
