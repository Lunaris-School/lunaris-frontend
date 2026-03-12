import React, { useState, useEffect } from "react";
import { listarDisciplinas } from "../../../services/subject.service";
import { atualizarDisciplinasTurma } from "../../../services/class.service";
import "./ModalCadastroDisciplinas.css";

export default function ModalCadastroDisciplinas({ fechar, onSucesso, turmaId }) {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarDisciplinas();
  }, []);

  async function buscarDisciplinas() {
    try {
      const response = await listarDisciplinas();
      setDisciplinas(response.data);
    } catch (error) {
      console.error("Erro ao buscar disciplinas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function atualizarDisciplinas() {
    setLoading(true);
    try {
      await atualizarDisciplinasTurma(turmaId, selecionadas);
      onSucesso();
      fechar();
    } catch (error) {
      console.error("Erro ao atualizar disciplinas:", error);
      alert("Ocorreu um erro ao atualizar as disciplinas. Tente novamente.");
    }finally {
      setLoading(false);
    }
  }

  const toggleDisciplina = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-disciplinas">
        <h2>Selecionar Disciplinas</h2>
        <p>Marque as disciplinas que deseja adicionar à turma.</p>

        {loading ? (
          <p className="modal-disc-loading">Carregando disciplinas...</p>
        ) : (
          <div className="disciplinas-lista">
            {disciplinas.map((disc) => (
              <label key={disc.id} className="disciplina-item">
                <input
                  type="checkbox"
                  checked={selecionadas.includes(disc.id)}
                  onChange={() => toggleDisciplina(disc.id)}
                />
                <span>{disc.nome}</span>
              </label>
            ))}
          </div>
        )}

        <div className="modal-buttons">
          <button className="btn-cancelar-remocao" onClick={fechar} disabled={loading}>
            Cancelar
          </button>
          <button className="btn-confirmar" onClick={atualizarDisciplinas} disabled={loading}>
            {loading ? "Salvando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}