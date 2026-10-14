"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";

type StatusLeitor = "Ativo" | "Inativo";

type Leitor = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  dataCadastro: string;
  status: StatusLeitor;
};

const leitoresIniciais: Leitor[] = [
  {
    id: 1,
    nome: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    telefone: "(44) 99912-3456",
    documento: "123.456.789-00",
    dataCadastro: "2026-08-12",
    status: "Ativo",
  },
  {
    id: 2,
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
    telefone: "(44) 99876-5432",
    documento: "234.567.890-11",
    dataCadastro: "2026-08-18",
    status: "Ativo",
  },
  {
    id: 3,
    nome: "Mariana Costa",
    email: "mariana.costa@email.com",
    telefone: "(44) 99765-4321",
    documento: "345.678.901-22",
    dataCadastro: "2026-09-02",
    status: "Ativo",
  },
  {
    id: 4,
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@email.com",
    telefone: "(44) 99654-3210",
    documento: "456.789.012-33",
    dataCadastro: "2026-09-10",
    status: "Inativo",
  },
  {
    id: 5,
    nome: "Juliana Martins",
    email: "juliana.martins@email.com",
    telefone: "(44) 99543-2109",
    documento: "567.890.123-44",
    dataCadastro: "2026-09-21",
    status: "Ativo",
  },
];

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function AvatarLeitor({ nome }: { nome: string }) {
  const iniciais = nome
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
      {iniciais}
    </div>
  );
}

