import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { login, buscarDetalhesUsuario } from "../../services/loginService";
import "./Login.css";
import LargeButton from "../../components/LargeButton";
import TextInput from "../../components/TextInput";
import Loading from "../../components/Loading";
import loginImg from "../../assets/loginImg.jpg";
import logo from "../../assets/logo.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(email, senha);

      const token = response.data.token;
      localStorage.setItem("token", token);

      const detalhes = await buscarDetalhesUsuario(token);
      const role = detalhes.data.role;
      localStorage.setItem("role", role);
      const userName = detalhes.data.nome;
      localStorage.setItem("userName", userName);
      const cpf = detalhes.data.id;
      localStorage.setItem("cpf", cpf);

      if (role === "ALUNO") {
        navigate("/aluno-dashboard");
      } else if (role === "PROFESSOR") {
        navigate("/desempenho-professor");
      } else if (role === "ADMIN") {
        navigate("/desempenho-adm");
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("E-mail ou senha inválidos");
    }finally{
      setLoading(false);
    }
  };
  
 return (
  <div className="login-container">

    {loading && <Loading />}

    <div className="login-img">
      <img src={loginImg} alt="Login" />
    </div>
    
    <div className="login-form">
      <img src={logo} alt="Logo" />
      <h1 className="login-form-title">Bem-vindo de volta!</h1>
      
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
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="********"
      />

      <LargeButton 
        label="Entrar" 
        color="#001E3A" 
        onClick={handleLogin} 
      />

      <div className="text-divider">
        <div className="divider-line"></div>
        <span className="divider-text">Aluno novo?</span>
        <div className="divider-line"></div>
      </div>

      <LargeButton 
        label="Primeiro Acesso" 
        onClick={() => navigate('/cadastro-aluno')} 
      />
    </div>
  </div>
);
}