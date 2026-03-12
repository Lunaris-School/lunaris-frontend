import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";

import Sidebar from "./components/SidebarTeacher";
import SidebarAluno from "./components/SidebarAluno";
import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos-professor/Alunos";
import PerfilProfessor from "./features/professor/PerfilProfessor";
import AlunoDetail from "./features/alunos-professor/AlunoDetail";
import Landing from "./features/landing/Landing";

import PerfilAluno from "./features/aluno/PerfilAluno";
import AlunoDashboard from "./features/aluno/dashboard/AlunoDashboard";
import AlunoMaterias from "./features/aluno/materias/AlunoMaterias";
import AlunoForum from "./features/aluno/forum/AlunoForum";

import SidebarAdm from "./components/SidebarAdm";
import DesempenhoAdm from "./features/adm/desempenho-adm/DesempenhoAdm";
import FuncionariosAdm from "./features/adm/funcionarios-adm/FuncionariosAdm";
import FuncionarioAdmDetail from "./features/adm/funcionarios-adm/FuncionarioAdmDetail"
import AlunosAdm from "./features/adm/alunos-adm/AlunosAdm";
import AlunosAdmDetail from "./features/adm/alunos-adm/AlunosAdmDetail";


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
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route
          path="/login"
          element={   
            <Login />
          }
        />
        
        <Route path="/desempenho-adm" element={  <div style={{ display: "flex" }}>  <SidebarAdm/> <DesempenhoAdm /> </div>}/>
        <Route path="/alunos-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <AlunosAdm /> </div> } />
        <Route path="/funcionarios-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <FuncionariosAdm /> </div> } />
        <Route path="/funcionarios/:cpf"  element={ <div style={{ display: "flex" }}> <SidebarAdm /> <FuncionarioAdmDetail /> </div> } />
        <Route path="/turma/:turmaId"  element={ <div style={{ display: "flex" }}> <SidebarAdm /> <AlunosAdmDetail /> </div> } />

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

        <Route
          path="/aluno-dashboard" element={<div style={{ display: "flex" }}> <SidebarAluno /> <AlunoDashboard /> </div>}
        />
        <Route
          path="/aluno-materias" element={<div style={{ display: "flex" }}> <SidebarAluno /> <AlunoMaterias /> </div>}
        />
        <Route
          path="/aluno-forum" element={<div style={{ display: "flex" }}> <SidebarAluno /> <AlunoForum /> </div>}
        />
        <Route
          path="/perfil-aluno" element={<div style={{ display: "flex" }}> <SidebarAluno /> <PerfilAluno /></div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
