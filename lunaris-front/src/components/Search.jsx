import React from "react";
import "./Search.css";

import iconeLupa from "../assets/icone-lupa.png";
import iconeFiltro from "../assets/icone-filtro.png";

export default function Search({ value, onChange, placeholder }) {
  return (
    <div className="search">
      <div className="search-lupa">
        <img src={iconeLupa} alt="" />
      </div>

      <input
        className="search-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    {/* depois fazer filtro por turma */}
      <img className="search-filtro" src={iconeFiltro} alt="" />
    </div>
  );
}
