import Link from "next/link";
import { Activity, Package, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white shadow-md">
            <Package size={20} />
          </div>
          <span>
            Cloud<span className="text-brand-600">Catalog</span>
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link href="/" className="transition-colors hover:text-brand-600">
            Catalog
          </Link>
          <a href="#" className="transition-colors hover:text-brand-600">
            Deals
          </a>
          <a href="#" className="transition-colors hover:text-brand-600">
            New Releases
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Activity size={12} className="animate-pulse text-emerald-500" />
            <span>Container Active</span>
          </div>
          <button
            type="button"
            aria-label="Shopping cart"
            className="relative p-2 text-slate-600 transition-colors hover:text-brand-600"
          >
            <ShoppingCart size={22} />
            <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
