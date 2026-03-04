import React, { useState } from "react";
import "./DesempenhoProfessor.css";
import Search from "../../components/Search";
import { Link } from "react-router-dom";

import iconePerfil from "../../assets/icone-perfil.png";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DesempenhoProfessor() {
  const [busca, setBusca] = useState("");

  const turmas = [
    { id: 1, nome: "3E" },
    { id: 2, nome: "3E" },
    { id: 3, nome: "3E" },
  ];

  const listaTurmas = turmas.filter((t) => {
    if (busca.trim() === "") return true;
    return t.nome.toLowerCase().includes(busca.toLowerCase());
  });

  const alunos = [
    { id: 1, nome: "Clara Bartolini", serie: "3E", media: "8,2" },
    { id: 2, nome: "Breno Silva", serie: "3E", media: "7,4" },
    { id: 3, nome: "Ana Luisa", serie: "3E", media: "6,9" },
  ];

  const data = {
    labels: ["Aprovados", "Em risco", "Reprovados"],
    datasets: [
      {
        data: [27, 32, 41],
        backgroundColor: ["#1b9aaa", "#44c2dd", "#0b6e75"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    cutout: "65%",
  };

  return (
    <div className="dp-container">
      <div className="dp-topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar turma"
        />

        <div className="dp-perfil">
          <span>Prof. João Jonas</span>
          <Link to="/perfil-professor" className="dp-perfil-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      <h2 className="dp-title">Turmas</h2>

      <div className="dp-turmas">
        {listaTurmas.map((t) => (
          <div key={t.id} className="dp-turma-card">
            <div className="dp-turma-nome">{t.nome}</div>

            <div className="dp-grafico">
              <Doughnut data={data} options={options} />
            </div>
          </div>
        ))}
      </div>

      <h2 className="dp-title">Alunos</h2>

      <div className="dp-tabela">
        <div className="dp-tabela-head">
          <div>Nome</div>
          <div>Série</div>
          <div>Média</div>
        </div>

        {alunos.map((a) => (
          <div key={a.id} className="dp-tabela-row">
            <div>{a.nome}</div>
            <div>{a.serie}</div>
            <div>{a.media}</div>
          </div>
        ))}
      </div>
    </div>
  );
}