import { Link } from '@/i18n/navigation';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-slate-300 select-none">/</span>}
            {item.href ? (
              <Link
                href={item.href as `/${string}`}
                className="hover:text-slate-600 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-900 font-semibold">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
