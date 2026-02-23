import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import "./ModalCadastroFuncionario.css";

import iconeProfessor from "../../assets/icone-professor.png";
import iconeAdm from "../../assets/icone-adm.svg";
import iconeClose from "../../assets/icone-close.svg";


export default function ModalCadastroFuncionario({ fechar }) {

  const [tipoCadastro, setTipoCadastro] = useState("");
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    disciplina: "",
    senha: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados enviados:", { tipo: tipoCadastro, ...form });
    fechar();
  };

  const handleVoltar = () => {
    setTipoCadastro("");
    setForm({
      nome: "",
      cpf: "",
      email: "",
      disciplina: "",
      senha: ""
    });
  };

  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

      <img src={iconeClose} className="btn-cancelar" onClick={fechar}></img>

        <h2>
          {tipoCadastro === "" && "Cadastrar Funcionário"}
          {tipoCadastro === "professor" && "Cadastrar Professor"}
          {tipoCadastro === "administrador" && "Cadastrar Administrador"}
        </h2>

        {tipoCadastro === "" ? (
          <div className="tipo-selecao">
            <p>Selecione o tipo de funcionário:</p>
            
            <button 
              className="btn-tipo" 
              onClick={() => setTipoCadastro("professor")}
            >
              <img src={iconeProfessor} alt="" />
              <span>Incluir Professor</span>
            </button>
            
            <button 
              className="btn-tipo" 
              onClick={() => setTipoCadastro("administrador")}
            >
              <img src={iconeAdm} alt="" />
              <span>Incluir Administrador</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Nome"
              name="nome"
              placeholder="Digite o nome"
              value={form.nome}
              onChange={handleChange}
              required
            />

            {tipoCadastro === "professor" && (
              <TextInput 
                label="CPF"
                type="text"
                inputMode="numeric"
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                maxLength={11}
                digitsOnly
              />
            )}

            <TextInput
              label="Email"
              type="email"
              name="email"
              placeholder="Digite o email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {tipoCadastro === "professor" && (
              <Select
                label="Disciplina"
                name="disciplina"
                value={form.disciplina}
                onChange={handleChange}
                placeholder="Selecione a disciplina"
                options={[
                  { value: "portugues", label: "Português" },
                  { value: "matematica", label: "Matemática" },
                  { value: "historia", label: "História" }
                ]}
              />
            )}

            <TextInput
              label="Senha"
              type="password"
              name="senha"
              placeholder="********"
              value={form.senha}
              onChange={handleChange}
              required
            />

            <div className="modal-botoes">
              <button type="submit" className="btn-salvar">
                Salvar
              </button>
              <button type="button" onClick={handleVoltar} className="btn-voltar">
                Voltar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}