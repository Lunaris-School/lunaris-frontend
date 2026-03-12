import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AlunoDetail.css";

import iconePerfil from "../../../assets/icone-perfil.png";
import iconeEnviar from "../../../assets/icone-enviar.png";

import { buscarDetalhesUsuario } from "../../../services/auth.service";
import {
  buscarProfessorPorCpf,
  bucarAlunosPorProfessor,
} from "../../../services/teacher.service";
import {
  buscarObservacoesPorAluno,
  inserirObservacao,
} from "../../../services/observation.service";
import { listarTurmas } from "../../../services/class.service";

export default function AlunoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [professorAtual, setProfessorAtual] = useState({
    cpf: null,
    nome: "Professor",
  });

  const [aluno, setAluno] = useState({
    id: id,
    nome: "",
    turma: "-",
    matricula: "",
    email: "",
    status: "Processando",
  });

  const [observacoes, setObservacoes] = useState([]);
  const [textoObs, setTextoObs] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [id]);

  function normalizarStatus(status) {
    const s = String(status || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (s.includes("aprov")) return "Aprovado";
    if (s.includes("reprov")) return "Reprovado";
    return "Processando";
  }

  async function montarObservacoesComNome(listaObservacoes) {
    const observacoesComNome = await Promise.all(
      listaObservacoes.map(async (o) => {
        let nomeProfessorObs = "Professor";

        try {
          if (o?.professorCpf) {
            const professorResp = await buscarProfessorPorCpf(o.professorCpf);
            nomeProfessorObs = professorResp?.data?.nome ?? "Professor";
          }
        } catch {
          nomeProfessorObs = "Professor";
        }

        return {
          id: o?.id,
          professor: nomeProfessorObs,
          texto: o?.observacao ?? "",
        };
      })
    );

    return observacoesComNome;
  }

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");

      const detalhesResp = await buscarDetalhesUsuario();
      const cpfProfessor = detalhesResp?.data?.id;

      if (!cpfProfessor) {
        setErro("Não foi possível identificar o professor logado.");
        return;
      }

      const [professorResp, alunosResp, observacoesResp, turmasResp] =
        await Promise.all([
          buscarProfessorPorCpf(cpfProfessor),
          bucarAlunosPorProfessor(cpfProfessor),
          buscarObservacoesPorAluno(id),
          listarTurmas(),
        ]);

      const professor = professorResp?.data ?? {};
      const listaAlunos = Array.isArray(alunosResp?.data) ? alunosResp.data : [];
      const listaObservacoes = Array.isArray(observacoesResp?.data)
        ? observacoesResp.data
        : [];
      const listaTurmas = Array.isArray(turmasResp?.data) ? turmasResp.data : [];

      const alunoData = listaAlunos.find(
        (a) => String(a?.cpf) === String(id)
      );

      if (!alunoData) {
        setErro("Aluno não encontrado.");
        return;
      }

      let turmaNome = alunoData?.turma?.nome ?? "-";

      if (turmaNome === "-" && alunoData?.turmaId != null) {
        const turmaEncontrada = listaTurmas.find(
          (t) => Number(t?.id) === Number(alunoData?.turmaId)
        );

        if (turmaEncontrada?.nome) {
          turmaNome = turmaEncontrada.nome;
        }
      }

      setProfessorAtual({
        cpf: cpfProfessor,
        nome: professor?.nome ?? "Professor",
      });

      setAluno({
        id: alunoData?.cpf ?? id,
        nome: alunoData?.nome ?? "",
        turma: turmaNome,
        matricula: String(alunoData?.matricula ?? ""),
        email: alunoData?.email ?? "",
        status: normalizarStatus(alunoData?.status),
      });

      const observacoesFormatadas =
        await montarObservacoesComNome(listaObservacoes);

      setObservacoes(observacoesFormatadas);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Não foi possível carregar os dados do aluno.";

      setErro(String(msg));
    } finally {
      setLoading(false);
    }
  }

  async function enviarObs() {
    try {
      if (textoObs.trim() === "") return;
      if (!professorAtual.cpf) {
        setErro("Professor não identificado.");
        return;
      }

      setEnviando(true);
      setErro("");

      await inserirObservacao({
        alunoCpf: Number(id),
        professorCpf: Number(professorAtual.cpf),
        observacao: textoObs.trim(),
      });

      setTextoObs("");

      const observacoesResp = await buscarObservacoesPorAluno(id);
      const listaObservacoes = Array.isArray(observacoesResp?.data)
        ? observacoesResp.data
        : [];

      const observacoesFormatadas =
        await montarObservacoesComNome(listaObservacoes);

      setObservacoes(observacoesFormatadas);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Não foi possível enviar a observação.";

      setErro(String(msg));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="aluno-detail-page">
      <div className="aluno-detail-topo">
        <div className="aluno-detail-prof">
          <span>{professorAtual.nome}</span>
          <Link to="/perfil-professor" className="aluno-detail-prof-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#0b2a4a",
            fontWeight: "600",
          }}
        >
          {"<"} Voltar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}

      {!loading && !erro && (
        <div className="aluno-detail-card">
          <div className="aluno-detail-left">
            <div className="aluno-detail-header">
              <div className="aluno-detail-avatar">
                <img src={iconePerfil} alt="" />
              </div>

              <div className="aluno-detail-title">
                <div className="aluno-detail-nome">
                  {aluno.nome}, {aluno.turma}
                </div>
                <div className="aluno-detail-mat">{aluno.matricula}</div>
              </div>
            </div>

            <div className="aluno-detail-info">
              <p className="label">E-mail:</p>
              <p className="valor">{aluno.email}</p>

              <p className="label">Status:</p>
              <p className="valor">{aluno.status}</p>
            </div>
          </div>

          <div className="aluno-detail-line" />

          <div className="aluno-detail-right">
            <div className="aluno-detail-right-title">
              Observações <br />
              dos professores
            </div>

            <div className="aluno-detail-observacoes">
              {observacoes.map((o) => (
                <div className="obs-card" key={o.id}>
                  <div className="obs-top">
                    <div className="obs-icone">
                      <img src={iconePerfil} alt="" />
                    </div>
                    <div className="obs-nome">{o.professor}</div>
                  </div>

                  <div className="obs-texto">{o.texto}</div>
                </div>
              ))}
            </div>

            <div className="obs-enviar">
              <input
                value={textoObs}
                onChange={(e) => setTextoObs(e.target.value)}
                placeholder="Enviar observação"
              />

              <button
                className="btn-enviar"
                onClick={enviarObs}
                disabled={enviando}
              >
                <img src={iconeEnviar} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}