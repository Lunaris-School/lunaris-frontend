import React, { useState } from "react";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import "./ModalCadastroFuncionario.css";

export default function ModalCadastroFuncionario({ fechar }) {

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
    console.log("Dados enviados:", form);
    fechar();
  };

  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Cadastrar Funcionário</h2>

        <form onSubmit={handleSubmit}>

          <TextInput
            label="Nome"
            name="nome"
            placeholder="Digite o nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

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

          <TextInput
            label="Email"
            type="email"
            name="email"
            placeholder="Digite o email"
            value={form.email}
            onChange={handleChange}
            required
          />

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
            <button type="button" onClick={fechar} className="btn-cancelar">
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
