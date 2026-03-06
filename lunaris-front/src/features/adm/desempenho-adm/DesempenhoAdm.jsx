import React, { useState, useEffect } from "react";
import "./DesempenhoAdm.css";
import Search from "../../../components/Search";
import { listarDisciplinas } from "../../../services/disciplinaService";

import iconePerfil from "../../../assets/icone-perfil.png";
import iconeMasculino from "../../../assets/icone-masculino.png";
import iconeFeminino from "../../../assets/icone-feminino.png";

import { Doughnut } from 'react-chartjs-2';
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
  const [disciplinas, setDisciplinas] = useState([])

  const userName = localStorage.getItem("userName");


  const quantidadeTurmas = 6;

  const turmas = Array.from({ length: quantidadeTurmas }, (_, i) => ({
    nome: `Turma ${String.fromCharCode(65 + i)}`
  }));

  useEffect(() => {
    carregarDisciplinas()
  },[]);

  async function carregarDisciplinas() {
    try {
      const response = await listarDisciplinas();
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    }
  }

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


  const data = {
    labels: disciplinas.map((d) => (d.nome)),
    datasets: [
      {
        data: [8.5, 7.2, 9.0, 6.8],
        backgroundColor: [
          "#0b6e75",
          "#1b9aaa",
          "#2fa4b6",
          "#44c2dd",
          "#5fd0e6",
          "#94e6ef",
          "#3a8ca1",
          "#2c7f91",
          "#145f66"
        ],   
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 10
      }
    },
    plugins: { legend: { position: "right",
        labels: {
          padding: 12,
          boxWidth: 15
        }
      }
    },
    cutout: "55%"
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
          <span>{userName}</span>
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

