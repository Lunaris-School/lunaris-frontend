import React, { useState, useEffect } from "react";
import "./DesempenhoProfessor.css";
import Search from "../../components/Search";
import { Link } from "react-router-dom";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeMasculino from "../../assets/icone-masculino.png";
import iconeFeminino from "../../assets/icone-feminino.png";

import { buscarDetalhesUsuario } from "../../services/loginService";
import { buscarProfessorPorCpf } from "../../services/professorService";
import {
  quantidadeAlunosStatus,
  listarRankingAlunos,
} from "../../services/alunoService";

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
  const [turmas, setTurmas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [professorNome, setProfessorNome] = useState("");
  const [disciplinaNome, setDisciplinaNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  function obterIconeGenero(genero) {
    const generoNormalizado = String(genero || "").trim().toLowerCase();

    if (generoNormalizado === "masculino") {
      return iconeMasculino;
    }

    return iconeFeminino;
  }

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");

      const detalhes = await buscarDetalhesUsuario();
      const cpf = detalhes?.data?.id;

      if (!cpf) {
        setErro("Não foi possível identificar o professor logado.");
        return;
      }

      const professorResp = await buscarProfessorPorCpf(cpf);
      const professor = professorResp?.data ?? {};

      if (!professor?.disciplinaId) {
        setErro("Não foi possível identificar a disciplina do professor.");
        return;
      }

      setProfessorNome(professor?.nome ?? "Professor");
      setDisciplinaNome(professor?.disciplina ?? "");

      const [statusResp, rankingResp] = await Promise.all([
        quantidadeAlunosStatus(cpf),
        listarRankingAlunos(cpf, professor.disciplinaId, 20),
      ]);

      const statusTurmas = Array.isArray(statusResp?.data)
        ? statusResp.data
        : [];

      const turmasFormatadas = statusTurmas.map((item, index) => {
        const status =
          item?.statusResponseDTOs?.[0] ??
          item?.statusResponseDTOS?.[0] ??
          {};

        return {
          id: index,
          nome: item?.turma ?? `Turma ${index + 1}`,
          aprovados: Number(status?.quantidadeAprovados ?? 0),
          reprovados: Number(status?.quantidadeReprovados ?? 0),
          risco: Number(status?.quantidadeEmRisco ?? 0),
        };
      });

      setTurmas(turmasFormatadas);

      const ranking = Array.isArray(rankingResp?.data) ? rankingResp.data : [];

      const alunosFormatados = ranking.map((a, index) => ({
        id: index,
        nome: a?.nomeAluno ?? "",
        media:
          a?.media != null
            ? Number(a.media).toFixed(1).replace(".", ",")
            : "-",
        disciplina: a?.disciplina ?? professor?.disciplina ?? "",
        nomeProfessor: a?.nomeProfessor ?? professor?.nome ?? "",
        genero: a?.genero?.nome ?? a?.genero ?? "Feminino",
      }));

      setAlunos(alunosFormatados);
    } catch {
      setErro("Não foi possível carregar os dados de desempenho.");
      setTurmas([]);
      setAlunos([]);
    } finally {
      setLoading(false);
    }
  }

  const listaTurmas = turmas.filter((t) => {
    if (busca.trim() === "") return true;
    return t.nome.toLowerCase().includes(busca.toLowerCase());
  });

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
      tooltip: {
        enabled: true,
      },
    },
    cutout: "55%",
  };

  return (
    <div className="desempenho-prof-container">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar turma"
        />

        <div className="perfil">
          <span>{professorNome}</span>

          <Link to="/perfil-professor" className="dp-perfil-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      <h1 className="media-title">
        Desempenho por turma – {disciplinaNome}
      </h1>

      {loading && <p>Carregando...</p>}
      {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}

      <div className="media-disciplina">
        <div className="scroll-container">
          {listaTurmas.map((turma) => {
            const valores = [
              turma.aprovados,
              turma.risco,
              turma.reprovados,
            ];

            const temDados =
              valores[0] > 0 ||
              valores[1] > 0 ||
              valores[2] > 0;

            const data = {
              labels: ["Aprovados", "Em risco", "Reprovados"],
              datasets: [
                {
                  data: valores,
                  backgroundColor: ["#0b6e75", "#44c2dd", "#1b9aaa"],
                  borderWidth: 1,
                },
              ],
            };

            return (
              <div className="media-turma" key={turma.id}>
                <p>{turma.nome}</p>

                <div className="grafico-container">
                  {temDados ? (
                    <Doughnut data={data} options={options} />
                  ) : (
                    <div className="sem-dados">Sem dados</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <h1 className="media-title">Ranking Alunos</h1>

      <div className="cabecalho-desempenho-prof">
        <div className="c1">Nome</div>
        <div className="c2">Média</div>
        <div className="c3">Disciplina</div>
        <div className="c4">Professor</div>
      </div>

      {alunos.map((i) => (
        <div key={i.id} className="card-desempenho-prof">
          <div className="aluno">
            <img
              className="avatar"
              src={obterIconeGenero(i.genero)}
              alt=""
            />

            <div>
              <div className="nome">{i.nome}</div>
            </div>
          </div>

          <div className="media">{i.media}</div>

          <div className="coluna-texto">
            <p>{i.disciplina}</p>
          </div>

          <div className="coluna-texto">
            <p>{i.nomeProfessor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}