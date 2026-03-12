import React from "react";
import "../adm/desempenho-adm/DesempenhoAdm.css";
import iconePerfil from "../../assets/icone-perfil.png";

export default function DesempenhoAluno() {
  const aluno = {
    nome: "Clara Bartolini",
    turma: "3ºE",
    matricula: "12345678934",
  };

  const desempenho = {
    mediaGeral: "8,5",
    presenca: "92%",
    status: "Aprovado",
  };

  return (
    <div className="desempenho-adm-container">
      <div className="topo">
        <div className="aluno">
          <img className="avatar" src={iconePerfil} alt="" />
          <div>
            <div className="nome">
              {aluno.nome}, {aluno.turma}
            </div>
            <div className="matricula">{aluno.matricula}</div>
          </div>
        </div>

        <div className="coluna-texto">
          <strong>Média geral:</strong> {desempenho.mediaGeral}
          <br />
          <strong>Presença:</strong> {desempenho.presenca}
          <br />
          <strong>Status:</strong> {desempenho.status}
        </div>
      </div>

      <div className="media-disciplina">
        <h2 className="media-title">Resumo do seu desempenho</h2>
        <p className="coluna-texto">
          Aqui você verá gráficos e detalhamento por disciplina assim que a
          integração com o backend estiver pronta.
        </p>
      </div>
    </div>
  );
}

