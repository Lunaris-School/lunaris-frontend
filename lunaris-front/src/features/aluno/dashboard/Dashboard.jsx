import React from "react";
import "./Dashboard.css";
import Calendar from "../../../components/Calendar";

export default function Dashboard() {
  return (
    <div className="aluno-page">
      <h1>Dashboard</h1>
      <p>Área do aluno (placeholder).</p>
      <Calendar />
    </div>
  );
}
