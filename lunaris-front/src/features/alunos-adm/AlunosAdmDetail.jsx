import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AlunosAdmDetail.css";

import Search from "../../components/Search";
import TextInput from "../../components/TextInput";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeMasculino from "../../assets/icone-masculino.png";
import iconeFeminino from "../../assets/icone-feminino.png";

export default function Alunos() {
  const [busca, setBusca] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);

  //mocjk
  const alunos = [
    { id: 1, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" , cpf: "00012345677"},
    { id: 2, nome: "Breno Silva", turma: "3ºE", matricula: "123456432456", genero: "M", cpf: "00012345677"},
  ];

  const lista = alunos.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.matricula.includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const confirmar = () => {
    console.log("Aluno matriculado!");
  
    setAbrirModal(false);
  
    navigate("/alunos-adm");
  };

  return (
    <div className="alunos-adm-container">
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

      <h1 className="media-title">Alunos</h1>
      <p className="description">Visualize e gerencie os alunos da turma.</p>

      <div className="scroll-alunos">
       <div className="alunos-lista">
           {lista.map((i) => (
                <div key={i.id} className="card-aluno">
                    <div className="aluno-adm-detail">
                        <img
                            className="avatar"
                            src={i.genero === "M" ? iconeMasculino : iconeFeminino}
                            alt=""
                        />
                        <div>
                            <div className="nome">
                            {i.nome}, {i.turma}
                        </div>
                        <div className="matricula">{i.cpf}</div>
                    </div>
                </div>
                <div className="funcionario-arrow">{">"}</div>
                </div>
                ))}
       </div>
      </div>

      <div className="div-button-cadastro">
          <button className="button-cadastro" onClick={() => setAbrirModal(true)}>Matricular Aluno</button>
      </div>

      {abrirModal && (
         <div className="modal-overlay">
         <div className="modal-container">
            <h2>Matricular Aluno</h2>

            <TextInput 
                label="Digite o CPF do aluno"
                type="text"
                inputMode="numeric"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                maxLength={11}
                digitsOnly
                />

                <br />

            <TextInput 
                label="Digite o nome completo do aluno"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome Completo"
                />

           <br /><br />

           <div className="modal-buttons">
             <button
               className="btn-voltar"
               onClick={() => setAbrirModal(false)}
             >
               Cancelar
             </button>

             <button
               className="btn-salvar"
               onClick={confirmar}
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
