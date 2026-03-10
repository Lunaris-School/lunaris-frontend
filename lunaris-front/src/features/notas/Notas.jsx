import React, { useEffect, useState } from "react";
import "./Notas.css";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeMasculino from "../../assets/icone-masculino.png";
import iconeFeminino from "../../assets/icone-feminino.png";
import Search from "../../components/Search";
import { Link } from "react-router-dom";

import {
  bucarAlunosPorProfessor,
  buscarProfessorPorCpf,
} from "../../services/professorService";
import { buscarDetalhesUsuario } from "../../services/loginService";
import { buscarBoletinsPorAluno } from "../../services/boletimService";
import { lancarNota } from "../../services/notasService";

export default function Notas() {
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [disciplinaId, setDisciplinaId] = useState(null);

  useEffect(() => {
    carregarDados();
  }, []);

  function parseNota(valor) {
    if (!valor || String(valor).trim() === "") return null;
    const n = Number(String(valor).replace(",", "."));
    return Number.isNaN(n) ? null : n;
  }

  function mudarNota(id, campo, valor) {
    setAlunos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
    );
  }

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");
      setAlunos([]);
      setDisciplinaId(null);

      const detalhesResp = await buscarDetalhesUsuario();
      const data = detalhesResp?.data;

      const role = data?.role ?? localStorage.getItem("role");
      if (role && role !== "PROFESSOR") {
        setErro("Usuário logado não é PROFESSOR.");
        return;
      }

      const cpfProfessor = data?.id != null ? String(data.id) : null;
      if (!cpfProfessor) {
        setErro("Não foi possível identificar o CPF do professor logado.");
        return;
      }

      const professorResp = await buscarProfessorPorCpf(cpfProfessor);
      const professor = professorResp?.data;

      const dId = professor?.disciplinaId ?? null;
      if (!dId) {
        setErro("Não foi possível identificar a disciplina do professor.");
        return;
      }

      setDisciplinaId(Number(dId));

      const alunosResp = await bucarAlunosPorProfessor(cpfProfessor);

      if (alunosResp.status === 204) {
        setErro("Professor não possui alunos.");
        return;
      }

      const listaApi = alunosResp.data;
      if (!Array.isArray(listaApi)) {
        setErro("O backend não retornou uma lista de alunos.");
        return;
      }

      const alunosBase = listaApi.map((a) => ({
        id: a.cpf ?? a.matricula ?? crypto.randomUUID(),
        cpf: a.cpf,
        nome: a.nome ?? "",
        matricula: String(a.matricula ?? ""),
        turma: a.turma?.nome ?? "-",
        genero: a.generoId === 1 || a.genero === "M" ? "M" : "F",
        nota1: "",
        nota2: "",
        boletimId: null,
      }));

      const boletimCache = new Map();

      const alunosComBoletim = await Promise.all(
        alunosBase.map(async (al) => {
          const cpfAluno = al.cpf;
          if (!cpfAluno) return al;

          if (boletimCache.has(cpfAluno)) {
            return { ...al, boletimId: boletimCache.get(cpfAluno) };
          }

          try {
            const resp = await buscarBoletinsPorAluno(cpfAluno);
            const boletins = resp?.data;

            const boletimId =
              Array.isArray(boletins) && boletins.length > 0
                ? boletins[0]?.id
                : null;

            boletimCache.set(cpfAluno, boletimId ?? null);
            return { ...al, boletimId: boletimId ?? null };
          } catch {
            boletimCache.set(cpfAluno, null);
            return { ...al, boletimId: null };
          }
        })
      );

      setAlunos(alunosComBoletim);

      if (alunosComBoletim.length === 0) {
        setErro("Lista vazia: o professor pode não ter turmas/alunos vinculados.");
      }
    } catch (error) {
      const status = error?.response?.status;
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Erro desconhecido";

      setErro(`Erro ao carregar dados. Status: ${status ?? "?"} - ${String(msg)}`);
      setAlunos([]);
    } finally {
      setLoading(false);
    }
  }

  async function salvarNotas(aluno) {
    try {
      setErro("");

      const n1 = parseNota(aluno.nota1);
      const n2 = parseNota(aluno.nota2);

      if (n1 == null || n2 == null) {
        setErro("Preencha as duas notas com números válidos.");
        return;
      }

      if (!disciplinaId) {
        setErro("disciplinaId não encontrado.");
        return;
      }

      if (!aluno.boletimId) {
        setErro("boletimId não encontrado para esse aluno. Verifique se existe boletim criado para ele.");
        return;
      }

      const payload = {
        boletimId: Number(aluno.boletimId),
        valorNota: n1,
        valorNota2: n2,
        disciplinaId: Number(disciplinaId),
        tipoAvaliacao: "BIMESTRAL",
        dataLancamento: new Date().toISOString().slice(0, 10),
      };

      await lancarNota(payload);
    } catch (error) {
      const status = error?.response?.status;
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        error?.message ||
        "Erro desconhecido";

      setErro(`Erro ao salvar nota. Status: ${status ?? "?"} - ${String(msg)}`);
    }
  }

  const listaFiltrada = alunos.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.matricula.includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <div className="notas">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar aluno por matrícula ou nome"
        />

        <div className="perfil">
          <span>Prof. João Jonas</span>
          <div className="bolinha">
            <Link className="perfil-professor" to="/perfil-professor">
              <img src={iconePerfil} alt="" />
            </Link>
          </div>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}
      {!loading && !erro && alunos.length === 0 && <p>Nenhum aluno encontrado.</p>}

      <div className="cabecalho">
        <div className="c1">Nome e turma</div>
        <div className="c2">Nota 1</div>
        <div className="c3">Nota 2</div>
        <div className="c4">Média</div>
        <div className="c5">Status</div>
        <div className="c6"></div>
      </div>

      {listaFiltrada.map((i) => {
        let media = "-";
        let status = "Processando";

        const n1 = parseNota(i.nota1);
        const n2 = parseNota(i.nota2);

        if (n1 != null && n2 != null) {
          const m = (n1 + n2) / 2;
          media = m.toFixed(1).replace(".", ",");
          status = m >= 7 ? "Aprovado" : "Reprovado";
        }

        return (
          <div key={i.id} className="card">
            <div className="notas-aluno">
              <img
                className="avatar"
                src={i.genero === "M" ? iconeMasculino : iconeFeminino}
                alt=""
              />
              <div>
                <div className="nome">
                  {i.nome}, {i.turma}
                </div>
                <div className="matricula">{i.matricula}</div>
              </div>
            </div>

            <div className="n1">
              <input
                value={i.nota1}
                onChange={(e) => mudarNota(i.id, "nota1", e.target.value)}
              />
            </div>

            <div className="n2">
              <input
                value={i.nota2}
                onChange={(e) => mudarNota(i.id, "nota2", e.target.value)}
              />
            </div>

            <div className="media">{media}</div>

            <div className="status-div">
              <div className={`status ${status}`}>{status}</div>
            </div>

            <div className="btn-wrap">
              <button className="btn-salvar" onClick={() => salvarNotas(i)}>
                Salvar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}