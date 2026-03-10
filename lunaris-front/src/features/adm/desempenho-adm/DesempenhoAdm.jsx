import React, { useState, useEffect } from "react";
import "./DesempenhoAdm.css";
import Search from "../../../components/Search";
import Loading from "../../../components/Loading";
import TextInput from "../../../components/TextInput";
import Select from "../../../components/Select";
import { listarDisciplinas } from "../../../services/disciplinaService";
import { listarMediasPorTurma, listarTurmas } from "../../../services/turmaService";
import { listarRankingAlunos } from "../../../services/alunoService";

import iconePerfil from "../../../assets/icone-perfil.png";
import iconeMasculino from "../../../assets/icone-masculino.png";
import iconeFeminino from "../../../assets/icone-feminino.png";
import iconeFiltro from "../../../assets/icone-filtro.png";
import iconeClose from "../../../assets/icone-close.svg";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);

export default function DesempenhoAdm() {

  const [busca, setBusca] = useState("");
  const [disciplinas, setDisciplinas] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [mediasTurma, setMediasTurma] = useState([]);
  const [abrirModal, setAbrirModal] = useState(false);
  const [form, setForm] = useState({
    quantidadeAlunos: "",
    disciplinaId: "",
  });
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    carregarDisciplinas();
    carregarTurmas();
    carregarMedias();
  }, []);

  async function carregarDisciplinas() {
    try {
      const response = await listarDisciplinas();
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function carregarTurmas() {
    try {
      const response = await listarTurmas();
      setTurmas(response.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function carregarMedias() {
    try {
      const response = await listarMediasPorTurma();
      setMediasTurma(response.data);
    } catch (error) {
      console.error("Erro ao buscar médias:", error);
    }
  }

  async function carregarRanking() {
    try{
      const response = await listarRankingAlunos(form.disciplinaId, form.quantidadeAlunos);
      setRanking(response.data);
    }catch(error){
      console.error("Erro ao buscar ranking:", error);
    }finally{
      setLoading(false);
    }
  }

  const lista = turmas.filter((a) => {
    if (busca.trim() === "") return true;
    return a.nome?.toLowerCase().includes(busca.toLowerCase());
  });

  const cores = [
    "#0b6e75", "#1b9aaa", "#2fa4b6", "#44c2dd", "#5fd0e6",
    "#94e6ef", "#3a8ca1", "#2c7f91", "#145f66",
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          padding: 12,
          boxWidth: 15,
        },
      },
    },
    cutout: "55%",
  };

  const [alunos] = useState([
    {
      id: 1,
      nome: "Clara Bartolini",
      turma: turmas[0],
      matricula: "123456432456",
      genero: "F",
      media: "7.5",
    },
    {
      id: 2,
      nome: "Bea Marioti",
      turma: turmas[1],
      matricula: "000000",
      genero: "F",
      media: "7.5",
    },
    {
      id: 3,
      nome: "Clara Bartolini",
      turma: turmas[2],
      matricula: "33333333",
      genero: "F",
      media: "7.5",
    },
  ]);

  return (
    <div className="desempenho-adm-container">

      {loading && <Loading />}

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

          {lista.map((turma) => {

            const dadosTurma = mediasTurma.find(
              (m) => m.turmaNome === turma.nome
            );

            const labels =
              dadosTurma?.mediaDisciplinaDTOS.map((d) => d.disciplina) || [];

            const valores =
              dadosTurma?.mediaDisciplinaDTOS.map((d) => d.media) || [];

            const data = {
              labels: labels,
              datasets: [
                {
                  data: valores,
                  backgroundColor: cores.slice(0, valores.length),
                  borderWidth: 1,
                },
              ],
            };

            return (
              <div className="media-turma" key={turma.id}>
                <p>{turma.nome}</p>

                <div className="grafico-container">
                  <Doughnut data={data} options={options} />
                </div>
              </div>
            );
          })}

        </div>
      </div>

      <div className="div-ranking-desempenho">
        <h1 className="media-title">Ranking Alunos</h1>
        <img src={iconeFiltro} alt="" onClick={() => setAbrirModal(true)} />
      </div>
      <p style={{margin:'0px', marginBottom: '20px'}}>Filtre para vizualizar o ranking de desempenho de alunos.</p>

      <div className="cabecalho-desempenho">
        <div className="c1">Nome Aluno</div>
        <div className="c2">Média</div>
        <div className="c3">Disciplina</div>
        <div className="c4">Professor</div>
      </div>

      {ranking.map((i) => (

        <div key={i.id} className="card-desempenho">

          <div className="aluno-desempenho">
            <img
              className="avatar"
              src={i.genero === "M" ? iconeMasculino : iconeFeminino}
              alt=""
            />
            <p>{i.nomeAluno}</p>
          </div>

          <div className="coluna-texto">
            <p>{i.media}</p>
          </div>

          <div className="coluna-texto">
            <p>{i.disciplina}</p>
          </div>

          <div className="coluna-texto">
            <p>{i.nomeProfessor}</p>
          </div>

        </div>
      ))}

      {abrirModal && (
        <div className="modal-desempenho">
          <div className="modal-content-desempenho">
            <img src={iconeClose} className="btn-cancelar" onClick={() => setAbrirModal(false)}></img>
            <h2>Filtro</h2>
            <p>Selecione a disciplina e a quantidade de alunos</p>
            
            <Select
              label="Disciplina"
              name="disciplinaId"
              value={form.disciplinaId}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Selecione a disciplina"
              options={disciplinas.map(d => ({
                value: d.id,
                label: d.nome
              }))}
            />
            <TextInput 
              label="Quantidade de alunos"
              type="number"
              inputMode="numeric"
              name="quantidadeAlunos"
              value={form.quantidadeAlunos}
              onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
              placeholder="Digite a quantidade"
              maxLength={14}
              digitsOnly
            />
            <div className="modal-botoes">
              <button className="btn-voltar" onClick={() => setAbrirModal(false)}>
                Cancelar
              </button>
              <button className="btn-salvar" onClick={() => {carregarRanking(form.disciplinaId, form.quantidadeAlunos), setAbrirModal(false);}}>
                Filtrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}