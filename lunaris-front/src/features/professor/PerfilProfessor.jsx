import React, { useEffect, useState } from "react";
import "./PerfilProfessor.css";

import iconePerfil from "../../assets/icone-perfil.png";

import { buscarDetalhesUsuario } from "../../services/loginService";
import { buscarProfessorPorCpf } from "../../services/professorService";

import { useNavigate } from "react-router-dom";

export default function PerfilProfessor() {

  const navigate = useNavigate();

  const [professor, setProfessor] = useState({
    nome: "",
    disciplina: "",
    email: "",
    dataContratacao: ""
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarProfessor();
  }, []);

  function formatarData(valor) {

    if (!valor) return "";

    const numero = String(valor).replace(/\D/g, "");

    if (numero.length < 6) return valor;

    const ano = numero.substring(0, 4);
    const mes = parseInt(numero.substring(4, 5), 10);
    const dia = parseInt(numero.substring(5), 10);

    return `${dia}/${mes}/${ano}`;
  }

  async function carregarProfessor() {

    try {

      setLoading(true);
      setErro("");

      const detalhesResp = await buscarDetalhesUsuario();
      const cpfProfessor = detalhesResp?.data?.id;

      if (!cpfProfessor) {
        setErro("Não foi possível identificar o professor logado.");
        return;
      }

      const professorResp = await buscarProfessorPorCpf(cpfProfessor);
      const data = professorResp?.data ?? {};

      setProfessor({
        nome: data?.nome ?? "",
        disciplina: data?.disciplina ?? "",
        email: data?.email ?? "",
        dataContratacao: formatarData(data?.dataContratacao)
      });

    } catch (error) {

      const msg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Não foi possível carregar os dados do professor.";

      setErro(String(msg));

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="perfil-professor">

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
            marginBottom: "450px"
          }}
        >
          {"<"} Voltar
        </button>
      </div>

      <div className="perfil-card">

        {loading && <p>Carregando...</p>}
        {!loading && erro && <p style={{ color: "red" }}>{erro}</p>}

        {!loading && !erro && (

          <>
            <div className="perfil-topo">

              <div className="perfil-avatar">
                <img src={iconePerfil} alt="" />
              </div>

              <div className="perfil-nome">
                <h2>{professor.nome}</h2>
              </div>

            </div>

            <div className="perfil-info">

              <p className="label">Disciplina:</p>
              <p className="valor">{professor.disciplina}</p>

              <p className="label">E-mail:</p>
              <p className="valor">{professor.email}</p>

              <p className="label">Data de Contratação:</p>
              <p className="valor">{professor.dataContratacao}</p>

            </div>
          </>
        )}

      </div>

    </div>
  );
}