import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./FuncionariosAdm.css"
import {listarProfessores} from "../../services/professorService"
import {listarAdmins, deletarAdmin} from "../../services/adminService"
import Search from "../../components/Search";

import iconePerfil from "../../assets/icone-perfil.png";
import iconeProfessor from "../../assets/icone-professor.png";
import iconeAdm from "../../assets/icone-adm.svg";
import iconeLixo from "../../assets/icone-lixo.png";

import ModalCadastroFuncionario from "./ModalCadastroFuncionario";


export default function FuncionariosAdm() {

  const [busca, setBusca] = useState("");
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirModalRemocao, setAbrirModalRemocao] = useState(false);
  const [professores, setProfessores] = useState([])
  const [admins, setAdmins] = useState([])
  const [adminSelecionado, setAdminSelecionado] = useState("")

  useEffect(() => {
    carregarAdmins();
    carregarProfessores();
  }, []);

  async function carregarProfessores() {
    try {
      const responseProfessor = await listarProfessores();
      setProfessores(responseProfessor.data);
    } catch (error) {
      console.error("Erro ao buscar professores:", error);
    }
  }
  async function carregarAdmins() {
    try {
      const responseAdmin = await listarAdmins();
      setAdmins(responseAdmin.data);
    } catch (error) {
      console.error("Erro ao buscar adms:", error);
    }
  }

  const lista = professores.filter((p) => {
    if (busca.trim() === "") return true;
  
    return (
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.email.toLowerCase().includes(busca.toLowerCase()) ||
      (p.disciplina && p.disciplina.toLowerCase().includes(busca.toLowerCase()))
    );
  });

  const lista_adm = admins.filter((a) => {
    if (busca.trim() === "") return true;
    return (
      a.email.toLowerCase().includes(busca.toLowerCase()) ||
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  });

  const confirmarRemocao = async () => {
    try {
      console.log("Funcionário removido:", adminSelecionado?.nome);
  
      await deletarAdmin(adminSelecionado?.id);
  
      setAbrirModalRemocao(false);
      carregarAdmins(); 
    } catch (error) {
      console.error("Erro ao remover:", error);
    }
  };

  return(
    <div className="funcionarios-page">
      <div className="topo">
        <Search
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar funcionário por nome, email ou disciplina"
        />
        <div className="perfil">
          {/* depois substituir pelo nome do professor atual (mock) */}
          <span>Prof. João Jonas</span>
          <div className="bolinha">
            <img src={iconePerfil} alt="" />
          </div>
        </div>
      </div>

      <h1 className="media-title" style={{marginBottom: "0px"}}>Funcionários</h1>
      <p className="description">Visualize, gerencie e cadastre os funcionários.</p>

      <div className="scroll-funcionarios">
      <div className="funcionarios-lista">

        {lista_adm.length > 0 && (
          <>
            <p className="cargo">Administradores</p>
            {lista_adm.map((p) => (
              <div 
                key={p.id} 
                className="funcionario" 
                onClick={() => {setAdminSelecionado(p); setAbrirModalRemocao(true);}}
              >
                <div className="funcionario-left">
                  <img className="funcionario-avatar" src={iconeAdm} alt="" />
                  <div className="funcionario-texto">
                    <div className="funcionario-nome">{p.nome}</div>
                    <div className="funcionario-email">{p.email}</div>
                  </div>
                </div>
                <div className="funcionario-arrow">
                  <img src={iconeLixo} alt="" style={{width: "20px"}}/>
                </div>
              </div>
            ))}
          </>
        )}

        {lista.length > 0 && (
          <>
            <p className="cargo">Professores</p>
            {lista.map((p) => (
              <Link key={p.cpf} to={`/funcionarios/${p.cpf}`} className="funcionario">
                <div className="funcionario-left">

                  <img className="funcionario-avatar" src={iconeProfessor} alt="" />

                  <div className="funcionario-texto">
                    <div className="funcionario-nome">
                      {p.nome},{" "}
                      <span className="funcionario-disciplina">
                        {p.disciplina}
                      </span>
                    </div>
                    <div className="funcionario-email">{p.email}</div>
                  </div>
                </div>
                <div className="funcionario-arrow">{">"}</div>
              </Link>
            ))}
          </>
        )}

        </div>
      </div>

      <div className="div-button-cadastro">
          <button className="button-cadastro" onClick={() => {setAbrirModal(true);}}>Cadastar Funcionário</button>
      </div>

      {abrirModal && (
        <ModalCadastroFuncionario fechar={() => setAbrirModal(false)} onSucesso={() => {carregarProfessores(); carregarAdmins();}} />
      )}

      {abrirModalRemocao && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirmar remoção</h2>
            <p>
              Tem certeza que deseja remover o funcionário{" "}
              <strong>{adminSelecionado?.nome}</strong>            
            </p>

            <div className="modal-buttons">
              <button
                className="btn-cancelar-remocao"
                onClick={() => setAbrirModalRemocao(false)}
              >
                Cancelar
              </button>

              <button
                className="btn-confirmar"
                onClick={confirmarRemocao}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