function StatusBadge({ status }: { status: StatusLeitor }) {
  const ativo = status === "Ativo";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
        ativo ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          ativo ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

const formularioVazio = {
  nome: "",
  email: "",
  telefone: "",
  documento: "",
};

export default function LeitoresPage() {
  const [leitores, setLeitores] = useState<Leitor[]>(leitoresIniciais);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [leitorEditando, setLeitorEditando] = useState<number | null>(null);
  const [formulario, setFormulario] = useState(formularioVazio);

  const leitoresFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return leitores.filter((leitor) => {
      const correspondeBusca =
        leitor.nome.toLowerCase().includes(termo) ||
        leitor.email.toLowerCase().includes(termo) ||
        leitor.telefone.includes(termo) ||
        leitor.documento.includes(termo);

      const correspondeStatus =
        filtroStatus === "Todos" || leitor.status === filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }, [leitores, busca, filtroStatus]);

  const leitoresAtivos = leitores.filter(
    (leitor) => leitor.status === "Ativo",
  ).length;

  const leitoresInativos = leitores.filter(
    (leitor) => leitor.status === "Inativo",
  ).length;

  function abrirCadastro() {
    setFormulario(formularioVazio);
    setLeitorEditando(null);
    setMostrarFormulario(true);
  }

  function abrirEdicao(leitor: Leitor) {
    setFormulario({
      nome: leitor.nome,
      email: leitor.email,
      telefone: leitor.telefone,
      documento: leitor.documento,
    });
    setLeitorEditando(leitor.id);
    setMostrarFormulario(true);
  }

  function salvarLeitor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailDuplicado = leitores.some(
      (leitor) =>
        leitor.email.toLowerCase() === formulario.email.trim().toLowerCase() &&
        leitor.id !== leitorEditando,
    );

    if (emailDuplicado) {
      alert("Já existe um leitor cadastrado com esse e-mail.");
      return;
    }

    if (leitorEditando !== null) {
      setLeitores((anteriores) =>
        anteriores.map((leitor) =>
          leitor.id === leitorEditando
            ? {
                ...leitor,
                nome: formulario.nome.trim(),
                email: formulario.email.trim(),
                telefone: formulario.telefone.trim(),
                documento: formulario.documento.trim(),
              }
            : leitor,
        ),
      );
    } else {
      const novoLeitor: Leitor = {
        id: Date.now(),
        nome: formulario.nome.trim(),
        email: formulario.email.trim(),
        telefone: formulario.telefone.trim(),
        documento: formulario.documento.trim(),
        dataCadastro: new Date().toLocaleDateString("en-CA"),
        status: "Ativo",
      };

      setLeitores((anteriores) => [novoLeitor, ...anteriores]);
    }

    setFormulario(formularioVazio);
    setLeitorEditando(null);
    setMostrarFormulario(false);
  }

  function alternarStatus(id: number) {
    setLeitores((anteriores) =>
      anteriores.map((leitor) =>
        leitor.id === id
          ? {
              ...leitor,
              status: leitor.status === "Ativo" ? "Inativo" : "Ativo",
            }
          : leitor,
      ),
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activePage="leitores" />

      <main className="min-h-screen min-w-0 lg:ml-64">
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <PageHeader
            title="Leitores"
            description="Cadastre e gerencie os leitores da biblioteca."
          >
            <button
              type="button"
              onClick={abrirCadastro}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
            >
              <span className="text-lg leading-none">+</span>
              Novo leitor
            </button>
          </PageHeader>

          {/* Indicadores */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              title="Total de leitores"
              value={leitores.length}
              description="Cadastros na biblioteca"
              icon="👥"
            />

            <StatCard
              title="Leitores ativos"
              value={leitoresAtivos}
              description="Podem realizar empréstimos"
              icon="✓"
            />

            <StatCard
              title="Leitores inativos"
              value={leitoresInativos}
              description="Cadastros desativados"
              icon="○"
            />
          </section>

          {/* Formulário */}
          {mostrarFormulario && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {leitorEditando !== null
                      ? "Editar leitor"
                      : "Cadastrar leitor"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Informe os dados para manter o cadastro atualizado.
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
                onSubmit={salvarLeitor}
                className="grid grid-cols-1 gap-5 md:grid-cols-2"
              >
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nome completo
                  </label>
                  <input
                    id="nome"
                    value={formulario.nome}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        nome: event.target.value,
                      })
                    }
                    placeholder="Nome do leitor"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formulario.email}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        email: event.target.value,
                      })
                    }
                    placeholder="email@exemplo.com"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="telefone"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="tel"
                    value={formulario.telefone}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        telefone: event.target.value,
                      })
                    }
                    placeholder="(00) 00000-0000"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="documento"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    CPF
                  </label>
                  <input
                    id="documento"
                    value={formulario.documento}
                    onChange={(event) =>
                      setFormulario({
                        ...formulario,
                        documento: event.target.value,
                      })
                    }
                    placeholder="000.000.000-00"
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                    {leitorEditando !== null
                      ? "Salvar alterações"
                      : "Cadastrar leitor"}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Listagem */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Todos os leitores
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Consulte os cadastros e gerencie os status.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="search"
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                    placeholder="Buscar leitor..."
                    aria-label="Buscar leitores"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:min-w-64"
                  />

                  <select
                    value={filtroStatus}
                    onChange={(event) => setFiltroStatus(event.target.value)}
                    aria-label="Filtrar leitores por status"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Todos">Todos os status</option>
                    <option value="Ativo">Ativos</option>
                    <option value="Inativo">Inativos</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tabela para computador */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Leitor</th>
                    <th className="px-6 py-4">Telefone</th>
                    <th className="px-6 py-4">Cadastro</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Ações</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {leitoresFiltrados.map((leitor) => (
                    <tr
                      key={leitor.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <AvatarLeitor nome={leitor.nome} />
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-800">
                              {leitor.nome}
                            </p>
                            <p className="mt-1 break-all text-sm text-slate-500">
                              {leitor.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {leitor.telefone}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                        {formatarData(leitor.dataCadastro)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">
                        <StatusBadge status={leitor.status} />
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(leitor)}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => alternarStatus(leitor.id)}
                            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                              leitor.status === "Ativo"
                                ? "border-red-200 text-red-600 hover:bg-red-50"
                                : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            }`}
                          >
                            {leitor.status === "Ativo" ? "Desativar" : "Ativar"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards para celular */}
            <div className="grid grid-cols-1 gap-3 p-4 md:hidden">
              {leitoresFiltrados.map((leitor) => (
                <article
                  key={leitor.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <AvatarLeitor nome={leitor.nome} />

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words font-semibold text-slate-900">
                        {leitor.nome}
                      </h3>
                      <p className="mt-1 break-all text-sm text-slate-500">
                        {leitor.email}
                      </p>
                      <div className="mt-3">
                        <StatusBadge status={leitor.status} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm">
                    <p className="text-slate-600">
                      <span className="text-slate-400">Telefone: </span>
                      {leitor.telefone}
                    </p>
                    <p className="text-slate-600">
                      <span className="text-slate-400">Cadastro: </span>
                      {formatarData(leitor.dataCadastro)}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => abrirEdicao(leitor)}
                      className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => alternarStatus(leitor.id)}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-semibold transition ${
                        leitor.status === "Ativo"
                          ? "border-red-200 text-red-600 hover:bg-red-50"
                          : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      }`}
                    >
                      {leitor.status === "Ativo" ? "Desativar" : "Ativar"}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {leitoresFiltrados.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mb-3 text-4xl">👥</div>
                <h3 className="font-semibold text-slate-800">
                  Nenhum leitor encontrado
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Tente mudar a busca ou os filtros.
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
              <p className="text-sm text-slate-500">
                Exibindo{" "}
                <span className="font-semibold text-slate-700">
                  {leitoresFiltrados.length}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-slate-700">
                  {leitores.length}
                </span>{" "}
                leitores
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
