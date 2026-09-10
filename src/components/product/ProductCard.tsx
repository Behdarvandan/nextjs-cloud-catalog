import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock <= 8;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <div className="absolute left-3 top-3">
            <Badge variant="featured">Featured</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {product.category}
          </span>
          <Badge variant={isLowStock ? "warning" : "success"}>
            {isLowStock ? `Only ${product.stock} left` : "In Stock"}
          </Badge>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="line-clamp-2 text-xs text-slate-500">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} className="fill-amber-500" />
            <span className="text-xs font-semibold text-slate-700">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({product.rating.count})
            </span>
          </div>
          <span className="text-lg font-bold text-brand-600">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
