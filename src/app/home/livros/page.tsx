"use client";

import { useMemo, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import PageHeader from "../../../components/PageHeader";
import StatCard from "../../../components/StatCard";

type Livro = {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  ano: number;
  isbn: string;
  exemplares: number;
  disponiveis: number;
  capa: string;
  cor: string;
};

const livrosIniciais: Livro[] = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Literatura",
    ano: 1899,
    isbn: "9788535910663",
    exemplares: 8,
    disponiveis: 5,
    capa: "DOM\nCASMURRO",
    cor: "from-amber-100 to-orange-200",
  },
  {
    id: 2,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Ficção",
    ano: 1943,
    isbn: "9788522031445",
    exemplares: 10,
    disponiveis: 7,
    capa: "O PEQUENO\nPRÍNCIPE",
    cor: "from-sky-100 to-blue-200",
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    categoria: "Ficção",
    ano: 1949,
    isbn: "9788535914849",
    exemplares: 6,
    disponiveis: 2,
    capa: "1984",
    cor: "from-slate-200 to-slate-400",
  },
  {
    id: 4,
    titulo: "A Revolução dos Bichos",
    autor: "George Orwell",
    categoria: "Literatura",
    ano: 1945,
    isbn: "9788535909555",
    exemplares: 5,
    disponiveis: 0,
    capa: "A REVOLUÇÃO\nDOS BICHOS",
    cor: "from-rose-100 to-red-200",
  },
  {
    id: 5,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    categoria: "Tecnologia",
    ano: 2008,
    isbn: "9780132350884",
    exemplares: 4,
    disponiveis: 3,
    capa: "CLEAN\nCODE",
    cor: "from-emerald-100 to-teal-200",
  },
  {
    id: 6,
    titulo: "Hábitos Atômicos",
    autor: "James Clear",
    categoria: "Desenvolvimento pessoal",
    ano: 2018,
    isbn: "9788550807560",
    exemplares: 7,
    disponiveis: 4,
    capa: "HÁBITOS\nATÔMICOS",
    cor: "from-violet-100 to-purple-200",
  },
  {
    id: 7,
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien",
    categoria: "Fantasia",
    ano: 1937,
    isbn: "9788595084742",
    exemplares: 9,
    disponiveis: 6,
    capa: "O HOBBIT",
    cor: "from-lime-100 to-green-200",
  },
  {
    id: 8,
    titulo: "A Arte da Guerra",
    autor: "Sun Tzu",
    categoria: "História",
    ano: -500,
    isbn: "9788572839009",
    exemplares: 3,
    disponiveis: 1,
    capa: "A ARTE\nDA GUERRA",
    cor: "from-stone-200 to-stone-400",
  },
];

const categorias = [
  "Todas",
  ...Array.from(new Set(livrosIniciais.map((livro) => livro.categoria))),
];

