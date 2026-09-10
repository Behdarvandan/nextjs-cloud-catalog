import { Suspense } from "react";
import { fetchCategories, fetchProducts } from "@/lib/api";
import ProductFilters from "@/components/product/ProductFilters";
import ProductGrid from "@/components/product/ProductGrid";

interface CatalogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
  }>;
}

export default async function CatalogPage({
  searchParams,
}: CatalogPageProps) {
  const filters = await searchParams;

  const [products, categories] = await Promise.all([
    fetchProducts(filters),
    fetchCategories(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Product Catalog
        </h1>
        <p className="text-sm text-slate-500">
          Browse {products.length} product{products.length === 1 ? "" : "s"} from
          our curated marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <Suspense
            fallback={
              <div className="h-96 animate-pulse rounded-xl bg-slate-200" />
            }
          >
            <ProductFilters categories={categories} />
          </Suspense>
        </aside>
        <section>
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
