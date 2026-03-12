import React from "react";

export default function LargeButton({ label, color = "#cccccc", onClick }) {
  const style = {
    backgroundColor: color,
    border: "none",
    stroke: "#646cff",
    borderRadius: "999px",
    padding: "12px 48px",
    color: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "220px",
  };

  return (
    <button style={style} onClick={onClick}>
      {label}
    </button>
  );
}

