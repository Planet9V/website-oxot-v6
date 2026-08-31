# The NEW site (web/) — Next 16, no CMS, no migrations.
#
# It has its own Dockerfile and its own railway.json because the repo root
# carries the OLD app's, and Railway reads the root config even when the
# service's root directory is web/. The first deploy of this service built
# perfectly and then died on:
#
#     npm error Missing script: "db:migrate"
#
# — the root railway.json's preDeployCommand, which runs the old app's
# migrations and five seeders. This app has no migrations to run: its content
# is typed code, not rows. The whole point of the rebuild.
#
# Two stages. The runner carries node_modules because @react-pdf/renderer
# resolves its font files at runtime from the package directory, so a
# standalone trace would drop them and the report endpoint would 500 in
# production while working locally.

FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Dependencies first, so a copy change does not invalidate the install layer.
COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app ./

# Railway injects PORT. Bind 0.0.0.0 or the container is unreachable.
EXPOSE 3000
# Railway injects PORT and `next start` reads it from the environment.
# Do NOT pass -p "${PORT:-3000}" via railway.json startCommand: that value is
# handed to the binary literally, unshelled, and next rejects it as not a number.
CMD ["sh", "-c", "node_modules/.bin/next start -H 0.0.0.0 -p ${PORT:-3000}"]

# --- Dev stage (local docker-compose only, not used by Railway) ---
#
# Source is bind-mounted at runtime (see docker-compose.yml) for hot reload;
# node_modules is a container-owned named volume, not part of the bind mount,
# so Linux-native binaries (this image) never collide with the host's
# macOS/Darwin node_modules. entrypoint.dev.sh reinstalls only when
# package-lock.json's checksum has changed since the volume was last
# populated, so restarts without a lockfile change are fast.
FROM node:22-bookworm-slim AS dev
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY docker/entrypoint.dev.sh /usr/local/bin/entrypoint.dev.sh
RUN chmod +x /usr/local/bin/entrypoint.dev.sh
EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/entrypoint.dev.sh"]
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
