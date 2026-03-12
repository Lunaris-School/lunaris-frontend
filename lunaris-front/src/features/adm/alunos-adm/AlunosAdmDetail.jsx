import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlunosAdmDetail.css";
import { listarAlunos } from "../../../services/alunoService";
import { preCadastrarAluno, listarPreCadastros } from "../../../services/preCadastroService";

import Search from "../../../components/Search";
import TextInput from "../../../components/TextInput";
import Loading from "../../../components/Loading";

import iconePerfil from "../../../assets/icone-perfil.png";
import iconeLivro from "../../../assets/icone-livro.png";
import iconeMasculino from "../../../assets/icone-masculino.png";
import iconeFeminino from "../../../assets/icone-feminino.png";
import iconeAluno from "../../../assets/icone-aluno-escuro.png";
import ModalCadastroDisciplinas from "./ModalCadastroDisciplinas";

export default function Alunos() {

  const { turmaId } = useParams();
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalMateria, setAbrirModalMateria] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [alunosPreCadastrados, setAlunosPreCadastrados] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    carregarDados();
  }, [turmaId]);

  async function carregarDados() {
    setLoading(true);
    try {
      await Promise.all([
        carregarAlunos(),
        carregarAlunosPreCadastrados()
      ]);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function carregarAlunos() {
    try {
      const response = await listarAlunos();
      const filtrados = response.data.filter(
        (a) => a.turmaId === Number(turmaId)
      );
      setAlunos(filtrados);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  }

  async function carregarAlunosPreCadastrados() {
  try {
    const response = await listarPreCadastros();

    const filtrados = response.data.filter(
      (a) => Number(a.turmaId) === Number(turmaId)
    );
    setAlunosPreCadastrados(filtrados);
  } catch (error) {
    console.error("Erro ao buscar alunos pré-cadastrados:", error);
  }
}

  async function handleMatricularAluno() {
    setLoading(true);

    try {
      await preCadastrarAluno({
        alunoCpf: cpf,
        nome: name,
        turmaId: Number(turmaId)
      });

      setAbrirModal(false);
      setCpf("");
      setName("");

      await carregarDados();

      console.log("Aluno matriculado!");

    } catch (error) {
      console.error("Erro ao matricular aluno:", error);
    } finally {
      setLoading(false);
    }
  }

  const lista = alunos.filter((a) => {
    if (busca.trim() === "") return true;

    return (
      String(a.matricula).includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const listaPreCadastrados = alunosPreCadastrados.filter((a) => {
    if (busca.trim() === "") return true;

    return (
      String(a.alunoCpf).includes(busca) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  return (
    <div className="alunos-adm-container">

      {loading && <Loading />}

      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar aluno por nome ou CPF"
        />

        <div className="perfil">
          <span>{userName}</span>

          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>

      <h1 className="media-title">Alunos</h1>
      <p className="description">
        Visualize e gerencie os alunos da turma.
      </p>

      <div className="scroll-alunos">

        <div className="alunos-lista">

          {listaPreCadastrados.length > 0 && (
            <>
              <p className="cargo">Alunos Pré Cadastrados</p>

              {listaPreCadastrados.map((i) => (
                <div key={i.alunoCpf} className="card-aluno">

                  <div className="aluno-adm-detail">

                    <img
                      className="avatar"
                      src={iconeAluno}
                      alt=""
                    />

                    <div>
                      <div className="nome">
                        {i.nome}
                      </div>

                      <div className="matricula">
                        CPF: {i.alunoCpf}
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </>
          )}

          {lista.length > 0 && (
            <>
              <p className="cargo">Alunos Matriculados</p>

              {lista.map((a) => (
                <div key={a.matricula} className="card-aluno">

                  <div className="aluno-adm-detail">

                    <img
                      className="avatar"
                      src={
                        a.genero === "Masculino"
                          ? iconeMasculino
                          : iconeFeminino
                      }
                      alt=""
                    />

                    <div>
                      <div className="nome">
                        {a.nome}
                      </div>

                      <div className="matricula">
                        Matrícula: {a.matricula}
                      </div>
                    </div>

                  </div>

                </div>
              ))}
            </>
          )}

        </div>

      </div>

      <div className="div-button-cadastro-aluno">

        <img
          className="icone-livro"
          src={iconeLivro}
          onClick={() => setAbrirModalMateria(true)}
          alt=""
        />

        <button
          className="btn-matricular"
          onClick={() => setAbrirModal(true)}
        >
          Matricular Aluno
        </button>

      </div>

      {abrirModal && (

        <div className="modal-overlay">
          {Loading && <Loading />}

          <div className="modal-container">
            <h2>Matricular Aluno</h2>
            <TextInput
              label="Digite o CPF do aluno"
              type="text"
              inputMode="numeric"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="000.000.000-00"
              maxLength={11}
              digitsOnly
            />
            <br />
            <TextInput
              label="Digite o nome completo do aluno"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome Completo"
            />
            <br /><br />
            <div className="modal-botoes">
              <button
                className="btn-voltar"
                onClick={() => setAbrirModal(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-salvar"
                style={{ background: "#7aa9b3" }}
                onClick={handleMatricularAluno}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {abrirModalMateria && (
        <ModalCadastroDisciplinas
          turmaId={turmaId}
          fechar={() => setAbrirModalMateria(false)}
          onSucesso={() => setAbrirModalMateria(false)}
        />
      )}

    </div>
  );
}