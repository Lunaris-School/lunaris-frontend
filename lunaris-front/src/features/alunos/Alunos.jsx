import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Alunos.css";

import Search from "../../components/Search";
import AlunoBox from "../../components/AlunoBox";

import iconePerfil from "../../assets/icone-perfil.png";

export default function Alunos() {
  const [busca, setBusca] = useState("");

  //mocjk
  const alunos = [
    { id: 1, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" },
    { id: 2, nome: "Breno Silva", turma: "3ºE", matricula: "123456432456", genero: "M" },
    { id: 3, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" },
    { id: 4, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" },
    { id: 5, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" },
    { id: 6, nome: "Clara Bartolini", turma: "3ºE", matricula: "123456432456", genero: "F" },
  ];

  const lista = alunos.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.matricula.includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <div className="alunos-page">
      <div className="alunos-topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar aluno por matrícula ou nome"
        />

        <div className="alunos-perfil">
          <span>Prof. João Jonas</span>

          <Link to="/perfil-professor" className="alunos-perfil-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      <div className="alunos-lista">
        {lista.map((a) => (
          <AlunoBox
            key={a.id}
            id={a.id}
            nome={a.nome}
            turma={a.turma}
            matricula={a.matricula}
            genero={a.genero}
          />
        ))}
      </div>
    </div>
  );
}
