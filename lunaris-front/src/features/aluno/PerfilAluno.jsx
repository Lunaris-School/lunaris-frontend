import React from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilAluno.css";
import iconePerfil from "../../assets/icone-perfil.png";

export default function PerfilAluno() {
  const navigate = useNavigate();
  const aluno = {
    nome: "Fulana de tal",
    turma: "5ª série F",
    email: "fulana.de.tal@gmail.com",
    matricula: "5588201-10",
  };

  const desempenho = [
    {
      id: 1,
      materia: "Português",
      nota1: "8,0",
      nota2: "9,0",
      media: "8,5",
      observacoes: "Participa bastante das aulas.",
    },
  ];

  return (
    <div className="perfil-aluno-page">
      <div className="perfil-aluno-header">
        <button type="button" className="perfil-voltar" onClick={() => navigate(-1)} aria-label="Voltar">
            {"<"}
          </button>
        <h1>Perfil</h1>
      </div>

      <div className="perfil-aluno-topo">
        <div className="perfil-aluno-avatar">
          <img src={iconePerfil} alt="" />
        </div>

        <div className="perfil-aluno-dados">
          <h2>{aluno.nome}</h2>
          <p>
            <strong>Turma:</strong> {aluno.turma}
          </p>
          <p>
            <strong>E-mail:</strong> {aluno.email}
          </p>
          <p>
            <strong>Matrícula:</strong> {aluno.matricula}
          </p>
        </div>
      </div>

      <section className="perfil-aluno-desempenho">
        <h3>Meu desempenho</h3>

        <div className="perfil-aluno-tabela">
          <div className="linha cabecalho">
            <span>Matéria</span>
            <span>Nota 1</span>
            <span>Nota 2</span>
            <span>Média</span>
            <span>Observações</span>
          </div>

          {desempenho.map((d) => (
            <div key={d.id} className="linha">
              <span>{d.materia}</span>
              <span>{d.nota1}</span>
              <span>{d.nota2}</span>
              <span>{d.media}</span>
              <span>{d.observacoes}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

