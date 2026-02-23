import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FuncionariosAdm.css"

import Search from "../../components/Search";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeProfessor from "../../assets/icone-professor.png";
import iconeAdm from "../../assets/icone-adm.svg";
import iconeLixo from "../../assets/icone-lixo.png";

import ModalCadastroFuncionario from "./ModalCadastroFuncionario";


export default function FuncionariosAdm() {

  const [busca, setBusca] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalRemocao, setAbrirModalRemocao] = useState(false);


  const funcionarios = [
    { id: 1, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 2, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "M", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 3, nome: "Alberto Carvalho", disciplina: "Português", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 4, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 5, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 6, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 7, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 8, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 9, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
    { id: 10, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com", cargo: "Funcionário" },
  ];

  const adms = [
    {id: 1, nome: "Markus Fuza", email:"adm@gmail.com", cargo: "Administrador"},
    {id: 2, nome: "Markus Fuza", email:"adm@gmail.com", cargo: "Administrador"},
    {id: 3, nome: "Markus Fuza", email:"adm@gmail.com", cargo: "Administrador"}
  ]

  const lista = funcionarios.filter((p) => {
    if (busca.trim() === "") return true;
  
    return (
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.email.toLowerCase().includes(busca.toLowerCase()) ||
      (p.disciplina && p.disciplina.toLowerCase().includes(busca.toLowerCase()))
    );
  });

  const lista_adm = adms.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.email.toLowerCase().includes(busca.toLowerCase()) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const confirmarRemocao = () => {
    console.log("Funcionário removido:", adms.nome);
  
    setAbrirModalRemocao(false);
  
    navigate("/funcionarios-adm");
  };

  return(
    <div className="funcionarios-page">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar funcionário por nome, email ou disciplina"
        />
        <div className="perfil">
          {/* depois substituir pelo nome do professor atual (mock) */}
          <span>Prof. João Jonas</span>
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>

      <div className="scroll-funcionarios">
      <div className="funcionarios-lista">

        {lista_adm.length > 0 && (
          <>
            <p className="cargo">Administradores</p>
            {lista_adm.map((p) => (
              <div 
                key={p.id} 
                className="funcionario" 
                onClick={() => setAbrirModalRemocao(true)}
              >
                <div className="funcionario-left">
                  <img className="funcionario-avatar" src={iconeAdm} alt="" />
                  <div className="funcionario-texto">
                    <div className="funcionario-nome">{p.nome}</div>
                    <div className="funcionario-email">{p.email}</div>
                  </div>
                </div>
                <div className="funcionario-arrow">
                  <img src={iconeLixo} alt="" style={{width: "20px"}}/>
                </div>
              </div>
            ))}
          </>
        )}

        {lista.length > 0 && (
          <>
            <p className="cargo">Funcionários</p>
            {lista.map((p) => (
              <Link key={p.id} to={`/funcionarios/${p.id}`} className="funcionario">
                <div className="funcionario-left">
                  <img className="funcionario-avatar" src={iconeProfessor} alt="" />
                  <div className="funcionario-texto">
                    <div className="funcionario-nome">
                      {p.nome},{" "}
                      <span className="funcionario-disciplina">
                        {p.disciplina}
                      </span>
                    </div>
                    <div className="funcionario-email">{p.email}</div>
                  </div>
                </div>
                <div className="funcionario-arrow">{">"}</div>
              </Link>
            ))}
          </>
        )}

        </div>
      </div>

      <div className="div-button-cadastro">
          <button className="button-cadastro" onClick={() => setAbrirModal(true)}>Cadastar Funcionário</button>
      </div>

      {abrirModal && (
        <ModalCadastroFuncionario fechar={() => setAbrirModal(false)} />
      )}

    
      {abrirModalRemocao && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar remoção</h2>
            <p>
              Tem certeza que deseja remover o funcionário{" "}
              <strong>{adms.nome}</strong>?
            </p>

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModalRemocao(false)}
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

  )
}
