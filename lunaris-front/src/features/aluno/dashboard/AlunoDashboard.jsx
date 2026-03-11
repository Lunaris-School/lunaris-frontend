import React from "react";
import "../AlunoPages.css";
import AlunoRightPanel from "../AlunoRightPanel";

export default function AlunoDashboard() {
  const aulas = [
    {
      id: 1,
      materia: "Geografia",
      horario: "07h às 07h50",
      professor: "Professor Flávio Xo",
    },
    {
      id: 2,
      materia: "Matemática",
      horario: "07h50 às 08h40",
      professor: "Professor Marquinhos",
    },
    {
      id: 3,
      materia: "Português",
      horario: "8h40 às 9h30",
      professor: "Professor João Jonas",
    },
    {
      id: 4,
      materia: "Inglês",
      horario: "10h às 10h50",
      professor: "Professora Leda",
    },
  ];

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <header className="aluno-main-header">
          <h1>Cronograma do dia</h1>

          <div className="aluno-date-picker">
            <span>21/08/2026</span>
          </div>
        </header>

        <section className="aluno-cards">
          {aulas.map((aula) => (
            <div key={aula.id} className="aluno-card">
              <div className="aluno-card-textos">
                <h2>{aula.materia}</h2>
                <p className="aluno-card-horario">{aula.horario}</p>
                <p className="aluno-card-prof">{aula.professor}</p>
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

