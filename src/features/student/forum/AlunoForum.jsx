import React, { useState, useEffect } from "react";
import "./AlunoForum.css";
import Select from "../../../components/Select/Select";
import LargeButton from "../../../components/Button/LargeButton";
import { enviarEmail } from "../../../services/email.service";
import { listarProfessores } from "../../../services/teacher.service";

const opcoesAssunto = [
  { value: "conteudo", label: "Dúvida de conteúdo" },
  { value: "tarefa", label: "Dúvida de tarefa" },
  { value: "atendimento", label: "Solicitar atendimento" },
];

export default function AlunoForum() {
  const [destinatario, setDestinatario] = useState("");
  const [assunto, setAssunto] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const [professores, setProfessores] = useState([]);
  const [loadingProfessores, setLoadingProfessores] = useState(true);

  useEffect(() => {
    carregarProfessores();
  }, []);

  async function carregarProfessores() {
    try {
      setLoadingProfessores(true);
      const response = await listarProfessores();
      
      const opcoesProfessores = response.data.map(prof => ({
        value: prof.email,
        label: `Professor(a) ${prof.nome}`
      }));
      
      setProfessores(opcoesProfessores);
    } catch (error) {
      console.error("Erro ao carregar professores:", error);
      setMensagem({ 
        tipo: "erro", 
        texto: "Erro ao carregar lista de professores." 
      });
    } finally {
      setLoadingProfessores(false);
    }
  }

  async function handleEnviar() {
    if (!destinatario || !assunto || !conteudo) {
      setMensagem({ 
        tipo: "erro", 
        texto: "Por favor, preencha todos os campos." 
      });
      return;
    }

    setLoading(true);
    setMensagem({ tipo: "", texto: "" });

    try {
      const nomeAluno = localStorage.getItem("nomeAluno") || "Aluno";
      
      await enviarEmail(nomeAluno, destinatario, assunto, conteudo);
      
      setMensagem({ 
        tipo: "sucesso", 
        texto: "Mensagem enviada com sucesso!" 
      });
      
      setDestinatario("");
      setAssunto("");
      setConteudo("");
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setMensagem({ 
        tipo: "erro", 
        texto: "Erro ao enviar mensagem. Tente novamente." 
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <div className="forum-container">
          <header className="forum-header">
            <h1>Mensagens</h1>
            <p>Envie mensagens aos seus professores</p>
          </header>

          <div className="forum-form-card">
            <div className="forum-form-group">
              <Select
                label="Destinatário"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                placeholder={loadingProfessores ? "Carregando professores..." : "Selecione o(a) professor(a)"}
                options={professores}
                disabled={loadingProfessores}
              />
            </div>

            <div className="forum-form-group">
              <Select
                label="Assunto"
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Selecione o assunto da mensagem"
                options={opcoesAssunto}
              />
            </div>

            <div className="forum-form-group">
              <label htmlFor="conteudo-mensagem" className="forum-form-label">
                Conteúdo da mensagem
              </label>
              <textarea
                id="conteudo-mensagem"
                className="forum-textarea"
                placeholder="Digite sua mensagem aqui..."
                rows={8}
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
              />
            </div>

            {mensagem.texto && (
              <div className={`mensagem-feedback ${mensagem.tipo}`}>
                {mensagem.texto}
              </div>
            )}

            <div className="forum-submit-area">
              <LargeButton
                label={loading ? "Enviando..." : "Enviar Mensagem"}
                color="#112A61"
                onClick={handleEnviar}
                disabled={loading}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

