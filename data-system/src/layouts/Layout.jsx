import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import Perfis from "../components/Perfis/Perfis";

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar esquerda */}
      <SideBar />

      {/* Conteúdo central */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Sidebar direita (Perfis) */}
      <Perfis />
    </div>
  );
}
