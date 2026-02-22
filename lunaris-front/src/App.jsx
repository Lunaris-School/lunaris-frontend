import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";

import Sidebar from "./components/SidebarTeacher";
import SidebarAluno from "./components/SidebarAluno";
import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";
import PerfilProfessor from "./features/professor/PerfilProfessor";
import AlunoDetail from "./features/alunos/AlunoDetail";

import PerfilAluno from "./features/aluno/PerfilAluno";
import DesempenhoAluno from "./features/aluno/DesempenhoAluno";
import NotasAluno from "./features/aluno/NotasAluno";
import AlunoDashboard from "./features/aluno/AlunoDashboard";
import AlunoMaterias from "./features/aluno/AlunoMaterias";
import AlunoForum from "./features/aluno/AlunoForum";

import SidebarAdm from "./components/SidebarAdm";
import DesempenhoAdm from "./features/desempenho-adm/DesempenhoAdm";
import FuncionariosAdm from "./features/funcionarios-adm/FuncionariosAdm";
import AlunosAdm from "./features/alunos-adm/AlunosAdm";

function ProfessorLayout({ children }) {
  return (
    <div className="professor-layout">
      <Sidebar />
      {children}
    </div>
  );
}

function AdmLayout({ children }) {
  return <div className="adm-layout">{children}</div>;
}

function AlunoLayout({ children }) {
  return (
    <div className="aluno-layout">
      <SidebarAluno />
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route path="/desempenho-adm" element={<AdmLayout><SidebarAdm /><DesempenhoAdm /></AdmLayout>} />
        <Route path="/alunos-adm" element={<AdmLayout><SidebarAdm /><AlunosAdm /></AdmLayout>} />
        <Route path="/funcionarios-adm" element={<AdmLayout><SidebarAdm /><FuncionariosAdm /></AdmLayout>} />

        {/*com sidebar do professor*/}
        <Route
          path="/perfil-professor"
          element={
            <ProfessorLayout>
              <PerfilProfessor />
            </ProfessorLayout>
          }
        />
        <Route
          path="/desempenho-professor"
          element={
            <ProfessorLayout>
              <DesempenhoProfessor />
            </ProfessorLayout>
          }
        />
        <Route
          path="/notas"
          element={
            <ProfessorLayout>
              <Notas />
            </ProfessorLayout>
          }
        />

        <Route
          path="/alunos"
          element={
            <ProfessorLayout>
              <Alunos />
            </ProfessorLayout>
          }
        />

        <Route
          path="/alunos/:id"
          element={
            <ProfessorLayout>
              <AlunoDetail />
            </ProfessorLayout>
          }
        />

        {/* com sidebar do aluno - novas telas */}
        <Route
          path="/aluno-dashboard"
          element={
            <AlunoLayout>
              <AlunoDashboard />
            </AlunoLayout>
          }
        />
        <Route
          path="/aluno-materias"
          element={
            <AlunoLayout>
              <AlunoMaterias />
            </AlunoLayout>
          }
        />
        <Route
          path="/aluno-forum"
          element={
            <AlunoLayout>
              <AlunoForum />
            </AlunoLayout>
          }
        />

        {/* com sidebar do aluno - telas antigas de desempenho/notas/perfil */}
        <Route
          path="/perfil-aluno"
          element={
            <AlunoLayout>
              <PerfilAluno />
            </AlunoLayout>
          }
        />
        <Route
          path="/desempenho-aluno"
          element={
            <AlunoLayout>
              <DesempenhoAluno />
            </AlunoLayout>
          }
        />
        <Route
          path="/notas-aluno"
          element={
            <AlunoLayout>
              <NotasAluno />
            </AlunoLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
