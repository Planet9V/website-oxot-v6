-- Reconstructed from the PREDECESSOR repo's real migrations
-- (Planet9V/OXOT-Website-JULY2026: db/migrations/039_cra_intake.sql,
-- 046_landing_leads.sql, 050_lead_anon_session.sql, 051_unified_leads.sql —
-- fetched and verified, not guessed from the INSERT statement alone).
-- This app's src/lib/leads.ts is documented as writing "the same columns"
-- as that shared table, confirmed here by matching column names exactly.
--
-- __EMBED_DIM__ = 1536, this project's binding decision (see PROGRESS.md
-- and migration 039's own comment).
--
-- v_prospects and its sibling tables (contact_messages,
-- newsletter_subscribers) are NOT created here — those belong to the old
-- admin-console app's schema. Nothing in this repo's current code path
-- (grep-verified against src/lib/leads.ts) touches them.

CREATE TABLE IF NOT EXISTS cra_readiness_leads (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  segment            TEXT NOT NULL,
  stage              TEXT NOT NULL DEFAULT 'new',
  tags               TEXT[] NOT NULL DEFAULT '{}',
  name               TEXT NOT NULL,
  email              TEXT NOT NULL,
  company            TEXT,
  role               TEXT,
  answers            JSONB NOT NULL DEFAULT '{}',
  blocker            TEXT,
  locale             TEXT NOT NULL DEFAULT 'en',
  page               TEXT,
  utm                JSONB NOT NULL DEFAULT '{}',
  ip_hash            TEXT,
  session_id         UUID,
  scheduling_status  TEXT NOT NULL DEFAULT 'none',
  scheduled_at       TIMESTAMPTZ,
  handled            BOOLEAN NOT NULL DEFAULT false,
  admin_note         TEXT,
  responded_at       TIMESTAMPTZ,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  embedding          vector(1536),
  source             TEXT,
  landing_slug       TEXT,
  anon_session_id    TEXT,
  cta_type           TEXT,
  lead_score         INTEGER NOT NULL DEFAULT 0,
  score_factors      JSONB NOT NULL DEFAULT '{}',
  owner              TEXT,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  email_domain       TEXT GENERATED ALWAYS AS (lower(split_part(email, '@', 2))) STORED
);

CREATE INDEX IF NOT EXISTS cra_readiness_leads_created_idx ON cra_readiness_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS cra_readiness_leads_stage_idx   ON cra_readiness_leads (stage, created_at DESC);
CREATE INDEX IF NOT EXISTS cra_readiness_leads_segment_idx ON cra_readiness_leads (segment, created_at DESC);
CREATE INDEX IF NOT EXISTS cra_readiness_leads_session_idx ON cra_readiness_leads (session_id);
CREATE INDEX IF NOT EXISTS cra_leads_landing_idx ON cra_readiness_leads (landing_slug);
CREATE INDEX IF NOT EXISTS cra_leads_source_idx  ON cra_readiness_leads (source);
CREATE INDEX IF NOT EXISTS cra_leads_anon_session_idx ON cra_readiness_leads (anon_session_id);
CREATE INDEX IF NOT EXISTS cra_leads_cta_type_idx     ON cra_readiness_leads (cta_type, created_at DESC);
CREATE INDEX IF NOT EXISTS cra_leads_score_idx        ON cra_readiness_leads (lead_score DESC);
CREATE INDEX IF NOT EXISTS cra_leads_email_domain_idx ON cra_readiness_leads (email_domain);
CREATE INDEX IF NOT EXISTS cra_leads_owner_idx        ON cra_readiness_leads (owner);

DO $$
BEGIN
  CREATE INDEX IF NOT EXISTS cra_readiness_leads_embedding_hnsw
    ON cra_readiness_leads USING hnsw (embedding vector_cosine_ops);
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Skipped HNSW index on cra_readiness_leads: %', SQLERRM;
END $$;
