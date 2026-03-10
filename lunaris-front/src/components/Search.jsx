import React from "react";
import "./Search.css";

import iconeLupa from "../assets/icone-lupa.png";

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
    </div>
  );
}
