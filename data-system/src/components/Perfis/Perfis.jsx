import { useState } from "react";
import { FiUsers, FiPlus } from "react-icons/fi";

export default function Perfis() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="fixed right-0 top-0 h-screen z-40 flex items-center pointer-events-none">
      <div
        onMouseLeave={() => setOpen(false)}
        className="relative flex items-center pointer-events-auto"
      >
        {/* ABA */}
        <div
          onMouseEnter={() => setOpen(true)}
          className="
            bg-[#033153] text-white
            h-16 w-12
            flex items-center justify-center
            rounded-l-2xl
            shadow-lg
            cursor-pointer
          "
        >
          <FiUsers size={18} />
        </div>

        {/* CONTEÚDO */}
        <div
          className={`
            bg-[#033153]
            overflow-hidden
            transition-all duration-300 ease-in-out
            rounded-l-2xl
            ${open ? "w-20 opacity-100" : "w-0 opacity-0"}
            flex flex-col items-center
            py-6
            shadow-xl
          `}
        >
          <div className="flex flex-col gap-4">
            {/* Perfis existentes */}
            <img
              src="https://i.pravatar.cc/48?img=1"
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 ring-[#FF7E29] transition"
            />
            <img
              src="https://i.pravatar.cc/48?img=2"
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 ring-[#FF7E29] transition"
            />
            <img
              src="https://i.pravatar.cc/48?img=3"
              className="w-12 h-12 rounded-full cursor-pointer hover:ring-2 ring-[#FF7E29] transition"
            />

            {/* ADICIONAR PERFIL */}
            <div
              className="
                w-12 h-12
                rounded-full
                border-2 border-dashed border-white/50
                flex items-center justify-center
                text-white/70
                cursor-pointer
                hover:border-[#FF7E29]
                hover:text-[#FF7E29]
                transition
              "
              title="Adicionar perfil"
            >
              <FiPlus size={20} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
