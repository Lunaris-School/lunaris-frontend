import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";

import Sidebar from "./components/SidebarTeacher";
import Desempenho from "./features/desempenho-professor/DesempenhoProfessor";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";

import SidebarAdm from "./components/SidebarAdm";
import DesempenhoAdm from "./features/desempenho-adm/DesempenhoAdm";
import FuncionariosAdm from "./features/funcionarios-adm/FuncionariosAdm";
import AlunosAdm from "./features/alunos-adm/AlunosAdm";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route path="/desempenho-adm" element={  <div style={{ display: "flex" }}>  <SidebarAdm/> <DesempenhoAdm /> </div>}/>
        <Route path="/alunos-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <AlunosAdm /> </div> } />
        <Route path="/funcionarios-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <FuncionariosAdm /> </div> } />

        <Route path="/desempenho-professor" element={  <div style={{ display: "flex" }}>  <Sidebar/> <Desempenho /> </div>}/>
        <Route path="/notas" element={ <div style={{ display: "flex" }}> <Sidebar /> <Notas /> </div> }/>
        <Route path="/alunos" element={ <div style={{ display: "flex" }}> <Sidebar /> <Alunos /> </div> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
