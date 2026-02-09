import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarStudent.css";

import logo from "../assets/logo-clara.svg";
import dashboardIcon from "../assets/icone-home.svg";
import materiasIcon from "../assets/icone-materias.svg";
import forumIcon from "../assets/icone-forum.svg";

export default function SidebarStudent() {
  return (
    <div className="sidebar sidebar--student">
      <div className="logo-area">
        <img src={logo} className="sidebar-logo" alt="Logo" />
        <span className="logo-text">
          <span className="logo-dark">Luna</span>
          <span className="logo-light">ris</span>
        </span>
      </div>
      <NavLink to="/aluno/dashboard" className="item">
        <img src={dashboardIcon} className="icon" alt="" />
        <span className="item-text">Dashboard</span>
      </NavLink>

      <NavLink to="/aluno/materias" className="item">
        <img src={materiasIcon} className="icon" alt="" />
        <span className="item-text">Matérias</span>
      </NavLink>

      <NavLink to="/aluno/forum" className="item">
        <img src={forumIcon} className="icon" alt="" />
        <span className="item-text">Fórum</span>
      </NavLink>
    </div>
  );
}
