type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-xs text-slate-500">{description}</p>
          )}
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl text-blue-700">
          {icon}
        </div>
      </div>
    </article>
  );
}
