import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import LargeButton from "../../components/LargeButton";
import TextInput from "../../components/TextInput";
import loginImg from "../../assets/loginImg.jpg";
import logo from "../../assets/logo.svg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();  


  return (
    <div className="login-container">
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />

        <LargeButton label="Entrar" color="#001E3A" onClick={() => {}} />

      ---- Remover após testes
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <LargeButton
            label="Teste: Professor"
            color="#001E3A"
            onClick={() => navigate("/desempenho")}
          />
          <LargeButton
            label="Teste: Aluno"
            color="#2A1B4A"
            onClick={() => navigate("/aluno/dashboard")}
          />
        </div>

        <div className="text-divider">
          <div className="divider-line"></div>
          <span className="divider-text">Aluno novo?</span>
          <div className="divider-line"></div>
        </div>

        <LargeButton label="Primeiro Acesso" onClick={() => navigate('/cadastro-aluno')} />


      </div>
    </div>
  );
}