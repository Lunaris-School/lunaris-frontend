import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Sidebar from "./components/SidebarTeacher";

import DesempenhoProfessor from "./features/desempenho-professor/DesempenhoProfessor";
import Cadastro from "./features/cadastro/Cadastro";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";
import PerfilProfessor from "./features/perfil-professor/PerfilProfessor";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/perfil-professor" element={ <div style={{ display: "flex" }}> <Sidebar /> <PerfilProfessor /> </div> }/>

        <Route path="/desempenho-professor" element={  <div style={{ display: "flex" }}>  <Sidebar/> <DesempenhoProfessor /> </div>}/>

        <Route path="/cadastro-aluno" element={<Cadastro />} />


        <Route path="/notas" element={ <div style={{ display: "flex" }}> <Sidebar /> <Notas /> </div> }/>

        <Route path="/alunos" element={ <div style={{ display: "flex" }}> <Sidebar /> <Alunos /> </div> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
