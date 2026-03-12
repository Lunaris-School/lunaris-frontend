import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AlunoRightPanel.css";
import { buscarBoletimAluno } from "../../services/boletimService";

import iconePerfil from "../../assets/icone-perfil.png";

const gerarAvatarUrl = (cpf) => {
  if (!cpf) return iconePerfil;
  
  const seed = cpf.toString();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`;
};

export default function AlunoRightPanel() {
  const [aluno, setAluno] = useState({
    nome: localStorage.getItem("userName") || "Aluno",
    serieTurma: "Carregando...",
    avatarUrl: iconePerfil,
  });
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const carregarDadosAluno = async () => {
      try {
        const cpf = localStorage.getItem("cpf");
        if (cpf) {
          const response = await buscarBoletimAluno(cpf);
          const boletimData = Array.isArray(response.data) && response.data.length > 0 
            ? response.data[0] 
            : response.data;
          
          if (boletimData) {
            setAluno({
              nome: boletimData.alunoNome || localStorage.getItem("userName") || "Aluno",
              serieTurma: boletimData.turmaNome || "Turma não definida",
              avatarUrl: gerarAvatarUrl(cpf, boletimData.alunoNome),
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error);
      }
    };

    carregarDadosAluno();
  }, []);

  return (
    <aside className="aluno-right">
      <div className="aluno-right-perfil">
        <div className="aluno-right-avatar">
          <img src={aluno.avatarUrl} alt={aluno.nome} />
        </div>
        <div className="aluno-right-nome">{aluno.nome}</div>
        <div className="aluno-right-serie">{aluno.serieTurma}</div>
        <Link to="/perfil-aluno" className="aluno-right-btn">
          Perfil
        </Link>
      </div>

      <div className="aluno-right-calendario">
        <div className="calendario-topo">
          <button type="button" className="calendario-btn-nav" aria-label="Mês anterior" onClick={() => setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() - 1))}>
            <span className="calendario-btn-chevron" aria-hidden>‹</span>
          </button>
          <span className="calendario-mes">
            {dataAtual.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, (c) => c.toUpperCase())}
          </span>
          <button type="button" className="calendario-btn-nav" aria-label="Próximo mês" onClick={() => setDataAtual(new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1))}>
            <span className="calendario-btn-chevron" aria-hidden>›</span>
          </button>
        </div>

        <div className="calendario-grid">
          <div className="semana">DOM</div>
          <div className="semana">SEG</div>
          <div className="semana">TER</div>
          <div className="semana">QUA</div>
          <div className="semana">QUI</div>
          <div className="semana">SEX</div>
          <div className="semana">SÁB</div>

          {(() => {
            const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1).getDay();
            const diasNoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
            const hoje = new Date();
            const mesAtual = hoje.getMonth() === dataAtual.getMonth() && hoje.getFullYear() === dataAtual.getFullYear();
            
            return (
              <>
                {Array.from({ length: primeiroDia }).map((_, i) => (
                  <div key={`vazio-${i}`} className="dia vazio"></div>
                ))}
                {Array.from({ length: diasNoMes }).map((_, i) => {
                  const dia = i + 1;
                  const ehHoje = mesAtual && dia === hoje.getDate();
                  return (
                    <div
                      key={dia}
                      className={`dia ${ehHoje ? "dia-hoje" : ""}`}
                    >
                      {dia}
                    </div>
                  );
                })}
              </>
            );
          })()}
        </div>
      </div>
    </aside>
  );
}

