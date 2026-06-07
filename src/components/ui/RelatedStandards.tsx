import { Link } from '@/i18n/navigation';

interface Standard {
  flag: string;
  name: string;
  href: `/${string}`;
}

interface RelatedStandardsProps {
  standards: Standard[];
}

export default function RelatedStandards({ standards }: RelatedStandardsProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Related Standards</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {standards.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center gap-2.5 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm"
          >
            <span className="text-2xl leading-none">{s.flag}</span>
            <span className="font-medium">{s.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
