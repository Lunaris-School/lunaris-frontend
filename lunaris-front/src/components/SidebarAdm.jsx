import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarAdm.css";

import logo from "../assets/logo-escura.png";

import desempenhoClaro from "../assets/icone-desempenho-claro.png";
import desempenhoEscuro from "../assets/icone-desempenho-escuro.png";

import alunoClaro from "../assets/icone-aluno-claro.png";
import alunoEscuro from "../assets/icone-aluno-escuro.png";

import funcClaro from "../assets/icone-func-claro.svg";
import funcEscuro from "../assets/icone-func-escuro.svg";

export default function SidebarAdm() {
    return (
      <div className="sidebar">
        <div className="logo-area">
          <img src={logo} className="sidebar-logo" alt="Logo" />
          <span className="logo-text">
            <span className="logo-dark">Luna</span>
            <span className="logo-light">ris</span>
          </span>
        </div>
  
        <NavLink to="/desempenho-adm" className="item">
          <img src={desempenhoEscuro} className="icon dark" alt="" />
          <img src={desempenhoClaro} className="icon light" alt="" />
          <span className="item-text">Desempenho</span>
        </NavLink>
  
        <NavLink to="/funcionarios-adm" className="item">
          <img src={funcEscuro} className="icon dark" alt="" />
          <img src={funcClaro} className="icon light" alt="" />
          <span className="item-text">Funcionários</span>
        </NavLink>
  
        <NavLink to="/alunos-adm" className="item">
          <img src={alunoEscuro} className="icon dark" alt="" />
          <img src={alunoClaro} className="icon light" alt="" />
          <span className="item-text">Alunos</span>
        </NavLink>
      </div>
    );
  }
  