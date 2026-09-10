import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { fetchProductById } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  const isLowStock = product.stock <= 8;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-brand-600"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">{product.category}</Badge>
            {product.featured && <Badge variant="featured">Featured</Badge>}
            <Badge variant={isLowStock ? "warning" : "success"}>
              {isLowStock ? `Only ${product.stock} left` : "In Stock"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(product.rating.rate)
                      ? "fill-amber-500"
                      : "fill-slate-200 text-slate-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="text-sm text-slate-400">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-lg font-bold text-brand-600">
            {formatCurrency(product.price)}
          </p>

          <p className="text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>

          <Card className="p-5">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
              Specifications
            </h2>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="border-b border-slate-100 pb-2">
                  <dt className="text-xs font-medium text-slate-400">{key}</dt>
                  <dd className="text-sm font-medium text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-700"
          >
            <ShoppingCart size={18} />
            Add to cart
          </button>

          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <Check size={14} className="text-emerald-500" />
            Free shipping on orders over $50 · 30-day returns
          </p>
        </div>
      </div>
    </div>
  );
}
