import React from "react";
import "./PerfilProfessor.css";

import iconePerfil from "../../assets/icone-perfil.png";

export default function PerfilProfessor() {
  // mock 
  const professor = {
    nome: "Professor João Jonas da Silva",
    disciplina: "Português",
    email: "joao.jonas@gmail.com",
    dataContratacao: "27/05/25",
  };

  return (
    <div className="perfil-professor">
      <div className="perfil-card">
        <div className="perfil-topo">
          <div className="perfil-avatar">
            <img src={iconePerfil} alt="" />
          </div>

          <div className="perfil-nome">
            <h2>{professor.nome}</h2>
          </div>
        </div>

        <div className="perfil-info">
          <p className="label">Disciplina:</p>
          <p className="valor">{professor.disciplina}</p>

          <p className="label">E-mail:</p>
          <p className="valor">{professor.email}</p>

          <p className="label">Data de Contratação:</p>
          <p className="valor">{professor.dataContratacao}</p>
        </div>
      </div>
    </div>
  );
}
