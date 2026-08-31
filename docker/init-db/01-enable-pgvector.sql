-- Runs automatically on first container init (empty data dir) via the
-- official Postgres image's /docker-entrypoint-initdb.d/ mechanism.
-- pgvector/pgvector:pg17 ships the extension's shared library already
-- built in; this just activates it for this database.
CREATE EXTENSION IF NOT EXISTS vector;
