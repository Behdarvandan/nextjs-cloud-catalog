export interface Product {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
  readonly rating: {
    readonly rate: number;
    readonly count: number;
  };
  readonly image: string;
  readonly category: string;
  readonly stock: number;
  readonly featured: boolean;
  readonly specs: Readonly<Record<string, string>>;
}

export const SORT_OPTIONS = [
  "featured",
  "price-asc",
  "price-desc",
  "rating-desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export function isSortOption(value: unknown): value is SortOption {
  return (
    typeof value === "string" &&
    (SORT_OPTIONS as readonly string[]).includes(value)
  );
}

export interface FilterParams {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: SortOption;
}

/** Raw (untrusted) query-string shape as delivered by Next.js. */
export type RawSearchParams = Record<string, string | string[] | undefined>;
