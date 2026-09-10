# CloudCatalog — Next.js Cloud Architecture (Container-Ready)

A production-ready e-commerce product catalog built with the Next.js App Router,
React Server Components, TypeScript, Tailwind CSS, and an optimized multi-stage
Docker build powered by Next.js **standalone** output.

## Features

- **Server-First Catalog**: Search, category, price, and sorting filters are driven
  by URL `searchParams`, producing SEO-friendly, shareable, fully server-rendered pages.
- **Standalone Output**: `next.config.js` enables `output: "standalone"`, so the Docker
  image ships only the traced runtime instead of a full `node_modules` tree.
- **Multi-Stage Dockerfile**: Separated dependency, build, and runtime stages with a
  non-root user for a minimal, secure image (~150MB).
- **Strict TypeScript**: Strongly typed product, category, and filter contracts.
- **Mock Async API**: A latency-simulating data layer ready to be swapped for a real
  database, CMS, or microservice.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build (local)

```bash
npm run build
npm run start
```

## Docker (recommended production path)

```bash
# Build and run via Compose
docker compose up --build

# Or build the image directly
docker build -t cloud-catalog:latest .

# Inspect the final image size to confirm the standalone optimization
docker images cloud-catalog
```

The container listens on port `3000` and runs as the non-root `nextjs` user.

## Project Structure

```text
src/
├── app/                    # App Router routes (layout, catalog page, dynamic product page)
├── components/
│   ├── layout/             # Header & Footer
│   ├── product/            # ProductCard, ProductGrid, ProductFilters
│   └── ui/                 # Card & Badge atoms
├── lib/                    # Mock API and utility helpers
└── types/                  # Shared TypeScript contracts
```
