import React from "react";
import { Link } from "react-router-dom";
import "./AlunoBox.css";

import iconeMasculino from "../assets/icone-masculino.png";
import iconeFeminino from "../assets/icone-feminino.png";

export default function AlunoBox({ id, nome, turma, matricula, genero }) {
  return (
    <Link to={`/alunos/${id}`} className="aluno">
      <div className="aluno-left">
        <img
          className="aluno-avatar"
          src={genero === "M" ? iconeMasculino : iconeFeminino}
          alt=""
        />

        <div className="aluno-texto">
          <div className="aluno-nome">
            {nome}, <span className="aluno-turma">{turma}</span>
          </div>
          <div className="aluno-matricula">{matricula}</div>
        </div>
      </div>

      <div className="aluno-arrow">{">"}</div>
    </Link>
  );
}
