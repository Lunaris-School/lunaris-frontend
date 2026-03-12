import React from "react";
import { Link } from "react-router-dom";
import "./AlunoBox.css";

import iconeMasculino from "../assets/icone-masculino.png";
import iconeFeminino from "../assets/icone-feminino.png";

export default function AlunoBox({
  id,
  nome,
  turma,
  matricula,
  genero,
  generoId,
}) {
  function obterIconeGenero() {
    const generoTexto = String(genero || "").trim().toLowerCase();

    if (generoTexto === "masculino" || generoTexto === "m") {
      return iconeMasculino;
    }

    if (generoTexto === "feminino" || generoTexto === "f") {
      return iconeFeminino;
    }

    if (generoId != null) {
      const idNumero = Number(generoId);

      if (!Number.isNaN(idNumero)) {
        return idNumero % 2 !== 0 ? iconeMasculino : iconeFeminino;
      }
    }

    return iconeFeminino;
  }

  return (
    <Link to={`/alunos/${id}`} className="aluno-box">
      <div className="aluno-left">
        <img
          className="aluno-avatar"
          src={obterIconeGenero()}
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