import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarAluno.css";

import logoAluno from "../assets/logo_aluno.svg";

import desempenhoClaro from "../assets/icone-desempenho-claro.png";
import desempenhoEscuro from "../assets/icone-desempenho-escuro.png";
import notaClaro from "../assets/icone-nota-claro.png";
import notaEscuro from "../assets/icone-nota-escuro.png";
import alunoClaro from "../assets/icone-aluno-claro.png";
import alunoEscuro from "../assets/icone-aluno-escuro.png";

export default function SidebarAluno() {
  return (
    <div className="sidebar-aluno">
      <div className="logo-area">
        <img src={logoAluno} className="sidebar-logo-aluno" alt="Lunaris" />
      </div>

      <NavLink
        to="/aluno-dashboard"
        className={({ isActive }) => (isActive ? "item active" : "item")}
      >
        <img src={desempenhoEscuro} className="icon dark" alt="" />
        <img src={desempenhoClaro} className="icon light" alt="" />
        <span className="item-text">Dashboard</span>
      </NavLink>

      <NavLink
        to="/aluno-materias"
        className={({ isActive }) => (isActive ? "item active" : "item")}
      >
        <img src={notaEscuro} className="icon dark" alt="" />
        <img src={notaClaro} className="icon light" alt="" />
        <span className="item-text">Matérias</span>
      </NavLink>

      <NavLink
        to="/aluno-forum"
        className={({ isActive }) => (isActive ? "item active" : "item")}
      >
        <img src={alunoEscuro} className="icon dark" alt="" />
        <img src={alunoClaro} className="icon light" alt="" />
        <span className="item-text">Fórum</span>
      </NavLink>
    </div>
  );
}

