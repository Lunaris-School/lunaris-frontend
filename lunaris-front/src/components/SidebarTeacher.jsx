import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarTeacher.css";

import logo from "../assets/logo-escura.png";

import desempenhoClaro from "../assets/icone-desempenho-claro.png";
import desempenhoEscuro from "../assets/icone-desempenho-escuro.png";

import notaClaro from "../assets/icone-nota-claro.png";
import notaEscuro from "../assets/icone-nota-escuro.png";

import alunoClaro from "../assets/icone-aluno-claro.png";
import alunoEscuro from "../assets/icone-aluno-escuro.png";

export default function SidebarTeacher() {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <img src={logo} className="sidebar-logo" alt="Logo" />
        <span className="logo-text">
          <span className="logo-dark">Luna</span>
          <span className="logo-light">ris</span>
        </span>
      </div>

      <NavLink to="/desempenho-professor" className="item">
        <img src={desempenhoEscuro} className="icon dark" alt="" />
        <img src={desempenhoClaro} className="icon light" alt="" />
        <span className="item-text">Desempenho</span>
      </NavLink>

      <NavLink to="/notas" className="item">
        <img src={notaEscuro} className="icon dark" alt="" />
        <img src={notaClaro} className="icon light" alt="" />
        <span className="item-text">Notas</span>
      </NavLink>

      <NavLink to="/alunos" className="item">
        <img src={alunoEscuro} className="icon dark" alt="" />
        <img src={alunoClaro} className="icon light" alt="" />
        <span className="item-text">Alunos</span>
      </NavLink>
    </div>
  );
}
