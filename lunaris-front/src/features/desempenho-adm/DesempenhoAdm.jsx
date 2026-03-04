import React, { useState } from "react";
import "./DesempenhoAdm.css";
import Search from "../../components/Search";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeMasculino from "../../assets/icone-masculino.png";
import iconeFeminino from "../../assets/icone-feminino.png";

import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);

export default function DesempenhoAdm() {

  const [busca, setBusca] = useState("");

  const quantidadeTurmas = 6;

  const turmas = Array.from({ length: quantidadeTurmas }, (_, i) => ({
    nome: `Turma ${String.fromCharCode(65 + i)}`
  }));

  const lista = turmas.filter((a) => {
    if (busca.trim() ==="") return true;
    return (
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const [alunos, setAlunos] = useState([
    {
      id: 1,
      nome: "Clara Bartolini",
      turma: turmas[0],
      matricula: "123456432456",
      genero: "F",
      media: "7.5"
    },
    {
      id: 2,
      nome: "bea marioti",
      turma: turmas[1],
      matricula: "000000",
      genero: "F",
      media: "7.5"
    },
    {
      id: 3,
      nome: "Clara Bartolini",
      turma: turmas[2],
      matricula: "33333333",
      genero: "F",
      media: "7.5"
    },
  ]);

  // Mock grafico

  const data = {
    labels: ['Matemática', 'Português', 'História', 'Geografia'],
    datasets: [
      {
        data: [8.5, 7.2, 9.0, 6.8],
        backgroundColor: '#49769F',
        borderColor: '#001E3A',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="desempenho-adm-container">

      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar turma"
        />

        <div className="perfil">
          {/* depois substituir pelo nome do professor atual (mock) */}
          <span>Prof. João Jonas</span> 
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>

      <h1 className="media-title">Média por disciplinas</h1>

      <div className="media-disciplina">

        <div className="scroll-container">

          {lista.map((turma, index) => (
            <div className="media-turma" key={index}>
              <p>{turma.nome}</p>

              <div className="grafico-container">
                <Doughnut data={data} options={options} cutout="75%" />
              </div>
            </div>
          ))}

        </div>
      </div>

      <h1 className="media-title">Ranking Alunos</h1>

      <div className="cabecalho-desempenho">
        <div className="c1">Nome e turma</div>
        <div className="c2">Média</div>
        <div className="c3">Disciplina</div>
        <div className="c4">Professor</div>
      </div>

      {alunos.map((i) => (

      <div key={i.id} className="card-desempenho">
      <div className="aluno">
        <img
          className="avatar"
          src={i.genero === "M" ? iconeMasculino : iconeFeminino}
          alt=""
        />

        <div>
          <div className="nome">
            {i.nome}, {i.turma.nome}
          </div>

          <div className="matricula">{i.matricula}</div>
        </div>
      </div>

      <div className="media">{i.media}</div>

      <div className="coluna-texto">
        <p>Matemática</p>
      </div>

      <div className="coluna-texto">
        <p>Fulano de tal</p>
      </div>

    </div>

    ))}
    </div>
  );
}

