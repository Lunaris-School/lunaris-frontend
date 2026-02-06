import React from "react";
import "./TextInput.css";

export default function TextInput({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder = "",
  name,
  id,
  required = false
}) {
  return (
    <div className="text-input-container">
      {label && (
        <label htmlFor={id || name} className="text-input-label">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="text-input-field"
      />
    </div>
  );
}
