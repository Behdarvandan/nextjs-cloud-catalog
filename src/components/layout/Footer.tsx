import Link from "next/link";
import { Package } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Package size={16} />
          </div>
          <span className="text-sm font-bold text-slate-900">
            Cloud<span className="text-brand-600">Catalog</span>
          </span>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} CloudCatalog. Container-ready demo catalog
          built with the Next.js App Router.
        </p>

        <nav className="flex gap-6 text-xs font-medium text-slate-500">
          <Link href="/" className="transition-colors hover:text-brand-600">
            Catalog
          </Link>
          <a href="#" className="transition-colors hover:text-brand-600">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-brand-600">
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
}
