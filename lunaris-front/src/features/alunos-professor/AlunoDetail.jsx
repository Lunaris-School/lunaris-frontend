import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./AlunoDetail.css";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeEnviar from "../../assets/icone-enviar.png";

export default function AlunoDetail() {
  const { id } = useParams(); // vem da rota /alunos/:id

  //mockando o login do professor
  const professorAtual = {
    nome: "Prof. João Jonas",
    disciplina: "Português",
  };

  //aluno mockado
  const aluno = {
    id: id,
    nome: "Clara Bartolini",
    turma: "3ºE",
    matricula: "12345678934",
    genero: "F",
    email: "clara@gmail.com",
    status: "Aprovado",
  };

  // mock das observações
  const [observacoes, setObservacoes] = useState([
    {
      id: 1,
      professor: "Ana Luisa",
      disciplina: "História",
      texto: "A Clara tem dificuldades na minha matéria",
    },
    {
      id: 2,
      professor: "Paulo",
      disciplina: "Física",
      texto: "A Clara é ótima na minha aula",
    },
  ]);

  const [textoObs, setTextoObs] = useState("");

  function enviarObs() {
    if (textoObs.trim() === "") return;

    const nova = {
      id: Date.now(),
      professor: professorAtual.nome,
      disciplina: professorAtual.disciplina,
      texto: textoObs,
    };

    setObservacoes((old) => [...old, nova]);
    setTextoObs("");
  }

  return (
    <div className="aluno-detail-page">
      <div className="aluno-detail-topo">
        <div className="aluno-detail-prof">
          <span>Prof. João Jonas</span>
          <Link to="/perfil-professor" className="aluno-detail-prof-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      <div className="aluno-detail-card">

        <div className="aluno-detail-left">
          <div className="aluno-detail-header">
            <div className="aluno-detail-avatar">
              <img
                src={iconePerfil}
                alt=""
              />
            </div>

            <div className="aluno-detail-title">
              <div className="aluno-detail-nome">
                {aluno.nome}, {aluno.turma}
              </div>
              <div className="aluno-detail-mat">{aluno.matricula}</div>
            </div>
          </div>

          <div className="aluno-detail-info">
            <p className="label">E-mail:</p>
            <p className="valor">{aluno.email}</p>

            <p className="label">Status:</p>
            <p className="valor">{aluno.status}</p>
          </div>
        </div>



        <div className="aluno-detail-line" />


        <div className="aluno-detail-right">
          <div className="aluno-detail-right-title">
            Observações <br/>
            dos professores
          </div>

          <div className="aluno-detail-observacoes">
            {observacoes.map((o) => (
              <div className="obs-card" key={o.id}>
                <div className="obs-top">
                  <div className="obs-icone">
                    <img src={iconePerfil} alt="" />
                  </div>
                  <div className="obs-nome">
                    {o.professor} - {o.disciplina}
                  </div>
                </div>

                <div className="obs-texto">{o.texto}</div>
              </div>
            ))}
          </div>

          <div className="obs-enviar">
            <input
              value={textoObs}
              onChange={(e) => setTextoObs(e.target.value)}
              placeholder="Enviar observação"
            />
            <button className="btn-enviar" onClick={enviarObs}>
              <img src={iconeEnviar} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
