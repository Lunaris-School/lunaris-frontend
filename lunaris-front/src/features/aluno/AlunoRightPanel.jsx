import React from "react";
import { Link } from "react-router-dom";
import "./AlunoRightPanel.css";

import iconePerfil from "../../assets/icone-perfil.png";

export default function AlunoRightPanel() {
  const aluno = {
    nome: "Fulana de tal",
    serieTurma: "5ª série F",
  };

  return (
    <aside className="aluno-right">
      <div className="aluno-right-perfil">
        <div className="aluno-right-avatar">
          <img src={iconePerfil} alt="" />
        </div>
        <div className="aluno-right-nome">{aluno.nome}</div>
        <div className="aluno-right-serie">{aluno.serieTurma}</div>
        <Link to="/perfil-aluno" className="aluno-right-btn">
          Perfil
        </Link>
      </div>

      <div className="aluno-right-calendario">
        <div className="calendario-topo">
          <button className="seta">{"<"}</button>
          <span className="calendario-mes">Agosto 2025</span>
          <button className="seta">{">"}</button>
        </div>

        <div className="calendario-grid">
          <div className="semana">DOM</div>
          <div className="semana">SEG</div>
          <div className="semana">TER</div>
          <div className="semana">QUA</div>
          <div className="semana">QUI</div>
          <div className="semana">SEX</div>
          <div className="semana">SÁB</div>

          {Array.from({ length: 31 }).map((_, i) => {
            const dia = i + 1;
            const hoje = dia === 21;
            return (
              <div
                key={dia}
                className={`dia ${hoje ? "dia-hoje" : ""}`}
              >
                {dia}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

