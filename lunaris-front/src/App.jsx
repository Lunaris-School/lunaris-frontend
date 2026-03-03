import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./features/login/Login";
import Sidebar from "./components/SidebarTeacher";

import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Cadastro from "./features/cadastro/Cadastro";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";
import PerfilProfessor from "./features/professor/PerfilProfessor";
import AlunoDetail from "./features/alunos/AlunoDetail";
import Landing from "./features/landing/Landing";

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
        <Route path="/" element={<Landing />} />
        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route
          path="/login"
          element={   
            <Login />
          }
        />

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
