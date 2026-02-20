import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FuncionariosAdm.css"

import Search from "../../components/Search";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeProfessor from "../../assets/icone-professor.png";

import ModalCadastroFuncionario from "./ModalCadastroFuncionario";


export default function FuncionariosAdm() {

  const [busca, setBusca] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);

  const funcionarios = [
    { id: 1, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 2, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "M", email:"prof@gmail.com" },
    { id: 3, nome: "Alberto Carvalho", disciplina: "Português", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 4, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 5, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 6, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 5, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 6, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 5, nome: "Maria Lizete", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
    { id: 6, nome: "Alberto Carvalho", disciplina: "Matemática", dataContratacao: "27/05/2024", genero: "F", email:"prof@gmail.com" },
  ];

  const lista = funcionarios.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.disciplina.toLowerCase().includes(busca.toLowerCase()) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return(
    <div className="funcionarios-page">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar funcionário por nome ou disciplina"
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
        {lista.map((a) => (
            <Link to={`/funcionarios/${a.id}`} className="funcionario">
            <div className="funcionario-left">
              <img
                className="funcionario-avatar"
                src={iconeProfessor}
                alt=""
              />
              <div className="funcionario-texto">
                <div className="funcionario-nome">
                  {a.nome}, <span className="funcionario-disciplina">{a.disciplina}</span>
                </div>
                <div className="funcionario-email">{a.email}</div>
              </div>
            </div>
            <div className="funcionario-arrow">{">"}</div>
          </Link>
          ))}
        </div>
      </div>

      <div className="div-button-cadastro">
          <button className="button-cadastro" onClick={() => setAbrirModal(true)}>Cadastar Funcionário</button>
      </div>

      {abrirModal && (
        <ModalCadastroFuncionario fechar={() => setAbrirModal(false)} />
      )}
    
    </div>

  )
}
