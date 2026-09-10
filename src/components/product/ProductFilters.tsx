"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const currentCategory = searchParams.get("category") ?? "all";
  const currentSortBy = searchParams.get("sortBy") ?? "featured";
  const currentMinPrice = searchParams.get("minPrice") ?? "";
  const currentMaxPrice = searchParams.get("maxPrice") ?? "";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    startTransition(() => {
      router.push(`/?${params.toString()}`);
    });
  }

  // Debounce the free-text search so we do not issue a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateParam("search", search);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="w-full space-y-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="flex items-center gap-2 text-md font-bold text-slate-900">
          <SlidersHorizontal size={18} className="text-slate-500" />
          Filter Catalog
        </h2>
        {isPending && (
          <span className="animate-pulse text-xs font-medium text-brand-600">
            Updating...
          </span>
        )}
      </div>

      {/* Text search */}
      <div className="space-y-2">
        <label
          htmlFor="product-search"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Search Products
        </label>
        <div className="relative">
          <input
            id="product-search"
            type="text"
            placeholder="Search keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
        </div>
      </div>

      {/* Category chips */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Category
        </span>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateParam("category", cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                currentCategory === cat
                  ? "border-brand-600 bg-brand-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sort order */}
      <div className="space-y-2">
        <label
          htmlFor="sort-order"
          className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
        >
          Sort Order
        </label>
        <select
          id="sort-order"
          value={currentSortBy}
          onChange={(e) => updateParam("sortBy", e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500"
        >
          <option value="featured">Featured / Relevant</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: Highest Rated</option>
        </select>
      </div>

      {/* Price range */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
          Price Range
        </span>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min ($)"
            defaultValue={currentMinPrice}
            onBlur={(e) => updateParam("minPrice", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none transition focus:border-brand-500"
          />
          <input
            type="number"
            placeholder="Max ($)"
            defaultValue={currentMaxPrice}
            onBlur={(e) => updateParam("maxPrice", e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none transition focus:border-brand-500"
          />
        </div>
      </div>
    </div>
  );
}
