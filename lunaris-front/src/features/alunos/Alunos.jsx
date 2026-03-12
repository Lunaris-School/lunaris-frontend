import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Alunos.css";

import Search from "../../components/Search";
import AlunoBox from "../../components/AlunoBox";

import iconePerfil from "../../assets/icone-perfil.png";

import { buscarDetalhesUsuario } from "../../services/loginService";
import {
  bucarAlunosPorProfessor,
  buscarProfessorPorCpf,
} from "../../services/professorService";
import {
  buscarBoletinsPorAluno,
  criarBoletim,
} from "../../services/boletimService";

export default function Alunos() {
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [nomeProfessor, setNomeProfessor] = useState("Professor");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  function mapearGenero(generoId, genero) {
    const generoTexto = String(genero || "").trim().toLowerCase();

    if (generoTexto === "masculino" || generoTexto === "m") {
      return "Masculino";
    }

    if (generoTexto === "feminino" || generoTexto === "f") {
      return "Feminino";
    }

    if (generoId != null) {
      const id = Number(generoId);

      if (!Number.isNaN(id)) {
        return id % 2 !== 0 ? "Masculino" : "Feminino";
      }
    }

    return "Feminino";
  }

  async function obterBoletimValido(cpfAluno) {
    try {
      const respBusca = await buscarBoletinsPorAluno(cpfAluno);
      let boletins = Array.isArray(respBusca?.data) ? respBusca.data : [];

      if (boletins.length > 0) {
        boletins = boletins
          .filter((b) => b?.id != null)
          .sort((a, b) => Number(b.id) - Number(a.id));

        if (boletins[0]?.id) {
          return boletins[0];
        }
      }

      const respCriacao = await criarBoletim(Number(cpfAluno));
      const boletimCriado = respCriacao?.data;

      if (boletimCriado?.id) {
        return boletimCriado;
      }

      const respBuscaFinal = await buscarBoletinsPorAluno(cpfAluno);
      boletins = Array.isArray(respBuscaFinal?.data) ? respBuscaFinal.data : [];

      if (boletins.length > 0) {
        boletins = boletins
          .filter((b) => b?.id != null)
          .sort((a, b) => Number(b.id) - Number(a.id));

        if (boletins[0]?.id) {
          return boletins[0];
        }
      }

      return null;
    } catch {
      return null;
    }
  }

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");
      setAlunos([]);

      const detalhesResp = await buscarDetalhesUsuario();
      const cpfProfessor = detalhesResp?.data?.id;

      if (!cpfProfessor) {
        setErro("Não foi possível identificar o professor logado.");
        return;
      }

      const professorResp = await buscarProfessorPorCpf(cpfProfessor);
      const professor = professorResp?.data ?? {};
      setNomeProfessor(professor?.nome ?? "Professor");

      const alunosResp = await bucarAlunosPorProfessor(cpfProfessor);
      const listaApi = Array.isArray(alunosResp?.data) ? alunosResp.data : [];

      const alunosFormatados = await Promise.all(
        listaApi.map(async (a) => {
          const boletim = await obterBoletimValido(a?.cpf);

          return {
            id: a?.cpf ?? a?.matricula ?? crypto.randomUUID(),
            nome: a?.nome ?? "",
            turma: a?.turma?.nome ?? boletim?.turmaNome ?? "-",
            matricula: String(a?.matricula ?? ""),
            genero: mapearGenero(a?.generoId, a?.genero),
            generoId: a?.generoId ?? null,
          };
        })
      );

      setAlunos(alunosFormatados);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Não foi possível carregar os alunos.";

      setErro(String(msg));
      setAlunos([]);
    } finally {
      setLoading(false);
    }
  }

  const lista = alunos.filter((a) => {
    if (busca.trim() === "") return true;

    return (
      a.matricula.includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <div className="alunos-page">
      <div className="alunos-topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar aluno por matrícula ou nome"
        />

        <div className="alunos-perfil">
          <span>{nomeProfessor}</span>

          <Link to="/perfil-professor" className="alunos-perfil-link">
            <img src={iconePerfil} alt="" />
          </Link>
        </div>
      </div>

      {loading && <p>Carregando...</p>}
      {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}

      <div className="alunos-lista">
        {lista.map((a) => (
          <AlunoBox
            key={a.id}
            id={a.id}
            nome={a.nome}
            turma={a.turma}
            matricula={a.matricula}
            genero={a.genero}
            generoId={a.generoId}
          />
        ))}
      </div>
    </div>
  );
}