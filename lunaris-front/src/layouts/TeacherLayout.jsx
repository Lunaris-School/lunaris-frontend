import React from "react";
import { Outlet } from "react-router-dom";
import SidebarTeacher from "../components/SidebarTeacher";

export default function TeacherLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarTeacher />
      <Outlet />
    </div>
  );
}
