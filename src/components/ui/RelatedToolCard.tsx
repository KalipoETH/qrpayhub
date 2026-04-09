interface RelatedToolCardProps {
  name: string;
  url: string;
  description: string;
  badge?: string;
  icon?: string;
  visitLabel?: string;
  external?: boolean;
}

export default function RelatedToolCard({
  name,
  url,
  description,
  badge,
  icon,
  visitLabel = 'Visit Tool →',
  external = true,
}: RelatedToolCardProps) {
  const linkProps = external
    ? { href: url, target: '_blank', rel: 'noopener noreferrer' }
    : { href: url };

  return (
    <div className="group bg-white border-l-4 border-blue-800 border border-l-[#1E40AF] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        {icon && (
          <span className="text-3xl flex-shrink-0 leading-none mt-0.5">{icon}</span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="font-semibold text-slate-900 text-base">{name}</span>
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 leading-relaxed mb-3">{description}</p>
          <a
            {...linkProps}
            className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
          >
            {visitLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
