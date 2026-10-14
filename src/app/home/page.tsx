"use client";

import { useMemo } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";

type Emprestimo = {
  id: number;
  livro: string;
  leitor: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: "Ativo" | "Atrasado" | "Devolvido";
};

const resumo = {
  totalLivros: 248,
  exemplaresDisponiveis: 186,
  leitores: 124,
  emprestimosAtivos: 42,
};

const emprestimosRecentes: Emprestimo[] = [
  {
    id: 1,
    livro: "Dom Casmurro",
    leitor: "Ana Oliveira",
    dataEmprestimo: "2026-10-12",
    dataDevolucao: "2026-10-26",
    status: "Ativo",
  },
  {
    id: 2,
    livro: "O Pequeno Príncipe",
    leitor: "Pedro Santos",
    dataEmprestimo: "2026-10-10",
    dataDevolucao: "2026-10-14",
    status: "Atrasado",
  },
  {
    id: 3,
    livro: "1984",
    leitor: "Mariana Costa",
    dataEmprestimo: "2026-10-09",
    dataDevolucao: "2026-10-23",
    status: "Ativo",
  },
  {
    id: 4,
    livro: "O Hobbit",
    leitor: "Lucas Ferreira",
    dataEmprestimo: "2026-10-08",
    dataDevolucao: "2026-10-22",
    status: "Ativo",
  },
  {
    id: 5,
    livro: "A Revolução dos Bichos",
    leitor: "Juliana Martins",
    dataEmprestimo: "2026-09-20",
    dataDevolucao: "2026-10-04",
    status: "Atrasado",
  },
];

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function StatusBadge({ status }: { status: Emprestimo["status"] }) {
  const estilos = {
    Ativo: "bg-blue-50 text-blue-700",
    Atrasado: "bg-red-50 text-red-700",
    Devolvido: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${estilos[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Ativo"
            ? "bg-blue-600"
            : status === "Atrasado"
              ? "bg-red-600"
              : "bg-emerald-600"
        }`}
      />
      {status}
    </span>
  );
}

export default function DashboardPage() {
  const emprestimosAtrasados = useMemo(
    () =>
      emprestimosRecentes.filter(
        (emprestimo) => emprestimo.status === "Atrasado",
      ).length,
    [],
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activePage="dashboard" />

      <main className="min-h-screen min-w-0 lg:ml-64">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <PageHeader
            title="Dashboard"
            description="Acompanhe os principais números e atividades da biblioteca."
          >
            <Link
              href="/home/emprestimos"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              Novo empréstimo
            </Link>
          </PageHeader>

          {/* Indicadores principais */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total de livros"
              value={resumo.totalLivros}
              description="Livros cadastrados"
              icon="📚"
            />

            <StatCard
              title="Exemplares disponíveis"
              value={resumo.exemplaresDisponiveis}
              description="Prontos para empréstimo"
              icon="✓"
            />

            <StatCard
              title="Leitores cadastrados"
              value={resumo.leitores}
              description="Total de leitores"
              icon="👥"
            />

            <StatCard
              title="Empréstimos ativos"
              value={resumo.emprestimosAtivos}
              description="Livros emprestados"
              icon="↗"
            />
          </section>

          {/* Resumo e atalhos */}
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Visão geral do acervo
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Distribuição dos exemplares cadastrados.
                  </p>
                </div>

                <Link
                  href="/home/livros"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Ver catálogo →
                </Link>
              </div>

              <div className="mt-8">
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-3xl font-bold tracking-tight text-slate-900">
                      {resumo.exemplaresDisponiveis}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      exemplares disponíveis
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-blue-600">
                    {Math.round(
                      (resumo.exemplaresDisponiveis / resumo.totalLivros) * 100,
                    )}
                    % disponíveis
                  </p>
                </div>

                <div
                  className="h-3 overflow-hidden rounded-full bg-slate-100"
                  role="progressbar"
                  aria-label="Percentual de exemplares disponíveis"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(
                    (resumo.exemplaresDisponiveis / resumo.totalLivros) * 100,
                  )}
                >
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{
                      width: `${
                        (resumo.exemplaresDisponiveis / resumo.totalLivros) *
                        100
                      }%`,
                    }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Disponíveis</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {resumo.exemplaresDisponiveis}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Emprestados</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">
                      {Math.max(
                        resumo.totalLivros - resumo.exemplaresDisponiveis,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">
                Acesso rápido
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Vá direto à área que precisa.
              </p>

              <div className="mt-5 space-y-3">
                <Link
                  href="/home/livros"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    📚
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-800">
                      Livros
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Gerenciar catálogo
                    </span>
                  </span>
                  <span className="text-slate-400">→</span>
                </Link>

                <Link
                  href="/home/emprestimos"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-xl">
                    ↗
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-800">
                      Empréstimos
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Controlar retiradas
                    </span>
                  </span>
                  <span className="text-slate-400">→</span>
                </Link>

                <Link
                  href="/home/leitores"
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                    👥
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-800">
                      Leitores
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Gerenciar cadastros
                    </span>
                  </span>
                  <span className="text-slate-400">→</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Empréstimos recentes */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Empréstimos recentes
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Acompanhe as movimentações mais recentes.
                </p>
              </div>

              <Link
                href="/home/emprestimos"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Ver todos →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Livro</th>
                    <th className="px-6 py-4">Leitor</th>
                    <th className="px-6 py-4">Data</th>
                    <th className="px-6 py-4">Devolução</th>
                    <th className="px-6 py-4">Situação</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {emprestimosRecentes.map((emprestimo) => (
                    <tr
                      key={emprestimo.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5 font-semibold text-slate-800">
                        {emprestimo.livro}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {emprestimo.leitor}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatarData(emprestimo.dataEmprestimo)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatarData(emprestimo.dataDevolucao)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-5">
                        <StatusBadge status={emprestimo.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-slate-100 p-5 sm:grid-cols-2 sm:p-6">
              <div className="rounded-xl bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">
                  Empréstimos atrasados
                </p>
                <p className="mt-1 text-2xl font-bold text-red-800">
                  {emprestimosAtrasados}
                </p>
                <p className="mt-1 text-xs text-red-600">
                  Entre os registros recentes exibidos
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-700">
                  Empréstimos ativos
                </p>
                <p className="mt-1 text-2xl font-bold text-blue-800">
                  {
                    emprestimosRecentes.filter(
                      (emprestimo) => emprestimo.status === "Ativo",
                    ).length
                  }
                </p>
                <p className="mt-1 text-xs text-blue-600">
                  Entre os registros recentes exibidos
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
