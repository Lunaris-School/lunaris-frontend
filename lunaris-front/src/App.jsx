import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";

import Sidebar from "./components/SidebarTeacher";
import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";
import PerfilProfessor from "./features/professor/PerfilProfessor";
import AlunoDetail from "./features/alunos/AlunoDetail";

import SidebarAdm from "./components/SidebarAdm";
import DesempenhoAdm from "./features/desempenho-adm/DesempenhoAdm";
import FuncionariosAdm from "./features/funcionarios-adm/FuncionariosAdm";
import FuncionarioAdmDetail from "./features/funcionarios-adm/FuncionarioAdmDetail"
import AlunosAdm from "./features/alunos-adm/AlunosAdm";

function ProfessorLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
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

        <Route path="/desempenho-adm" element={  <div style={{ display: "flex" }}>  <SidebarAdm/> <DesempenhoAdm /> </div>}/>
        <Route path="/alunos-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <AlunosAdm /> </div> } />
        <Route path="/funcionarios-adm" element={ <div style={{ display: "flex" }}> <SidebarAdm /> <FuncionariosAdm /> </div> } />
        <Route path="/funcionarios/:id"  element={ <div style={{ display: "flex" }}> <SidebarAdm /> <FuncionarioAdmDetail /> </div> } />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
