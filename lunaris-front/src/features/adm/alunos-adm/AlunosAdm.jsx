import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { buscarAlunosPorTurma } from "../../../services/alunoService"
import { inserirTurma, listarTurmas, deletarTurma } from "../../../services/turmaService"
import "./AlunosAdm.css";

import Search from "../../../components/Search";
import TextInput from "../../../components/TextInput";
import Loading from "../../../components/Loading";

import iconePerfil from "../../../assets/icone-perfil.png";

export default function AlunosAdm() {

  const navigate = useNavigate();

  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalRemocao, setAbrirModalRemocao] = useState(false)

  const [busca, setBusca] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState("")
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const userName = localStorage.getItem("userName");

  async function carregarTurmas() {
    try {
      const [responseTurmas, responseAlunos] = await Promise.all([
        listarTurmas(),
        buscarAlunosPorTurma(new Date().getFullYear())
      ]);

      const turmasComAlunos = responseTurmas.data.map((turma) => {
        const match = responseAlunos.data.find((a) => a.turma === turma.nome);
        return {
          ...turma,
          quantidadeAlunos: match ? match.quantidadeAlunos : 0
        };
      });

      setTurmas(turmasComAlunos);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoverTurma(id) {
    setLoadingAdd(true);
    try {
      await deletarTurma(id);
      carregarTurmas();
    } catch (error) {
      console.error("Erro ao remover turma:", error);
    } finally {
      setAbrirModalRemocao(false);
      setTurmaSelecionada(null);
      setLoadingAdd(false);
    }
  }

  async function handleAdicionarTurma() {
    setLoadingAdd(true);
    try {
      await inserirTurma({
        nome: novaTurma,
        anoLetivo: new Date().getFullYear()
      });
      setNovaTurma("");
      setAbrirModal(false);
      carregarTurmas();
    } catch (error) {
      console.error("Erro ao adicionar turma:", error);
    } finally {
      setLoadingAdd(false);
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);


  const lista = turmas.filter((a) => {

    if (busca.trim() === "") return true;

    return a.nome?.toLowerCase().includes(busca.toLowerCase());

  });

  return (
    <div className="turmas-adm-container">
      {loading && <Loading />}

      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar turma por nome ou ano letivo"
        />
        <div className="perfil">
          <span>{userName}</span>
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>

      <h1 className="media-title">Turmas</h1>

      <p className="description">
        Visualize as turmas e tenha mais detalhes sobre elas.
      </p>

      <div className="turmas-container">
        <div className="scroll-container">
          {lista.map((turma) => (
            <div className="turmas-card" key={turma.id}>

              <div className="turma-header">
                <h2>{turma.nome}</h2>
                <span className="turma-serie">{turma.anoLetivo}</span>
              </div>

              <div className="turma-stats">
                <div className="stat-box">
                  <span className="stat-number">
                    {turma.quantidadeAlunos}
                  </span>

                  <span className="stat-label">
                    Alunos
                  </span>
                </div>
              </div>

              <div className="turma-actions">
                <button
                  className="btn-detalhes"
                  onClick={() => navigate(`/turma/${turma.id}`)}
                >
                  Ver Alunos
                </button>

                <button
                  className="btn-remover"
                  onClick={() => {
                    setTurmaSelecionada(turma);
                    setAbrirModalRemocao(true);
                  }}
                >
                  Remover
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="div-button-cadastro">
        <button
          className="button-cadastro"
          onClick={() => setAbrirModal(true)}
        >
          Cadastrar Turma
        </button>
      </div>


      {abrirModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nova Turma</h2>
            <p>Digite o nome da nova turma.</p>

            {loadingAdd && <Loading />}

            <TextInput
              name="nome"
              placeholder="Digite o nome da turma"
              value={novaTurma}
              onChange={(e) => setNovaTurma(e.target.value)}
              required
            />

            <br />

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModal(false)}
                disabled={loadingAdd}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar"
                style={{background: "#7aa9b3"}}
                onClick={handleAdicionarTurma}
                disabled={loadingAdd}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {abrirModalRemocao && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar remoção</h2>
            <p>
              Tem certeza que deseja remover a turma
              <strong> {turmaSelecionada?.nome}</strong>?
            </p>

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModalRemocao(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar"
                onClick={() => handleRemoverTurma(turmaSelecionada?.id)}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}