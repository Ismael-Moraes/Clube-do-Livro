import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export default function PageHeader({
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

      {children && (
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {children}
        </div>
      )}
    </header>
  );
}
