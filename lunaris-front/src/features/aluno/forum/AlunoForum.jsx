import React, { useState } from "react";
import "../AlunoPages.css";
import AlunoRightPanel from "../AlunoRightPanel";
import Select from "../../../components/Select";
import LargeButton from "../../../components/LargeButton";

const opcoesProfessores = [
  { value: "flavio", label: "Professor Flávio Xo" },
  { value: "marquinhos", label: "Professor Marquinhos" },
  { value: "joao", label: "Professor João Jonas" },
  { value: "leda", label: "Professora Leda" },
];

const opcoesAssunto = [
  { value: "conteudo", label: "Dúvida de conteúdo" },
  { value: "tarefa", label: "Dúvida de tarefa" },
  { value: "atendimento", label: "Solicitar atendimento" },
];

export default function AlunoForum() {
  const [destinatario, setDestinatario] = useState("");
  const [assunto, setAssunto] = useState("");
  const [conteudo, setConteudo] = useState("");

  function handleEnviar() {
    console.log({ destinatario, assunto, conteudo });
  }

  return (
    <div className="aluno-page">
      <main className="aluno-main">
        <header className="aluno-main-header">
          <h1>Mensagens</h1>
          <p className="aluno-subtitulo">
            Envie mensagens aos seus professores
          </p>
        </header>

        <section className="aluno-form">
          <Select
            label="Destinatário"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            placeholder="Selecione o(a) professor(a)"
            options={opcoesProfessores}
          />

          <Select
            label="Assunto"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Selecione o assunto da mensagem"
            options={opcoesAssunto}
          />

          <div className="aluno-form-group">
            <label>Conteúdo da mensagem</label>
            <textarea
              placeholder="Mensagem..."
              rows={6}
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
            />
          </div>

          <div className="aluno-form-submit">
            <LargeButton
              label="Enviar"
              color="#112A61"
              onClick={handleEnviar}
            />
          </div>
        </section>
      </main>

      <AlunoRightPanel />
    </div>
  );
}

