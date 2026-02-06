import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Login from "./features/login/Login";
import Cadastro from "./features/cadastro/Cadastro";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-aluno" element={<Cadastro/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
