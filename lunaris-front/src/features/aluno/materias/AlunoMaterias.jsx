import React, { useState, useEffect } from "react";
import "../AlunoPages.css";
import "./AlunoMaterias.css";
import AlunoRightPanel from "../AlunoRightPanel";
import Search from "../../../components/Search";
import { listarDisciplinas } from "../../../services/disciplinaService";
import Loading from "../../../components/Loading";

export default function AlunoMaterias() {
  const [busca, setBusca] = useState("");
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDisciplinas = async () => {
      try {
        setLoading(true);
        const response = await listarDisciplinas();
        console.log("Disciplinas recebidas:", response.data);
        setMaterias(Array.isArray(response.data) ? response.data : []);
        setErro(null);
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error);
        setErro("Não foi possível carregar as disciplinas.");
        setMaterias([]);
      } finally {
        setLoading(false);
      }
    };

    carregarDisciplinas();
  }, []);

  const lista = materias.filter((m) => {
    if (busca.trim() === "") return true;
    const termo = busca.toLowerCase();
    return (
      m.nome?.toLowerCase().includes(termo) ||
      m.professor?.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <div className="materias-container">
          <header className="materias-header">
            <h1>Matérias</h1>

            <Search
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar matéria"
            />
          </header>

          <section className="materias-grid">
            {loading ? (
              <div className="materias-loading">
                <Loading />
              </div>
            ) : erro ? (
              <div className="materias-feedback erro">{erro}</div>
            ) : lista.length === 0 ? (
              <div className="materias-feedback vazio">
                {busca ? "Nenhuma matéria encontrada para sua busca." : "Nenhuma matéria cadastrada."}
              </div>
            ) : (
              lista.map((m) => (
                <div key={m.id} className="materia-card">
                  <div className="materia-card-content">
                    <h2>{m.nome}</h2>
                    <p className="materia-professor">
                      {m.professor ? `Professor(a) ${m.professor}` : "Professor não atribuído"}
                    </p>
                  </div>
                  <div className="materia-card-icon" />
                </div>
              ))
            )}
          </section>
        </div>
      </main>

      <AlunoRightPanel />
    </div>
  );
}

