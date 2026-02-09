import React, { useState } from "react";
import "./Notas.css";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeMasculino from "../../assets/icone-masculino.png";
import iconeFeminino from "../../assets/icone-feminino.png";
import Search from "../../components/Search";


export default function Notas() {

  // mock de busca
  const [busca, setBusca] = useState("");

  // mock de alunos
  const [alunos, setAlunos] = useState([
    {
      id: 1,
      nome: "Clara Bartolini",
      turma: "3ºE",
      matricula: "123456432456",
      genero: "F",
      nota1: "",
      nota2: "",
    },
    {
      id: 2,
      nome: "bea marioti",
      turma: "3ºE",
      matricula: "000000",
      genero: "F",
      nota1: "",
      nota2: "",
    },
    {
      id: 3,
      nome: "Clara Bartolini",
      turma: "3ºE",
      matricula: "33333333",
      genero: "F",
      nota1: "",
      nota2: "",
    },
  ]);

  function mudarNota(id, campo, valor) {
    setAlunos((alunos) =>
      alunos.map((a) => {
        if (a.id === id) {
          return {
            id: a.id,
            nome: a.nome,
            turma: a.turma,
            matricula: a.matricula,
            genero: a.genero,
            nota1: campo === "nota1" ? valor : a.nota1,
            nota2: campo === "nota2" ? valor : a.nota2,
          };
        }
  
        return a;
      })
    );
  }
  
  const lista = alunos.filter((a) => {
    if (busca.trim() ==="") return true;
    return (
      a.matricula.includes(busca) || a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <div className="notas">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar aluno por matrícula ou nome"
        />

        <div className="perfil">
          {/* depois substituir pelo nome do professor atual (mock) */}
          <span>Prof. João Jonas</span> 
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>


      <div className="cabecalho">
        <div className="c1">Nome e turma</div>
        <div className="c2">Nota 1</div>
        <div className="c3">Nota 2</div>
        <div className="c4">Média</div>
        <div className="c5">Status</div>
      </div>

      {lista.map((i) => {
        let media = "-";
        let status = "Processando";

        if (i.nota1 !== "" && i.nota2 !== "") {
          const n1 = parseFloat(i.nota1.replace(",", "."));
          const n2 = parseFloat(i.nota2.replace(",", "."));
          const m = (n1 + n2) / 2;

          media = m.toFixed(1).replace(".", ",");
          status = m >= 7 ? "Aprovado" : "Reprovado";
        }

        return (
          <div key={i.id} className="card">
            <div className="aluno">
              <img
                className="avatar"
                src={i.genero === "M" ? iconeMasculino : iconeFeminino}
                alt=""
              />
              <div>
                <div className="nome">
                  {i.nome}, {i.turma}
                </div>
                <div className="matricula">{i.matricula}</div>
              </div>
            </div>

{/* depois salvar nota e media no banco de dados */}
            <div className="n1">
              <input
                value={i.nota1}
                onChange={(e) => mudarNota(i.id, "nota1", e.target.value)}
              />
            </div>

            <div className="n2">
              <input
                value={i.nota2}
                onChange={(e) => mudarNota(i.id, "nota2", e.target.value)}
              />
            </div>
            <div className="media">{media}</div>

            <div className="status-div">
              <div className={`status ${status}`}>{status}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
