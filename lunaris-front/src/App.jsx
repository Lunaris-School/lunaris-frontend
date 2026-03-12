import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";
import Landing from "./features/landing/Landing";

import Sidebar from "./components/SidebarTeacher";
import SidebarAluno from "./components/SidebarAluno";
import SidebarAdm from "./components/SidebarAdm";

import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos-professor/Alunos";
import PerfilProfessor from "./features/professor/PerfilProfessor";
import AlunoDetail from "./features/alunos-professor/AlunoDetail";

import PerfilAluno from "./features/aluno/PerfilAluno";
import AlunoDashboard from "./features/aluno/dashboard/AlunoDashboard";
import AlunoMaterias from "./features/aluno/materias/AlunoMaterias";
import AlunoForum from "./features/aluno/forum/AlunoForum";

import DesempenhoAdm from "./features/adm/desempenho-adm/DesempenhoAdm";
import FuncionariosAdm from "./features/adm/funcionarios-adm/FuncionariosAdm";
import FuncionarioAdmDetail from "./features/adm/funcionarios-adm/FuncionarioAdmDetail";
import AlunosAdm from "./features/adm/alunos-adm/AlunosAdm";
import AlunosAdmDetail from "./features/adm/alunos-adm/AlunosAdmDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-aluno" element={<Cadastro />} />


        <Route
          path="/desempenho-adm"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAdm />
              <DesempenhoAdm />
            </div>
          }
        />

        <Route
          path="/alunos-adm"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAdm />
              <AlunosAdm />
            </div>
          }
        />

        <Route
          path="/funcionarios-adm"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAdm />
              <FuncionariosAdm />
            </div>
          }
        />

        <Route
          path="/funcionarios/:cpf"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAdm />
              <FuncionarioAdmDetail />
            </div>
          }
        />

        <Route
          path="/turma/:turmaId"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAdm />
              <AlunosAdmDetail />
            </div>
          }
        />


        <Route
          path="/perfil-professor"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <PerfilProfessor />
            </div>
          }
        />

        <Route
          path="/desempenho-professor"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <DesempenhoProfessor />
            </div>
          }
        />

        <Route
          path="/notas"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Notas />
            </div>
          }
        />

        <Route
          path="/alunos"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <Alunos />
            </div>
          }
        />

        <Route
          path="/alunos/:id"
          element={
            <div style={{ display: "flex" }}>
              <Sidebar />
              <AlunoDetail />
            </div>
          }
        />


        <Route
          path="/aluno-dashboard"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAluno />
              <AlunoDashboard />
            </div>
          }
        />

        <Route
          path="/aluno-materias"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAluno />
              <AlunoMaterias />
            </div>
          }
        />

        <Route
          path="/aluno-forum"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAluno />
              <AlunoForum />
            </div>
          }
        />

        <Route
          path="/perfil-aluno"
          element={
            <div style={{ display: "flex" }}>
              <SidebarAluno />
              <PerfilAluno />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;