# ----------------------------------------------------------------------------
# Stage 1: Dependency installation (cached by Docker layer strategy)
# ----------------------------------------------------------------------------
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install production + development dependencies from the lockfile
COPY package.json package-lock.json* ./
RUN npm ci

# ----------------------------------------------------------------------------
# Stage 2: Application compilation
# ----------------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Reuse the cached dependency graph, then copy application source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build phase
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# ----------------------------------------------------------------------------
# Stage 3: Secure, minimal production runtime
# ----------------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a dedicated non-root user and group for security compliance
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy static public assets (images, robots, favicon, etc.)
COPY --from=builder /app/public ./public

# Prepare the Next.js cache directory with correct ownership
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Leverage the standalone trace generated during the build phase.
# This is the key optimization: we ship only the minimal server runtime
# instead of a full node_modules tree (~1GB -> ~150MB).
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Drop root privileges before serving traffic
USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# server.js is emitted automatically by Next.js standalone mode
CMD ["node", "server.js"]
