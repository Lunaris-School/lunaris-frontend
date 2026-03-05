import React, { useState } from "react";
import "./AlunoPages.css";
import AlunoRightPanel from "../AlunoRightPanel";
import Search from "../../../components/Search";

export default function AlunoMaterias() {
  const [busca, setBusca] = useState("");

  const materias = [
    {
      id: 1,
      nome: "Geografia",
      professor: "Professor Flávio Xo",
    },
    {
      id: 2,
      nome: "Matemática",
      professor: "Professor Marquinhos",
    },
    {
      id: 3,
      nome: "Português",
      professor: "Professor João Jonas",
    },
    {
      id: 4,
      nome: "Inglês",
      professor: "Professora Leda",
    },
  ];

  const lista = materias.filter((m) => {
    if (busca.trim() === "") return true;
    const termo = busca.toLowerCase();
    return (
      m.nome.toLowerCase().includes(termo) ||
      m.professor.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <header className="aluno-main-header">
          <h1>Matérias</h1>

          <Search
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar matéria"
          />
        </header>

        <section className="aluno-cards">
          {lista.map((m) => (
            <div key={m.id} className="aluno-card">
              <div className="aluno-card-textos">
                <h2>{m.nome}</h2>
                <p className="aluno-card-prof">{m.professor}</p>
              </div>
              <div className="aluno-card-ilustracao" />
            </div>
          ))}
        </section>
      </main>

      <AlunoRightPanel />
    </div>
  );
}

