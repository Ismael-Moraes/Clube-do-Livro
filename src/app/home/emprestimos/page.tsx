"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";

type StatusEmprestimo = "Ativo" | "Atrasado" | "Devolvido";

type Emprestimo = {
  id: number;
  livro: string;
  leitor: string;
  dataEmprestimo: string;
  dataDevolucao: string;
  status: StatusEmprestimo;
};

const emprestimosIniciais: Emprestimo[] = [
  {
    id: 1,
    livro: "Dom Casmurro",
    leitor: "Ana Oliveira",
    dataEmprestimo: "2026-10-01",
    dataDevolucao: "2026-10-15",
    status: "Ativo",
  },
  {
    id: 2,
    livro: "O Pequeno Príncipe",
    leitor: "Pedro Santos",
    dataEmprestimo: "2026-09-20",
    dataDevolucao: "2026-10-04",
    status: "Atrasado",
  },
  {
    id: 3,
    livro: "1984",
    leitor: "Mariana Costa",
    dataEmprestimo: "2026-09-10",
    dataDevolucao: "2026-09-24",
    status: "Devolvido",
  },
  {
    id: 4,
    livro: "A Revolução dos Bichos",
    leitor: "Lucas Ferreira",
    dataEmprestimo: "2026-10-05",
    dataDevolucao: "2026-10-19",
    status: "Ativo",
  },
  {
    id: 5,
    livro: "O Hobbit",
    leitor: "Juliana Martins",
    dataEmprestimo: "2026-09-15",
    dataDevolucao: "2026-09-29",
    status: "Atrasado",
  },
  {
    id: 6,
    livro: "A Hora da Estrela",
    leitor: "Rafael Almeida",
    dataEmprestimo: "2026-09-25",
    dataDevolucao: "2026-10-09",
    status: "Devolvido",
  },
];

