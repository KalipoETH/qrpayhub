import { Link } from '@/i18n/navigation';

export type SubPage = {
  icon: string;
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
};

type SubPageGridProps = {
  pages: SubPage[];
  locale?: string;
};

export default function SubPageGrid({ pages }: SubPageGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {pages.map((page) => {
        const isLive = !!page.href && !page.comingSoon;

        const inner = (
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{page.icon}</span>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{page.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-snug">
                {page.description}
              </p>
            </div>
          </div>
        );

        if (isLive) {
          return (
            <Link
              key={page.title}
              href={page.href as `/${string}`}
              className="relative bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200"
            >
              {inner}
            </Link>
          );
        }

        return (
          <div
            key={page.title}
            className="relative bg-slate-50 border border-slate-100 rounded-2xl p-5 opacity-60 select-none"
          >
            {inner}
            <span className="absolute top-3 right-3 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              Coming Soon
            </span>
          </div>
        );
      })}
    </div>
  );
}
