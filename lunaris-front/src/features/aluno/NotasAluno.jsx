import React from "react";
import "../notas/Notas.css";

export default function NotasAluno() {
  const disciplinas = [
    {
      id: 1,
      nome: "Português",
      professor: "João Jonas",
      nota1: "8,0",
      nota2: "9,0",
    },
    {
      id: 2,
      nome: "Matemática",
      professor: "Ana Paula",
      nota1: "7,5",
      nota2: "8,0",
    },
  ];

  return (
    <div className="notas">
      <div className="cabecalho">
        <div className="c1">Disciplina</div>
        <div className="c2">Nota 1</div>
        <div className="c3">Nota 2</div>
        <div className="c4">Média</div>
        <div className="c5">Status</div>
      </div>

      {disciplinas.map((d) => {
        const n1 = parseFloat(d.nota1.replace(",", "."));
        const n2 = parseFloat(d.nota2.replace(",", "."));
        const mediaNumero = (n1 + n2) / 2;
        const media = mediaNumero.toFixed(1).replace(".", ",");
        const status = mediaNumero >= 7 ? "Aprovado" : "Reprovado";

        return (
          <div key={d.id} className="card">
            <div className="notas-aluno">
              <div>
                <div className="nome">{d.nome}</div>
                <div className="matricula">Prof. {d.professor}</div>
              </div>
            </div>

            <div className="n1">
              <span>{d.nota1}</span>
            </div>

            <div className="n2">
              <span>{d.nota2}</span>
            </div>

            <div className="media">{media}</div>

            <div className="status-div">
              <div className={`status ${status}`}>{status}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