export default function LivrosPage() {
  const [livros] = useState<Livro[]>(livrosIniciais);
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
  const [disponibilidade, setDisponibilidade] = useState("Todas");

  const totalExemplares = livros.reduce(
    (total, livro) => total + livro.exemplares,
    0,
  );

  const exemplaresDisponiveis = livros.reduce(
    (total, livro) => total + livro.disponiveis,
    0,
  );

  const livrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");

    return livros.filter((livro) => {
      const correspondeBusca =
        livro.titulo.toLocaleLowerCase("pt-BR").includes(termo) ||
        livro.autor.toLocaleLowerCase("pt-BR").includes(termo) ||
        livro.isbn.includes(termo);

      const correspondeCategoria =
        categoriaSelecionada === "Todas" ||
        livro.categoria === categoriaSelecionada;

      const correspondeDisponibilidade =
        disponibilidade === "Todas" ||
        (disponibilidade === "Disponíveis" && livro.disponiveis > 0) ||
        (disponibilidade === "Indisponíveis" && livro.disponiveis === 0);

      return (
        correspondeBusca && correspondeCategoria && correspondeDisponibilidade
      );
    });
  }, [livros, busca, categoriaSelecionada, disponibilidade]);

  function limparFiltros() {
    setBusca("");
    setCategoriaSelecionada("Todas");
    setDisponibilidade("Todas");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activePage="livros" />

      <main className="min-h-screen min-w-0 md:ml-64">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 md:px-8 md:pt-10">
          <PageHeader
            title="Livros"
            description="Explore e organize os livros da biblioteca."
          >
            <button
              type="button"
              onClick={() =>
                alert("O cadastro de livros será desenvolvido em outra etapa.")
              }
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
            >
              <span className="text-lg leading-none">+</span>
              Novo livro
            </button>
          </PageHeader>

          <section
            aria-label="Resumo do acervo"
            className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            <StatCard
              title="Títulos cadastrados"
              value={livros.length}
              description="Obras no catálogo"
              icon="▤"
            />

            <StatCard
              title="Total de exemplares"
              value={totalExemplares}
              description="Cópias cadastradas"
              icon="▥"
            />

            <StatCard
              title="Disponíveis"
              value={exemplaresDisponiveis}
              description="Prontos para empréstimo"
              icon="✓"
            />
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Acervo de livros
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Consulte os títulos cadastrados na biblioteca.
                  </p>
                </div>

                <p className="text-sm text-slate-500">
                  Exibindo{" "}
                  <span className="font-semibold text-slate-800">
                    {livrosFiltrados.length}
                  </span>{" "}
                  de{" "}
                  <span className="font-semibold text-slate-800">
                    {livros.length}
                  </span>{" "}
                  títulos
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_220px_200px_auto]">
                <div className="relative">
                  <label htmlFor="busca-livros" className="sr-only">
                    Buscar livros
                  </label>

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                    ⌕
                  </span>

                  <input
                    id="busca-livros"
                    type="search"
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                    placeholder="Buscar por título, autor ou ISBN..."
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label htmlFor="filtro-categoria" className="sr-only">
                    Filtrar por categoria
                  </label>

                  <select
                    id="filtro-categoria"
                    value={categoriaSelecionada}
                    onChange={(event) =>
                      setCategoriaSelecionada(event.target.value)
                    }
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria === "Todas"
                          ? "Todas as categorias"
                          : categoria}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="filtro-disponibilidade" className="sr-only">
                    Filtrar por disponibilidade
                  </label>

                  <select
                    id="filtro-disponibilidade"
                    value={disponibilidade}
                    onChange={(event) => setDisponibilidade(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  >
                    <option value="Todas">Todas as disponibilidades</option>
                    <option value="Disponíveis">
                      Com exemplares disponíveis
                    </option>
                    <option value="Indisponíveis">
                      Sem exemplares disponíveis
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={limparFiltros}
                  className="h-12 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  Limpar filtros
                </button>
              </div>
            </div>

            {livrosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
                {livrosFiltrados.map((livro) => {
                  const semDisponibilidade = livro.disponiveis === 0;

                  return (
                    <article
                      key={livro.id}
                      className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                    >
                      <div
                        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${livro.cor}`}
                      >
                        <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur">
                          {livro.categoria}
                        </div>

                        <div className="flex h-32 w-24 items-center justify-center whitespace-pre-line rounded-r-md border-l-4 border-black/15 bg-white/80 px-2 text-center text-base font-bold text-slate-700 shadow-md transition duration-200 group-hover:scale-105">
                          {livro.capa}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="min-h-[76px]">
                          <h3
                            className="line-clamp-2 font-bold text-slate-900"
                            title={livro.titulo}
                          >
                            {livro.titulo}
                          </h3>

                          <p
                            className="mt-1 line-clamp-1 text-sm text-slate-500"
                            title={livro.autor}
                          >
                            {livro.autor}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                              semDisponibilidade
                                ? "bg-red-50 text-red-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                semDisponibilidade
                                  ? "bg-red-500"
                                  : "bg-emerald-500"
                              }`}
                            />

                            {semDisponibilidade ? "Indisponível" : "Disponível"}
                          </span>

                          <span className="text-xs font-medium text-slate-600">
                            {livro.disponiveis} disponíveis
                          </span>
                        </div>
                        <p className="mt-3 truncate text-xs text-slate-400">
                          ISBN: {livro.isbn}
                        </p>

                        <button
                          type="button"
                          disabled={semDisponibilidade}
                          onClick={() =>
                            alert(
                              `O aluguel de "${livro.titulo}" será implementado em outra etapa.`,
                            )
                          }
                          className={`mt-4 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                            semDisponibilidade
                              ? "cursor-not-allowed bg-slate-100 text-slate-400"
                              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]"
                          }`}
                        >
                          {semDisponibilidade
                            ? "Indisponível para aluguel"
                            : "Alugar livro"}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl text-slate-400">
                  ⌕
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Nenhum livro encontrado
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Não encontramos livros com esses critérios. Tente mudar a
                  busca ou remover alguns filtros.
                </p>

                <button
                  type="button"
                  onClick={limparFiltros}
                  className="mt-5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </section>

          <footer className="mt-6 text-center text-xs text-slate-400">
            Sistema de gestão da biblioteca
          </footer>
        </div>
      </main>
    </div>
  );
}
