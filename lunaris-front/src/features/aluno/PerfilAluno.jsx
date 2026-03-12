import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PerfilAluno.css";
import iconePerfil from "../../assets/icone-perfil.png";
import { buscarBoletinsPorAluno } from "../../services/boletimService";
import Loading from "../../components/Loading";

const gerarAvatarUrl = (cpf) => {
  if (!cpf) return iconePerfil;
  
  const seed = cpf.toString();
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4`;
};

export default function PerfilAluno() {
  const navigate = useNavigate();
  const [boletim, setBoletim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(iconePerfil);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const cpf = localStorage.getItem("cpf");
        
        if (!cpf) {
          setErro("CPF do usuário não encontrado.");
          return;
        }

        const response = await buscarBoletinsPorAluno(cpf);
        console.log("Boletim recebido:", response.data);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBoletim(response.data[0]);
          setAvatarUrl(gerarAvatarUrl(cpf));
        } else {
          setBoletim(null);
        }
        setErro(null);
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
        setErro("Não foi possível carregar os dados.");
        setBoletim(null);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  const agruparNotas = (notas) => {
    if (!notas) return {};
    
    return notas.reduce((acc, nota) => {
      const chave = `${nota.disciplinaNome} - ${nota.tipoAvaliacao}`;
      if (!acc[chave]) {
        acc[chave] = [];
      }
      acc[chave].push(nota);
      return acc;
    }, {});
  };

  const formatarData = (dataArray) => {
    if (!dataArray || dataArray.length < 3) return "";
    const [ano, mes, dia] = dataArray;
    return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${ano}`;
  };

  return (
    <div className="perfil-aluno-page">
      <div className="perfil-aluno-header">
        <button type="button" className="perfil-voltar" onClick={() => navigate(-1)} aria-label="Voltar">
            {"<"}
          </button>
        <h1>Perfil</h1>
      </div>

      {loading ? (
        <Loading />
      ) : erro ? (
        <p style={{ textAlign: "center", color: "red", padding: "20px" }}>{erro}</p>
      ) : boletim ? (
        <>
          <div className="perfil-aluno-topo">
            <div className="perfil-aluno-avatar">
              <img src={avatarUrl} alt={boletim.alunoNome} />
            </div>

            <div className="perfil-aluno-dados">
              <h2>{boletim.alunoNome}</h2>
              <p>
                <strong>Turma:</strong> {boletim.turmaNome}
              </p>
              <p>
                <strong>CPF:</strong> {boletim.alunoCpf}
              </p>
              <p>
                <strong>Média Final:</strong> {boletim.mediaFinal?.toFixed(2).replace(".", ",")}
              </p>
            </div>
          </div>

          <section className="perfil-aluno-desempenho">
            <h3>Meu desempenho</h3>

            {Object.entries(agruparNotas(boletim.notas)).map(([chave, notasGrupo]) => {
              const [disciplina, tipoAvaliacao] = chave.split(' - ');
              
              return (
                <div key={chave} style={{ marginBottom: "30px" }}>
                  <h4 style={{ marginBottom: "10px", color: "#001E3A" }}>
                    {disciplina} ({tipoAvaliacao})
                  </h4>
                  
                  <div className="perfil-aluno-tabela">
                    <div className="linha cabecalho">
                      <span>Data Lançamento</span>
                      <span>Nota 1</span>
                      <span>Nota 2</span>
                      <span>Média</span>
                      <span>Status</span>
                    </div>

                    {notasGrupo.map((nota) => {
                      const n1 = Number.parseFloat(nota.valorNota);
                      const n2 = Number.parseFloat(nota.valorNota2);
                      const media = ((n1 + n2) / 2).toFixed(1).replace(".", ",");

                      return (
                        <div key={nota.id} className="linha">
                          <span>{formatarData(nota.dataLancamento)}</span>
                          <span>{n1.toFixed(2).replace(".", ",")}</span>
                          <span>{n2.toFixed(2).replace(".", ",")}</span>
                          <span>{media}</span>
                          <span style={{ 
                            color: nota.status === "APROVADO" ? "#28a745" : "#dc3545",
                            fontWeight: "600"
                          }}>
                            {nota.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <p style={{ textAlign: "center", padding: "20px" }}>Nenhum dado encontrado.</p>
      )}
    </div>
  );
}

