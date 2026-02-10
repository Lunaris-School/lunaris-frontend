import React from "react";
import "./Select.css";

export default function Select({ 
  label, 
  value, 
  onChange, 
  placeholder = "",
  name,
  id,
  required = false,
  options = []
}) {
  return (
    <div className="select-container">
      {label && (
        <label htmlFor={id || name} className="select-label">
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`select-field ${!value ? 'select-placeholder-active' : ''}`}
      >
        {placeholder && (
          <option value="" disabled className="select-placeholder">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}