FROM oven/bun:1.4.4-slim AS base

WORKDIR /app

ENV NODE_ENV=production \
  HOST=0.0.0.0 \
  PORT=3000

FROM base AS build

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# SvelteKit validates env vars while analysing routes; these placeholders only satisfy
# that check and are not used at runtime. Pass the real values with `docker run -e`.
RUN DATABASE_URL=postgres://placeholder@localhost/placeholder \
  ADMIN_PASSWORD=build-placeholder \
  bun run --bun build

FROM base

COPY --from=build /app/build /app/build

CMD ["bun", "/app/build"]
