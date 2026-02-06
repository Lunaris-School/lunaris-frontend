import React from "react";
import "./TextInput.css";

export default function TextInput({ 
  label, 
  type, 
  value, 
  onChange, 
  maxLength,
  placeholder = "",
  name,
  id,
  required = false,
  inputMode,
  digitsOnly = false
}) {
  const handleChange = (e) => {
    let next = e.target.value;
    if (digitsOnly) {
      next = next.replace(/\D/g, "").slice(0, maxLength ?? undefined);
    }
    if (onChange) {
      onChange({ ...e, target: { ...e.target, value: next } });
    }
  };

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
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        inputMode={inputMode}
        className="text-input-field"
      />
    </div>
  );
}
