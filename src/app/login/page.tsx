"use client";

import { useState } from "react";
import Link from "next/link";

type Modo = "login" | "cadastro";

export default function LoginPage() {
  const [modo, setModo] = useState<Modo>("login");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert(
      modo === "login"
        ? "A autenticação ainda precisa ser configurada."
        : "O cadastro ainda precisa ser conectado ao sistema.",
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f5f6fa] px-4 py-6 sm:px-8">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href="/home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" />
              <path d="M4 5.5v12M8 7h8M8 11h8" />
            </svg>
          </div>

          <span className="text-lg font-semibold text-gray-900">
            Biblioteca
          </span>
        </Link>

        <Link
          href="/home"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Voltar ao painel
        </Link>
      </header>

      <section className="mx-auto mt-10 grid w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:mt-16 md:grid-cols-2">
        <div className="flex flex-col justify-between bg-[#172b4d] p-8 text-white sm:p-12">
          <div>
            <span className="text-sm font-medium text-blue-200">
              SEU ESPAÇO DE LEITURA
            </span>

            <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
              Conhecimento começa com uma página.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-blue-100/80">
              Acesse o sistema da biblioteca para acompanhar livros, empréstimos
              e leitores em um só lugar.
            </p>
          </div>

          <div className="mt-12 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-1 w-10 rounded-full bg-blue-400" />
              <div className="h-1 w-5 rounded-full bg-white/30" />
              <div className="h-1 w-5 rounded-full bg-white/30" />
            </div>
            <p className="mt-4 text-xs text-blue-100/60">
              Organização simples para sua biblioteca.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-10 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {modo === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {modo === "login"
                ? "Entre com seus dados para continuar."
                : "Preencha os campos para se cadastrar."}
            </p>
          </div>

          <div className="mb-7 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setModo("login")}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                modo === "login"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setModo("cadastro")}
              className={`rounded-md px-3 py-2.5 text-sm font-medium transition ${
                modo === "cadastro"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Inscrever-se
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {modo === "cadastro" && (
              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Nome completo
                </label>

                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@exemplo.com"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="senha"
                  className="block text-sm font-medium text-gray-700"
                >
                  Senha
                </label>

                {modo === "login" && (
                  <button
                    type="button"
                    onClick={() =>
                      alert("A recuperação de senha ainda não foi configurada.")
                    }
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Esqueceu a senha?
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete={
                    modo === "login" ? "current-password" : "new-password"
                  }
                  minLength={6}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-gray-800"
                >
                  {mostrarSenha ? "Ocultar" : "Mostrar"}
                </button>
              </div>

              {modo === "cadastro" && (
                <p className="mt-2 text-xs text-gray-500">
                  A senha deve ter pelo menos 6 caracteres.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {modo === "login" ? "Entrar na conta" : "Criar conta"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-500">
            {modo === "login"
              ? "Ainda não tem uma conta?"
              : "Já possui uma conta?"}{" "}
            <button
              type="button"
              onClick={() => setModo(modo === "login" ? "cadastro" : "login")}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              {modo === "login" ? "Inscreva-se" : "Faça login"}
            </button>
          </p>
        </div>
      </section>

      <footer className="mx-auto mt-8 max-w-5xl text-center text-xs text-gray-400">
        Sistema de gerenciamento de biblioteca
      </footer>
    </main>
  );
}
