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
import {
  buscarBoletinsPorAluno,
  criarBoletim,
} from "../../services/boletimService";
import { lancarNota, atualizarNota } from "../../services/notasService";
import { buscarAlunoPorCpf } from "../../services/alunoService";
import { listarTurmas } from "../../services/turmaService";

export default function Notas() {
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [disciplinaId, setDisciplinaId] = useState(null);
  const [salvandoId, setSalvandoId] = useState(null);
  const [nomeProfessor, setNomeProfessor] = useState("Professor");

  useEffect(() => {
    carregarDados();
  }, []);

  function obterIconeGenero(generoId, genero) {
    if (generoId != null) {
      const id = Number(generoId);
      if (!Number.isNaN(id)) {
        return id % 2 !== 0 ? iconeMasculino : iconeFeminino;
      }
    }

    const generoTexto = String(genero || "").trim().toLowerCase();
    if (generoTexto === "masculino") return iconeMasculino;
    return iconeFeminino;
  }

  function parseNota(valor) {
    if (valor === "" || valor == null) return null;
    const n = Number(String(valor).replace(",", "."));
    return Number.isNaN(n) ? null : n;
  }

  function formatarNota(valor) {
    if (valor == null) return "";
    return String(valor).replace(".", ",");
  }

  function mudarNota(id, campo, valor) {
    setAlunos((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [campo]: valor } : a))
    );
  }

  function normalizarStatus(status) {
    const statusNormalizado = String(status || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (statusNormalizado.includes("aprov")) {
      return { classe: "Aprovado", texto: "Aprovado" };
    }

    if (statusNormalizado.includes("reprov")) {
      return { classe: "Reprovado", texto: "Reprovado" };
    }

    return { classe: "Processando", texto: "Processando" };
  }

  function extrairMensagemErro(error, fallback = "Erro inesperado.") {
    const data = error?.response?.data;

    if (typeof data === "string") return data;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.erro === "string") return data.erro;
    if (typeof data?.error === "string") return data.error;

    if (Array.isArray(data?.errors)) {
      return data.errors.join(", ");
    }

    if (data && typeof data === "object") {
      try {
        return JSON.stringify(data);
      } catch {
        return fallback;
      }
    }

    return error?.message || fallback;
  }

  async function obterBoletimValido(cpfAluno) {
    try {
      let respBusca = await buscarBoletinsPorAluno(cpfAluno);
      let boletins = Array.isArray(respBusca?.data) ? respBusca.data : [];

      if (boletins.length > 0) {
        boletins = boletins
          .filter((b) => b?.id != null)
          .sort((a, b) => Number(b.id) - Number(a.id));

        return boletins[0] ?? null;
      }

      await criarBoletim(Number(cpfAluno));

      respBusca = await buscarBoletinsPorAluno(cpfAluno);
      boletins = Array.isArray(respBusca?.data) ? respBusca.data : [];

      if (boletins.length > 0) {
        boletins = boletins
          .filter((b) => b?.id != null)
          .sort((a, b) => Number(b.id) - Number(a.id));

        return boletins[0] ?? null;
      }

      return null;
    } catch (error) {
      console.log(
        "Erro ao obter/criar boletim do aluno:",
        cpfAluno,
        error?.response?.data || error
      );
      return null;
    }
  }

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");
      setAlunos([]);
      setDisciplinaId(null);

      const detalhesResp = await buscarDetalhesUsuario();
      const data = detalhesResp?.data;

      const cpfProfessor = data?.id;
      if (!cpfProfessor) {
        setErro("Não foi possível identificar o professor logado.");
        return;
      }

      const [professorResp, alunosResp, turmasResp] = await Promise.all([
        buscarProfessorPorCpf(cpfProfessor),
        bucarAlunosPorProfessor(cpfProfessor),
        listarTurmas(),
      ]);

      const professor = professorResp?.data;
      const listaApi = Array.isArray(alunosResp?.data) ? alunosResp.data : [];
      const listaTurmas = Array.isArray(turmasResp?.data) ? turmasResp.data : [];

      if (!professor?.disciplinaId) {
        setErro("Não foi possível identificar a disciplina do professor.");
        return;
      }

      setDisciplinaId(Number(professor.disciplinaId));
      setNomeProfessor(professor?.nome || "Professor");

      const alunosProcessados = await Promise.all(
        listaApi.map(async (a) => {
          let boletimId = null;
          let notaId = null;
          let nota1 = "";
          let nota2 = "";
          let status = "Processando";
          let turmaNome = a?.turma?.nome || "-";
          let generoId = a?.generoId ?? null;
          let genero = a?.genero ?? "";

          try {
            const alunoCompletoResp = await buscarAlunoPorCpf(a.cpf);
            const alunoCompleto = alunoCompletoResp?.data ?? {};

            generoId = alunoCompleto?.generoId ?? generoId;
            genero = alunoCompleto?.genero ?? genero;

            const turmaId = alunoCompleto?.turmaId;
            if (turmaId != null) {
              const turmaEncontrada = listaTurmas.find(
                (t) => Number(t?.id) === Number(turmaId)
              );

              if (turmaEncontrada?.nome) {
                turmaNome = turmaEncontrada.nome;
              }
            }
          } catch (error) {
            console.log(
              "Erro ao buscar aluno por CPF:",
              a?.cpf,
              error?.response?.data || error
            );
          }

          const boletim = await obterBoletimValido(a.cpf);

          if (boletim) {
            boletimId = boletim.id ?? null;

            if (turmaNome === "-" && boletim?.turmaNome) {
              turmaNome = boletim.turmaNome;
            }

            const notasDaDisciplina =
              Array.isArray(boletim.notas) && boletim.notas.length > 0
                ? boletim.notas
                    .filter(
                      (n) =>
                        Number(n.disciplinaId) === Number(professor.disciplinaId)
                    )
                    .sort((a, b) => Number(b.id) - Number(a.id))
                : [];

            const notaDaDisciplina = notasDaDisciplina.length
              ? notasDaDisciplina[0]
              : null;

            if (notaDaDisciplina) {
              notaId = notaDaDisciplina.id ?? null;
              nota1 = formatarNota(notaDaDisciplina.valorNota);
              nota2 = formatarNota(notaDaDisciplina.valorNota2);
              status = notaDaDisciplina.status || "Processando";
            }
          }

          return {
            id: a.cpf ?? a.matricula ?? crypto.randomUUID(),
            cpf: a.cpf,
            nome: a.nome ?? "",
            matricula: String(a.matricula ?? ""),
            turma: turmaNome,
            generoId,
            genero,
            boletimId,
            notaId,
            nota1,
            nota2,
            status,
          };
        })
      );

      setAlunos(alunosProcessados);
    } catch (error) {
      console.log(
        "Erro ao carregar dados da tela de notas:",
        error?.response?.data || error
      );
      setErro(extrairMensagemErro(error, "Não foi possível carregar os dados."));
    } finally {
      setLoading(false);
    }
  }

  async function salvarNotas(aluno) {
    try {
      setErro("");
      setSalvandoId(aluno.id);

      const n1 = parseNota(aluno.nota1);
      const n2 = parseNota(aluno.nota2);

      if (n1 == null || n2 == null) {
        setErro("Preencha as duas notas.");
        return;
      }

      if (n1 < 0 || n2 < 0) {
        setErro("Não é permitido lançar notas negativas.");
        return;
      }

      if (n1 > 10 || n2 > 10) {
        setErro("As notas devem estar entre 0 e 10.");
        return;
      }
      
      if (n1 < 0 || n2 < 0) {
        setErro("Não é permitido lançar notas negativas.");
        return;
      }
      
      if (n1 > 10 || n2 > 10) {
        setErro("As notas devem estar entre 0 e 10.");
        return;
      }

      if (!disciplinaId) {
        setErro("Disciplina não encontrada.");
        return;
      }

      const respBoletins = await buscarBoletinsPorAluno(aluno.cpf);
      const boletins = Array.isArray(respBoletins.data) ? respBoletins.data : [];

      if (!boletins.length) {
        setErro("Boletim não encontrado.");
        return;
      }

      const boletimMaisRecente = boletins
        .filter((b) => b?.id != null)
        .sort((a, b) => Number(b.id) - Number(a.id))[0];

      if (!boletimMaisRecente?.id) {
        setErro("Boletim não encontrado.");
        return;
      }

      const notasDaDisciplina = (boletimMaisRecente.notas || [])
        .filter((n) => Number(n.disciplinaId) === Number(disciplinaId))
        .sort((a, b) => Number(b.id) - Number(a.id));

      const ultimaNota = notasDaDisciplina.length ? notasDaDisciplina[0] : null;

      if (ultimaNota?.id) {
        await atualizarNota(Number(ultimaNota.id), {
          boletimId: Number(boletimMaisRecente.id),
          valorNota: n1,
          valorNota2: n2,
          tipoAvaliacao: "Bimestre",
        });
      } else {
        await lancarNota({
          boletimId: Number(boletimMaisRecente.id),
          valorNota: n1,
          valorNota2: n2,
          disciplinaId: Number(disciplinaId),
          tipoAvaliacao: "Bimestre",
          dataLancamento: new Date().toISOString().slice(0, 10),
        });
      }

      await carregarDados();
      alert("Nota salva com sucesso.");
    } catch (error) {
      console.log("Erro ao salvar nota:", error?.response?.data || error);
      setErro(extrairMensagemErro(error, "Erro ao salvar nota."));
    } finally {
      setSalvandoId(null);
    }
  }

  const listaFiltrada = alunos.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      String(a.matricula).includes(busca) ||
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
          <span>{nomeProfessor}</span>

          <div className="bolinha">
            <Link className="perfil-professor" to="/perfil-professor">
              <img src={iconePerfil} alt="" />
            </Link>
          </div>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}

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
        let statusAtual = "Processando";

        const n1 = parseNota(i.nota1);
        const n2 = parseNota(i.nota2);

        if (n1 != null && n2 != null) {
          const m = (n1 + n2) / 2;
          media = m.toFixed(1).replace(".", ",");

          if (m >= 7) {
            statusAtual = "Aprovado";
          } else {
            statusAtual = "Reprovado";
          }
        } else if (i.status) {
          statusAtual = i.status;
        }

        const statusInfo = normalizarStatus(statusAtual);

        return (
          <div key={i.id} className="card">
            <div className="notas-aluno">
              <img
                className="avatar"
                src={obterIconeGenero(i.generoId, i.genero)}
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
              <div className={`status ${statusInfo.classe}`}>
                {statusInfo.texto}
              </div>
            </div>

            <div className="btn-wrap">
              <button
                className="btn-salvar-notas"
                onClick={() => salvarNotas(i)}
                disabled={salvandoId === i.id}
              >
                {salvandoId === i.id ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}