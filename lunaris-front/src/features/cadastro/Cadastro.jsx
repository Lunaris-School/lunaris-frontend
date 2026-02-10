import React, { useState } from "react";
import "./Cadastro.css";
import LargeButton from "../../components/LargeButton";
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import logo from "../../assets/logo.svg";

export default function Cadastro() {

    const [cpf, setCpf] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return(
        <div className="cadastro-container">
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
                    { value: "masculino", label: "Masculino" },
                    { value: "feminino", label: "Feminino" },
                    { value: "outro", label: "Outro" }
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

                <LargeButton label="Cadastrar" color="#001E3A" onClick={() => {}} />


            </div>
        </div>
    );
}