import React, { useState } from "react";
import "./DesempenhoAdm.css";

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

  const quantidadeTurmas = 6;

  const turmas = Array.from({ length: quantidadeTurmas }, (_, i) => ({
    nome: `Turma ${String.fromCharCode(65 + i)}`
  }));

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

      <h1 className="media-title">Média por disciplinas</h1>

      <div className="media-disciplina">

        <div className="scroll-container">

          {turmas.map((turma, index) => (
            <div className="media-turma" key={index}>
              <p>{turma.nome}</p>

              <div className="grafico-container">
                <Doughnut data={data} options={options} cutout="75%" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

