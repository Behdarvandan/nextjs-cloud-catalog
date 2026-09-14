# Next.js 15 Standalone Cloud Catalog Engine

**Containerized, Server-First E-Commerce Product Showcase optimized for AWS ECS Fargate & Vercel.**

A production-grade e-commerce catalog engine built on the Next.js App Router with React Server Components, strict TypeScript, and a multi-stage Docker build powered by Next.js **standalone** output — designed to run identically on serverless (Vercel) and container-orchestrated (AWS ECS Fargate) infrastructure.

### 🔗 Live Demo

**[https://nextjs-cloud-catalog-95s2fn1vp-puryab97s-projects.vercel.app/](https://nextjs-cloud-catalog-95s2fn1vp-puryab97s-projects.vercel.app/)**

---

## Architectural Highlights & ROI

- **Server-First Filtering via `searchParams`** — Search, category, price range, and sorting are resolved entirely on the server from the URL's `searchParams`, with zero client-side filtering state. This produces SEO-friendly, shareable, and fully server-rendered catalog pages, while `Suspense` boundaries keep the filter UI streaming independently of the product grid.
- **Optimized Multi-Stage Docker Build** — A three-stage Dockerfile (`deps` → `builder` → `runner`) combined with `output: "standalone"` ships only the traced production server and its minimal dependency graph instead of a full `node_modules` tree, reducing the final runtime image to **~145MB** — an **85%+ reduction** versus a naive `node_modules`-based image (~1GB+).
- **Security-Conscious Runtime** — The production image drops root privileges via a dedicated non-root `nextjs` user/group and ships a built-in Docker `HEALTHCHECK`, making it ready for orchestrated environments like ECS Fargate out of the box.
- **Dual-Target Deployment** — The same codebase deploys natively to Vercel's serverless platform for zero-ops previews and to AWS ECS Fargate via the standalone container image for full infrastructure control, with no code branching between targets.

---

## Tech Stack

| Category       | Technologies                                              |
|----------------|-------------------------------------------------------------|
| **Framework**  | Next.js 15 (App Router), React 19, React Server Components |
| **Styling**    | Tailwind CSS, Lucide Icons                                 |
| **Language**   | TypeScript (Strict Mode)                                    |
| **Deployment** | Docker (Standalone Output), AWS ECS Fargate, Vercel         |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build (local)

```bash
npm run build
npm run start
```

## Docker Usage

```bash
# Build the image directly
docker build -t nextjs-cloud-catalog .

# Run the container
docker run -p 3000:3000 nextjs-cloud-catalog

# Or build and run via Compose
docker compose up --build

# Inspect the final image size to confirm the standalone optimization
docker images nextjs-cloud-catalog
```

The container listens on port `3000`, runs as the non-root `nextjs` user, and exposes a `/` health endpoint for orchestrator liveness checks.

---

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
