import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {buscarProfessorPorCpf, deletarProfessor} from "../../../services/professorService"
import "./FuncionarioAdmDetail.css";

import iconePerfil from "../../../assets/icone-perfil.png";


export default function FuncionarioAdmDetail() {

  const { cpf } = useParams();
  const navigate = useNavigate();
  const [abrirModal, setAbrirModal] = useState(false);
  const [funcionario, setFuncionario] = useState(null);

  useEffect(() => {
    const fetchFuncionario = async () => {
      const response = await buscarProfessorPorCpf(cpf);
      setFuncionario(response.data);
    };
    fetchFuncionario();
  }, [cpf]);


  const confirmarRemocao = async () => {
    try {
      console.log("Funcionário removido:", funcionario.nome);
  
      await deletarProfessor(cpf);
  
      setAbrirModal(false);
      navigate("/funcionarios-adm");
  
    } catch (error) {
      console.error("Erro ao remover professor:", error);
    }
  };

  if (!funcionario) {
    return <div>Carregando...</div>;
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
          <span className="valor">{funcionario.dataContratacao[2]}/{funcionario.dataContratacao[1]}/{funcionario.dataContratacao[0]}</span>
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