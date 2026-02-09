import React from "react";
import { Outlet } from "react-router-dom";
import SidebarStudent from "../components/SidebarStudent";

export default function StudentLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarStudent />
      <Outlet />
    </div>
  );
}
