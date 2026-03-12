import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./features/auth/login/Login";
import Cadastro from "./features/auth/register/Cadastro";
import Landing from "./features/landing/Landing";

import Sidebar from "./components/Sidebar/SidebarTeacher";
import SidebarAluno from "./components/Sidebar/SidebarAluno";
import SidebarAdm from "./components/Sidebar/SidebarAdm";

import DesempenhoProfessor from "./features/teacher/performance/DesempenhoProfessor";
import Notas from "./features/teacher/grades/Notas";
import Alunos from "./features/teacher/students/Alunos";
import PerfilProfessor from "./features/teacher/profile/PerfilProfessor";
import AlunoDetail from "./features/teacher/students/AlunoDetail";

import PerfilAluno from "./features/student/profile/PerfilAluno";
import AlunoDashboard from "./features/student/dashboard/AlunoDashboard";
import AlunoMaterias from "./features/student/subjects/AlunoMaterias";
import AlunoForum from "./features/student/forum/AlunoForum";

import DesempenhoAdm from "./features/admin/performance/DesempenhoAdm";
import FuncionariosAdm from "./features/admin/employees/FuncionariosAdm";
import FuncionarioAdmDetail from "./features/admin/employees/FuncionarioAdmDetail";
import AlunosAdm from "./features/admin/students/AlunosAdm";
import AlunosAdmDetail from "./features/admin/students/AlunosAdmDetail";

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