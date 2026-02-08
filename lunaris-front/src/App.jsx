import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./features/login/Login";
import Sidebar from "./components/SidebarTeacher";

import Cadastro from "./features/cadastro/Cadastro";
import Desempenho from "./features/desempenho/Desempenho";
import Notas from "./features/notas/Notas";
import Alunos from "./features/alunos/Alunos";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cadastro-aluno" element={<Cadastro />} />

        <Route path="/desempenho" element={  <div style={{ display: "flex" }}>  <Sidebar/> <Desempenho /> </div>}/>

        <Route path="/notas" element={ <div style={{ display: "flex" }}> <Sidebar /> <Notas /> </div> }/>

        <Route path="/alunos" element={ <div style={{ display: "flex" }}> <Sidebar /> <Alunos /> </div> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
