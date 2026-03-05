import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {listarTurmas} from "../../services/turmaService"
import "./AlunosAdm.css";
import Search from "../../components/Search";


import iconePerfil from "../../assets/icone-perfil.png";

export default function AlunosAdm() {

  const navigate = useNavigate();
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalRemocao, setAbrirModalRemocao] = useState(false)
  const [busca, setBusca] = useState("");
  const [turmas, setTurmas] = useState([]);


  async function carregarTurmas() {
    try {
      const responseTurma = await listarTurmas();
      setTurmas(responseTurma.data);
    } catch (error) {
      console.error("Erro ao buscar turmas:", error);
      console.log(error.response);
    }
  }

  useEffect(() => {
    carregarTurmas();
  }, []);


  const lista = turmas.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });


  const confirmarAdicao = () => {
    const novaTurma = {
      nome: `2º Ano ${String.fromCharCode(65 + turmas.length)}`
    };
  
    setTurmas(prev => [...prev, novaTurma]);
    setAbrirModal(false);
  };

  const confirmarRemocao = () => {
    console.log("Turma removida!");
  
    setAbrirModalRemocao(false);
  
    navigate("/alunos-adm");
  };


  return (
    <div className="turmas-adm-container">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar turma por nome ou ano letivo"
        />
        <div className="perfil">
          {/* depois substituir pelo nome do professor atual (mock) */}
          <span>Prof. João Jonas</span>
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>
      
      <h1 className="media-title">Turmas</h1>
      <p className="description">Visualize as turmas e tenha mais detalhes sobre elas.</p>

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
                <span className="stat-number">24</span>
                <span className="stat-label">Alunos</span>
              </div>
            </div>
          
            <div className="turma-actions">
              <button 
                className="btn-detalhes"
                onClick={() => navigate(`/turma/${turma.id}`)}
              >
                Ver Alunos
              </button>
          
              <button className="btn-remover" onClick={() => setAbrirModalRemocao(true)}>
                Remover
              </button>
            </div>
          
          </div>
          ))}
        </div>
      </div>

      <div className="div-button-cadastro">
          <button className="button-cadastro" onClick={() => setAbrirModal(true)}>Cadastar Turma</button>
      </div>


      {abrirModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Nova Turma</h2>
            <p>
              Tem certeza que deseja adicionar uma nova turma?
            </p>

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModal(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar"
                style={{background: "#7aa9b3"}}
                onClick={confirmarAdicao}
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
              Tem certeza que deseja remover a turma?</p>

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModalRemocao(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar"
                onClick={confirmarRemocao}
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
  