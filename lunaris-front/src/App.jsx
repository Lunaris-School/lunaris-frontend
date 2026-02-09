import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";

import Cadastro from "./features/cadastro/Cadastro";
import Desempenho from "./features/desempenho/Desempenho";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";

import Materias from "./features/aluno/materias/Materias";
import Forum from "./features/aluno/forum/Forum";
import Dashboard from "./features/aluno/dashboard/dashboard";

import TeacherLayout from "./layouts/TeacherLayout";
import StudentLayout from "./layouts/StudentLayout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route element={<TeacherLayout />}>
          <Route path="/desempenho" element={<Desempenho />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/alunos" element={<Alunos />} />
        </Route>

        <Route path="/aluno" element={<StudentLayout />}>
          <Route path="materias" element={<Materias />} />
          <Route path="forum" element={<Forum />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
