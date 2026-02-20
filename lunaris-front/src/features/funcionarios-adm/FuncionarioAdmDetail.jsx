import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./FuncionarioAdmDetail.css";

import iconePerfil from "../../assets/icone-perfil.png";


export default function FuncionarioAdmDetail() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [abrirModal, setAbrirModal] = useState(false);

  const funcionarios = [
    { id: 1, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 2, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "M", email:"prof@gmail.com" },
    { id: 3, nome: "Alberto Carvalho", disciplina: "Português", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
  ];
  
  const confirmarRemocao = () => {
    console.log("Funcionário removido:", funcionario.nome);
  
    setAbrirModal(false);
  
    // aqui você pode chamar API depois
    navigate("/funcionarios-adm");
  };

  

  const funcionario = funcionarios.find(
    (f) => f.id === Number(id)
  );

  if (!funcionario) {
    return <div>Funcionário não encontrado</div>;
  }

  return (
    <div className="funcionario-detail-page">

        <div className="topo">
            <div className="perfil"  style={{marginLeft: "85%"}}>
                <span>Prof. João Jonas</span>
                <div className="bolinha">
                    <img src={iconePerfil} alt="" />
                </div>
            </div>
        </div>

        <span className="voltar" onClick={() => navigate("/funcionarios-adm")}>&lt;</span>

      <div className="funcionario-card">

        <div className="funcionario-profile">
            <img className="img-profile" src={iconePerfil} alt="" />
            <h1 className="media-title">Professor(a) {funcionario.nome}</h1>
        </div>

        <div className="info-item">
          <span className="label">Disciplina</span>
          <span className="valor">{funcionario.disciplina}</span>
        </div>

        <div className="info-item">
          <span className="label">Email</span>
          <span className="valor">{funcionario.email}</span>
        </div>

        <div className="info-item">
          <span className="label">Data de Contratação</span>
          <span className="valor">{funcionario.dataContratacao}</span>
        </div>
      </div>

      <div className="div-button-remover">
          <button className="button-remover" onClick={() => setAbrirModal(true)}>Remover Funcionário</button>
      </div>


      {abrirModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Confirmar remoção</h2>
      <p>
        Tem certeza que deseja remover o professor{" "}
        <strong>{funcionario.nome}</strong>?
      </p>

      <div className="modal-buttons">
        <button
          className="btn-cancelar-remocao"
          onClick={() => setAbrirModal(false)}
        >
          Cancelar
        </button>

        <button
          className="btn-confirmar"
          onClick={confirmarRemocao}
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
)}
    </div>

    
  );

}