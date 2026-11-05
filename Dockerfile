# syntax=docker/dockerfile:1
# Install dependencies
FROM node:24-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build Next.js
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# Used for metadataBase (share previews). NEXT_PUBLIC_* values are inlined at
# build time, so they must be present here, not when the container starts.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# The Firebase config arrives as a build secret holding a dotenv file, so it
# never ends up in an image layer. Secrets are not part of the layer cache key,
# so CI passes a hash of the file to rebuild whenever the values change.
ARG BUILD_ENV_HASH
RUN --mount=type=secret,id=env,target=/app/.env.production.local npm run build

# Production container
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs \
    && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
