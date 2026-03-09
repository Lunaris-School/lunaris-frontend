import React, { useState, useEffect } from "react";
import { listarDisciplinas } from "../../../services/disciplinaService";
import "./ModalCadastroDisciplinas.css";

export default function ModalCadastroDisciplinas({ fechar, onSucesso }) {
  const [disciplinas, setDisciplinas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    buscarDisciplinas();
  }, []);

  const toggleDisciplina = (id) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const confirmar = () => {
    if (selecionadas.length === 0) {
      alert("Selecione ao menos uma disciplina.");
      return;
    }
    onSucesso(selecionadas);
    fechar();
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
          <button className="btn-cancelar-remocao" onClick={fechar}>
            Cancelar
          </button>
          <button className="btn-confirmar" onClick={confirmar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}