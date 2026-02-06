import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./features/login/Login";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/cadastro-aluno" element={} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
