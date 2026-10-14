"use client";

import Link from "next/link";
import { useState } from "react";

type Page = "dashboard" | "livros" | "emprestimos" | "leitores";

type SidebarProps = {
  activePage: Page;
};

const menuItems: {
  label: string;
  href: string;
  icon: string;
  page: Page;
}[] = [
  { label: "Dashboard", href: "/home", icon: "▦", page: "dashboard" },
  { label: "Livros", href: "/home/livros", icon: "▤", page: "livros" },
  {
    label: "Empréstimos",
    href: "/home/emprestimos",
    icon: "⇄",
    page: "emprestimos",
  },
  { label: "Leitores", href: "/home/leitores", icon: "♙", page: "leitores" },
];

export default function Sidebar({ activePage }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-xl text-slate-700 shadow-sm md:hidden"
      >
        {mobileOpen ? "×" : "☰"}
      </button>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-xl text-white">
            <img
              src="/favicon.ico"
              alt="Logo da biblioteca"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <span className="sr-only">Biblioteca</span>
          </div>

          <div>
            <p className="font-bold text-slate-900">Biblioteca</p>
            <p className="text-xs text-slate-500">Sistema de gestão</p>
          </div>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menu principal
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = item.page === activePage;

              return (
                <Link
                  key={item.page}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex h-6 w-6 items-center justify-center text-lg">
                    {item.icon}
                  </span>
                  {item.label}
                  {active && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-100 p-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Gestão da biblioteca
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Organize o acervo e acompanhe os empréstimos em um só lugar.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
