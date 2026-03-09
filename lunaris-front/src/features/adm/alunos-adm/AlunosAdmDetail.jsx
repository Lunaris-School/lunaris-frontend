import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AlunosAdmDetail.css";
import { listarAlunos } from "../../../services/alunoService";

import Search from "../../../components/Search";
import TextInput from "../../../components/TextInput";
import Loading from "../../../components/Loading";

import iconePerfil from "../../../assets/icone-perfil.png";
import iconeLivro from "../../../assets/icone-livro.png";
import iconeMasculino from "../../../assets/icone-masculino.png";
import iconeFeminino from "../../../assets/icone-feminino.png";
import ModalCadastroDisciplinas from "./ModalCadastroDisciplinas";

export default function Alunos() {

  const { turmaId } = useParams();
  const [busca, setBusca] = useState("");
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
    const [abrirModalMateria, setAbrirModalMateria] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    carregarAlunos();
  }, [turmaId]);

  async function carregarAlunos() {
    try {
      const response = await listarAlunos();
      const filtrados = response.data.filter((a) => a.turmaId === Number(turmaId));
      setAlunos(filtrados);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }finally{
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

  const confirmar = () => {
    console.log("Aluno matriculado!");
    setAbrirModal(false);
    navigate("/alunos-adm");
  };

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
      <p className="description">Visualize e gerencie os alunos da turma.</p>

      <div className="scroll-alunos">
       <div className="alunos-lista">
           {lista.map((i) => (
                <div key={i.cpf} className="card-aluno">
                    <div className="aluno-adm-detail">
                        <img
                            className="avatar"
                            src={i.generoId === 1 ? iconeMasculino : iconeFeminino}
                            alt=""
                        />
                        <div>
                            <div className="nome">
                            {i.nome}
                        </div>
                        <div className="matricula">CPF: {i.cpf}</div>
                    </div>
                </div>
                </div>
                ))}
       </div>
      </div>

      <div className="div-button-cadastro-aluno">
        <img className="icone-livro" src={iconeLivro} onClick={() => setAbrirModalMateria(true)} alt="" />
        <button className="btn-matricular" onClick={() => setAbrirModal(true)}>Matricular Aluno</button>
      </div>

      {abrirModal && (
         <div className="modal-overlay">
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
               onClick={confirmar}
             >
               Confirmar
             </button>
           </div>
         </div>
       </div>
      )}
      {abrirModalMateria && (
        <ModalCadastroDisciplinas
          fechar={() => setAbrirModal(true)}
          onSucesso={(ids) => console.log("Disciplinas selecionadas:", ids)}
        />
      )}

    </div>
  );
}
