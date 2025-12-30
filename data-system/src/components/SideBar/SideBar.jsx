import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCoffee,
  FiShoppingCart,
  FiDollarSign,
  FiPieChart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiMapPin,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const [locked, setLocked] = useState(true);

  const menuManage = [
    { label: "Home", icon: <FiHome />, path: "/" },
    {
      label: "Cardápio Digital",
      icon: <FiCoffee />,
      path: "/cardapio",
      submenu: [
        { label: "Pedidos", path: "/cardapio/pedidos" },
        { label: "Avaliações", path: "/cardapio/avaliacoes" },
      ],
    },
    { label: "Pdv", icon: <FiShoppingCart />, path: "/pdv" },
    { label: "Faturamento", icon: <FiDollarSign />, path: "/faturamento" },
    { label: "Financeiro", icon: <FiPieChart />, path: "/financeiro" },
    { label: "Conta Digital", icon: <FiCreditCard />, path: "/conta-digital" },
  ];

  const menuSettings = [
    { label: "Configurações", icon: <FiSettings />, path: "/configuracoes" },
    { label: "Sair", icon: <FiLogOut />, path: "/logout" },
  ];

  const MenuItem = ({ icon, label, path, submenu }) => {
    const hasSubmenu = submenu && submenu.length > 0;
    const [hover, setHover] = useState(false);

    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div
          className={`group relative flex items-center justify-between px-6 py-3 cursor-pointer transition-colors text-white/80 hover:text-white`}
        >
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 w-full ${
                isActive ? "text-white" : "text-white/80 hover:text-white"
              }`
            }
          >
            <span className="text-xl">{icon}</span>
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
          {!collapsed && hasSubmenu && (
            <span className="text-xl">
              {hover ? <FiChevronUp /> : <FiChevronDown />}
            </span>
          )}
        </div>

        {hasSubmenu && !collapsed && (
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
            style={{ maxHeight: hover ? `${submenu.length * 2.5}rem` : "0" }}
          >
            {submenu.map((sub) => (
              <NavLink
                key={sub.label}
                to={sub.path}
                className={({ isActive }) =>
                  `block py-2 pl-12 text-white/80 hover:text-white ${
                    isActive ? "font-semibold text-white" : ""
                  }`
                }
              >
                {sub.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      onMouseEnter={() => !locked && setCollapsed(false)}
      onMouseLeave={() => !locked && setCollapsed(true)}
      className={`sticky top-0 h-screen bg-[#033153] transition-all duration-300 ${
        collapsed ? "w-20" : "w-56"
      } rounded-e-4xl`}
    >
      {!collapsed && (
        <button
          onClick={() => {
            setLocked(!locked);
            setCollapsed(false);
          }}
          className="absolute top-1 right-1 w-10 h-10 flex items-center justify-center cursor-pointer"
          title={locked ? "Destravar sidebar" : "Travar sidebar"}
        >
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center ${
              locked ? "bg-[#FF7E29]" : "bg-white/30"
            }`}
          >
            <FiMapPin
              size={12}
              className={locked ? "text-white" : "text-white/70"}
            />
          </span>
        </button>
      )}

      <div className="flex flex-col h-full py-6 justify-between">
        <div className="flex flex-col gap-2">
          {menuManage.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {menuSettings.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </aside>
  );
}
