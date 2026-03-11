import React, { useState, useEffect } from "react";
import "../AlunoPages.css";
import "./AlunoDashboard.css";
import AlunoRightPanel from "../AlunoRightPanel";
import Loading from "../../../components/Loading";
import { buscarBoletimAluno } from "../../../services/boletimService";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AlunoDashboard() {
  const [loading, setLoading] = useState(true);
  const [boletim, setBoletim] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarBoletim = async () => {
      try {
        setLoading(true);
        const cpf = localStorage.getItem("cpf");
        
        if (!cpf) {
          setErro("CPF não encontrado.");
          return;
        }

        const response = await buscarBoletimAluno(cpf);
        console.log("Resposta da API:", response.data);
        
        const boletimData = Array.isArray(response.data) && response.data.length > 0 
          ? response.data[0] 
          : response.data;
        
        setBoletim(boletimData);
        setErro(null);
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
        setErro("Não foi possível carregar as notas.");
      } finally {
        setLoading(false);
      }
    };

    carregarBoletim();
  }, []);

  const processarNotas = () => {
    if (!boletim?.notas || boletim.notas.length === 0) {
      return [];
    }

    const disciplinasMap = {};
    
    boletim.notas.forEach(nota => {
      const disciplina = nota.disciplinaNome;
      if (!disciplinasMap[disciplina]) {
        disciplinasMap[disciplina] = {
          disciplina,
          b1: null,
          b2: null,
          b3: null,
          b4: null,
          notas: []
        };
      }
      disciplinasMap[disciplina].notas.push(nota);
    });

    return Object.values(disciplinasMap).map(disc => {
      const totalNotas = disc.notas.reduce((sum, n) => sum + (n.valorNota || 0) + (n.valorNota2 || 0), 0);
      const countNotas = disc.notas.reduce((sum, n) => sum + (n.valorNota ? 1 : 0) + (n.valorNota2 ? 1 : 0), 0);
      const media = countNotas > 0 ? totalNotas / countNotas : 0;
      
      return {
        ...disc,
        media
      };
    });
  };

  const calcularEstatisticas = () => {
    const notasProcessadas = processarNotas();
    
    if (notasProcessadas.length === 0) {
      return { mediaGeral: 0, melhorNota: 0, piorNota: 0, melhorDisciplina: "-", piorDisciplina: "-" };
    }

    const medias = notasProcessadas.map(n => n.media);
    const mediaGeral = (medias.reduce((acc, m) => acc + m, 0) / medias.length).toFixed(1);
    const melhorNota = Math.max(...medias).toFixed(1);
    const piorNota = Math.min(...medias).toFixed(1);
    
    const melhorDisciplina = notasProcessadas.find(n => n.media === Math.max(...medias))?.disciplina || "-";
    const piorDisciplina = notasProcessadas.find(n => n.media === Math.min(...medias))?.disciplina || "-";

    return { mediaGeral, melhorNota, piorNota, melhorDisciplina, piorDisciplina };
  };

  const notasProcessadas = processarNotas();
  const estatisticas = calcularEstatisticas();

  const cores = [
    "#0b6e75", "#1b9aaa", "#2fa4b6", "#44c2dd", "#5fd0e6",
    "#94e6ef", "#3a8ca1", "#2c7f91", "#145f66",
  ];

  const data = {
    labels: notasProcessadas.map(n => n.disciplina),
    datasets: [
      {
        data: notasProcessadas.map(n => n.media),
        backgroundColor: cores.slice(0, notasProcessadas.length),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 12,
          boxWidth: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}`;
          }
        }
      },
    },
    cutout: "60%",
  };

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <header className="aluno-main-header">
          <h1>Dashboard de Desempenho</h1>
        </header>

        {loading ? (
          <Loading />
        ) : erro ? (
          <p style={{ textAlign: "center", color: "red", marginTop: "40px" }}>{erro}</p>
        ) : (
          <>
            <section className="dashboard-stats">
              <div className="stat-card">
                <h3>Média Geral</h3>
                <p className="stat-value">{estatisticas.mediaGeral}</p>
              </div>
              <div className="stat-card">
                <h3>Melhor Desempenho</h3>
                <p className="stat-value">{estatisticas.melhorNota}</p>
                <p className="stat-label">{estatisticas.melhorDisciplina}</p>
              </div>
              <div className="stat-card">
                <h3>Precisa Melhorar</h3>
                <p className="stat-value">{estatisticas.piorNota}</p>
                <p className="stat-label">{estatisticas.piorDisciplina}</p>
              </div>
            </section>

            <section className="dashboard-chart-section">
              <h2 className="section-title">Desempenho por Disciplina</h2>
              <div className="chart-wrapper">
                <div className="chart-container-dash">
                  {notasProcessadas.length > 0 ? (
                    <Doughnut data={data} options={options} />
                  ) : (
                    <p style={{ textAlign: "center" }}>Nenhuma nota disponível.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="dashboard-notas-section">
              <h2 className="section-title">Detalhamento por Disciplina</h2>
              <div className="notas-lista">
                {notasProcessadas.length > 0 ? (
                  notasProcessadas.map((disc, index) => (
                    <div key={index} className="nota-card">
                      <div className="nota-card-header">
                        <h3>{disc.disciplina}</h3>
                        <span className={`nota-badge ${disc.media >= 7 ? 'aprovado' : disc.media >= 5 ? 'recuperacao' : 'reprovado'}`}>
                          {disc.media.toFixed(1)}
                        </span>
                      </div>
                      <div className="nota-card-body">
                        {disc.notas.map((nota, idx) => (
                          <div key={idx} className="nota-item">
                            <span className="nota-label">
                              {nota.tipoAvaliacao} {idx + 1}:
                            </span>
                            <span>
                              {nota.valorNota ? nota.valorNota.toFixed(1) : "-"}
                              {nota.valorNota2 ? ` / ${nota.valorNota2.toFixed(1)}` : ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: "center" }}>Nenhuma nota disponível.</p>
                )}
              </div>
            </section>
          </>
        )}
      </main>

      <AlunoRightPanel />
    </div>
  );
}