function formatarData(data: string) {
  if (!data) return "—";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function obterStatus(emprestimo: Emprestimo): StatusEmprestimo {
  if (emprestimo.status === "Devolvido") {
    return "Devolvido";
  }

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const [ano, mes, dia] = emprestimo.dataDevolucao.split("-").map(Number);

  const dataLimite = new Date(ano, mes - 1, dia);
  dataLimite.setHours(0, 0, 0, 0);

  return dataLimite < hoje ? "Atrasado" : "Ativo";
}

function StatusBadge({ status }: { status: StatusEmprestimo }) {
  const estilos: Record<StatusEmprestimo, string> = {
    Ativo: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Atrasado: "bg-red-50 text-red-700 ring-red-600/20",
    Devolvido: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${estilos[status]}`}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${
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

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] =
    useState<Emprestimo[]>(emprestimosIniciais);

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [livro, setLivro] = useState("");
  const [leitor, setLeitor] = useState("");
  const [dataEmprestimo, setDataEmprestimo] = useState(
    new Date().toLocaleDateString("en-CA"),
  );
  const [dataDevolucao, setDataDevolucao] = useState("");

  const emprestimosComStatus = useMemo(
    () =>
      emprestimos.map((emprestimo) => ({
        ...emprestimo,
        status: obterStatus(emprestimo),
      })),
    [emprestimos],
  );

  const emprestimosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return emprestimosComStatus.filter((emprestimo) => {
      const correspondeBusca =
        emprestimo.livro.toLowerCase().includes(termo) ||
        emprestimo.leitor.toLowerCase().includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" || emprestimo.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [emprestimosComStatus, busca, filtroStatus]);

  const ativos = emprestimosComStatus.filter(
    (emprestimo) => emprestimo.status === "Ativo",
  ).length;

  const atrasados = emprestimosComStatus.filter(
    (emprestimo) => emprestimo.status === "Atrasado",
  ).length;

  const devolvidos = emprestimosComStatus.filter(
    (emprestimo) => emprestimo.status === "Devolvido",
  ).length;

  function registrarEmprestimo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!livro.trim() || !leitor.trim() || !dataEmprestimo || !dataDevolucao) {
      return;
    }

    if (dataDevolucao < dataEmprestimo) {
      alert("A data de devolução não pode ser anterior à data do empréstimo.");
      return;
    }

    const novoEmprestimo: Emprestimo = {
      id: Date.now(),
      livro: livro.trim(),
      leitor: leitor.trim(),
      dataEmprestimo,
      dataDevolucao,
      status: "Ativo",
    };

    setEmprestimos((anteriores) => [novoEmprestimo, ...anteriores]);

    setLivro("");
    setLeitor("");
    setDataEmprestimo(new Date().toLocaleDateString("en-CA"));
    setDataDevolucao("");
    setMostrarFormulario(false);
  }

  function devolverLivro(id: number) {
    setEmprestimos((anteriores) =>
      anteriores.map((emprestimo) =>
        emprestimo.id === id
          ? { ...emprestimo, status: "Devolvido" }
          : emprestimo,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activePage="emprestimos" />

      <main className="min-h-screen min-w-0 lg:ml-64">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <PageHeader
            title="Empréstimos"
            description="Gerencie os empréstimos, acompanhe os prazos e registre as devoluções."
          >
            <button
              type="button"
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              Novo empréstimo
            </button>
          </PageHeader>

          {/* Indicadores */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Empréstimos ativos"
              value={ativos}
              description="Livros dentro do prazo"
              icon="📚"
            />

            <StatCard
              title="Empréstimos atrasados"
              value={atrasados}
              description="Precisam de atenção"
              icon="⏰"
            />

            <StatCard
              title="Livros devolvidos"
              value={devolvidos}
              description="Devoluções registradas"
              icon="✓"
            />
          </section>

          {/* Formulário de novo empréstimo */}
          {mostrarFormulario && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Registrar empréstimo
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Preencha os dados do livro e do leitor.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  aria-label="Fechar formulário"
                  className="rounded-lg px-3 py-1 text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={registrarEmprestimo}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                <div>
                  <label
                    htmlFor="livro"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Título do livro
                  </label>
                  <input
                    id="livro"
                    type="text"
                    value={livro}
                    onChange={(event) => setLivro(event.target.value)}
                    placeholder="Digite o título do livro"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="leitor"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nome do leitor
                  </label>
                  <input
                    id="leitor"
                    type="text"
                    value={leitor}
                    onChange={(event) => setLeitor(event.target.value)}
                    placeholder="Digite o nome do leitor"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dataEmprestimo"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Data do empréstimo
                  </label>
                  <input
                    id="dataEmprestimo"
                    type="date"
                    value={dataEmprestimo}
                    onChange={(event) => setDataEmprestimo(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dataDevolucao"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Data prevista para devolução
                  </label>
                  <input
                    id="dataDevolucao"
                    type="date"
                    min={dataEmprestimo}
                    value={dataDevolucao}
                    onChange={(event) => setDataDevolucao(event.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row md:col-span-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setMostrarFormulario(false)}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Registrar empréstimo
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Lista de empréstimos */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Todos os empréstimos
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Consulte e atualize os registros da biblioteca.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative min-w-0 sm:min-w-64">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ⌕
                    </span>
                    <input
                      type="search"
                      value={busca}
                      onChange={(event) => setBusca(event.target.value)}
                      placeholder="Buscar livro ou leitor..."
                      aria-label="Buscar empréstimos"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <select
                    value={filtroStatus}
                    onChange={(event) => setFiltroStatus(event.target.value)}
                    aria-label="Filtrar por situação"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Todos">Todas as situações</option>
                    <option value="Ativo">Ativos</option>
                    <option value="Atrasado">Atrasados</option>
                    <option value="Devolvido">Devolvidos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabela para telas maiores */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Livro e leitor</th>
                    <th className="px-6 py-4">Empréstimo</th>
                    <th className="px-6 py-4">Devolução prevista</th>
                    <th className="px-6 py-4">Situação</th>
                    <th className="px-6 py-4 text-right">Ação</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {emprestimosFiltrados.map((emprestimo) => (
                    <tr
                      key={emprestimo.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-800">
                          {emprestimo.livro}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {emprestimo.leitor}
                        </p>
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

                      <td className="px-6 py-5 text-right">
                        {emprestimo.status !== "Devolvido" ? (
                          <button
                            type="button"
                            onClick={() => devolverLivro(emprestimo.id)}
                            className="whitespace-nowrap rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            Registrar devolução
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-slate-400">
                            Concluído
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards para telas menores */}
            <div className="grid grid-cols-1 gap-3 p-4 md:hidden">
              {emprestimosFiltrados.map((emprestimo) => (
                <article
                  key={emprestimo.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-slate-900">
                        {emprestimo.livro}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {emprestimo.leitor}
                      </p>
                    </div>

                    <StatusBadge status={emprestimo.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Data do empréstimo
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {formatarData(emprestimo.dataEmprestimo)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Devolução prevista
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {formatarData(emprestimo.dataDevolucao)}
                      </p>
                    </div>
                  </div>

                  {emprestimo.status !== "Devolvido" && (
                    <button
                      type="button"
                      onClick={() => devolverLivro(emprestimo.id)}
                      className="mt-4 w-full rounded-xl border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Registrar devolução
                    </button>
                  )}
                </article>
              ))}
            </div>

            {emprestimosFiltrados.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mb-3 text-4xl">📖</div>
                <h3 className="font-semibold text-slate-800">
                  Nenhum empréstimo encontrado
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Tente alterar a busca ou selecionar outra situação.
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
              <p className="text-sm text-slate-500">
                Exibindo{" "}
                <span className="font-semibold text-slate-700">
                  {emprestimosFiltrados.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-700">
                  {emprestimos.length}
                </span>{" "}
                empréstimos
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
