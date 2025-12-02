---
sidebar_position: 2
---

# Self-Hosting

You can self-host Next.js on any Node.js server or Docker container.

## Node.js Server

1.  Run `npm run build` to build your application.
2.  Run `npm run start` to start the production server.

## Docker

Next.js can be deployed as a Docker container.

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
```

## Environment Variables

Create `.env.local` for local development and `.env.production` for production.

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```
