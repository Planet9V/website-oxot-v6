import "server-only";
import { Pool } from "pg";

/**
 * One connection pool per process.
 *
 * Ported from the previous application, which had this right. The global stash
 * is not a style preference: without it, Next's dev-mode hot reload constructs
 * a fresh Pool on every edit and leaks connections until Postgres refuses new
 * ones — a failure that only appears after twenty minutes of ordinary work,
 * which is the worst kind.
 *
 * `DATABASE_URL` comes from the container environment (docker-compose `web`
 * service). It is never read in the browser: `server-only` makes importing
 * this from a client component a build error rather than a leaked credential.
 */
const globalForPool = globalThis as unknown as { oxotPgPool?: Pool };

export const pool =
  globalForPool.oxotPgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // A web request that cannot get a connection in 5s should fail fast and
    // tell the reader, not hang until their browser gives up.
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 30_000,
    max: 5
  });

if (process.env.NODE_ENV !== "production") globalForPool.oxotPgPool = pool;

/** True when a database is configured at all. Lets a route degrade honestly
 *  rather than throwing when someone runs the app without the stack up. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);
