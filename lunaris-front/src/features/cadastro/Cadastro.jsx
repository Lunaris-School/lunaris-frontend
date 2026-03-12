import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";
import LargeButton from "../../components/LargeButton";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import logo from "../../assets/logo.svg";
import Loading from "../../components/Loading";
import { inserirAluno } from "../../services/alunoService";

export default function Cadastro() {

    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleCadastro() {
        setLoading(true);
        if(password !== password2){
            alert("As senhas não coincidem!");
            return;
        }
        if(!gender){
            alert("Selecione um gênero!");
            return;
        }
        const dados = {
            cpf: cpf,
            nome: name,
            matricula: Math.floor(Math.random() * 1000000),
            email: email,
            senha: password,
            generoId: parseInt(gender, 10)
        };
        try {
            await inserirAluno(dados);
            alert("Cadastro realizado com sucesso!");
            navigate("/login");
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
            const mensagem = error.response?.data?.message || "Ocorreu um erro ao cadastrar. Tente novamente.";
            alert(mensagem);
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="cadastro-container">
            {loading && <Loading />}
            <div className="cadastro-form">
                <img src={logo} alt="Logo" />
                <h1 className="cadastro-form-title">Seja Bem-vindo!</h1>
                
                <TextInput 
                label="Digite seu CPF."
                type="text"
                inputMode="numeric"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                maxLength={11}
                digitsOnly
                />

                <TextInput 
                label="Nome Completo"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome Completo"
                />

                <Select
                label="Gênero"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Selecione seu gênero"
                options={[
                    { value: 1, label: "Masculino" },
                    { value: 2, label: "Feminino" },
                    { value: 3, label: "Outro" }
                ]}
                />

                <TextInput 
                label="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                />

                <TextInput 
                label="Senha"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                />

                <TextInput 
                label="Confirme sua senha"
                type="password"
                name="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="********"
                />

                <LargeButton label="Cadastrar" color="#001E3A" onClick={handleCadastro} />
            </div>
        </div>
    );
}