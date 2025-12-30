import { useState } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiShoppingBag,
  FiBarChart2,
  FiClock,
} from "react-icons/fi";

export default function Pedidos() {
  const [mostrarHistorico, setMostrarHistorico] = useState(false);

  const [pedidos, setPedidos] = useState(
    Array.from({ length: 18 }).map((_, i) => ({
      id: i + 1,
      origem: i % 2 === 0 ? "Presencial" : "Online",
      status: i % 3 === 0 ? "novo" : i % 3 === 1 ? "confirmado" : "pronto",
      local: i % 2 === 0 ? `Mesa ${i + 1}` : "Delivery",
      itens: ["X-Burguer", "Batata", "Refrigerante"],
      total: 25 + i * 3,
      observacoes: i % 2 === 0 ? "Sem cebola" : "Caprichar no molho",
    }))
  );

  function avancarStatus(id) {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;

        const ordem = ["novo", "confirmado", "pronto", "despachado"];
        const atual = ordem.indexOf(p.status);
        const proximo =
          atual < ordem.length - 1 ? ordem[atual + 1] : p.status;

        return { ...p, status: proximo };
      })
    );
  }

  const ativos = pedidos.filter((p) => p.status !== "despachado");
  const historico = pedidos.filter((p) => p.status === "despachado");

  const presencial = ativos.filter((p) => p.origem === "Presencial");
  const online = ativos.filter((p) => p.origem === "Online");

  const totalHoje = pedidos.reduce((acc, p) => acc + p.total, 0);
  const totalPedidos = ativos.length;
  const ticketMedio = totalHoje / (pedidos.length || 1);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-10">
      {/* ===== RESUMO ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div>
          <ResumoCard
            title="Vendas Hoje"
            value={`R$ ${totalHoje.toFixed(2)}`}
            icon={<FiDollarSign />}
            color="from-emerald-400 to-emerald-500"
          />

          <button
            onClick={() => setMostrarHistorico((v) => !v)}
            className="mt-2 flex items-center justify-center gap-2 text-xs bg-green-200 hover:bg-green-300 text-green-800 py-1.5 rounded-lg transition w-full"
          >
            <FiClock size={14} />
            Histórico
          </button>
        </div>

        <ResumoCard
          title="Pedidos Online"
          value={online.length}
          icon={<FiTrendingUp />}
          color="from-indigo-400 to-indigo-500"
        />
        <ResumoCard
          title="Pedidos Ativos"
          value={totalPedidos}
          icon={<FiShoppingBag />}
          color="from-orange-400 to-orange-500"
        />
        <ResumoCard
          title="Ticket Médio"
          value={`R$ ${ticketMedio.toFixed(2)}`}
          icon={<FiBarChart2 />}
          color="from-pink-400 to-pink-500"
        />
      </div>

      {/* ===== HISTÓRICO ===== */}
      {mostrarHistorico && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Pedidos Despachados</h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {historico.map((p) => (
              <PedidoCard key={p.id} pedido={p} historico />
            ))}
          </div>
        </section>
      )}

      {/* ===== PRESENCIAL ===== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Presencial</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {presencial.map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              onAvancar={avancarStatus}
            />
          ))}
        </div>
      </section>

      {/* ===== ONLINE ===== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Online</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {online.map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              onAvancar={avancarStatus}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ===== CARD RESUMO ===== */
function ResumoCard({ title, value, icon, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} text-white rounded-2xl p-5 shadow`}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm opacity-80">{title}</p>
        <div className="text-2xl">{icon}</div>
      </div>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}

/* ===== CARD PEDIDO ===== */
function PedidoCard({ pedido, onAvancar, historico }) {
  const statusConfig = {
    novo: {
      border: "border-blue-300",
      text: "text-blue-700",
      button: "bg-blue-200 hover:bg-blue-300 text-blue-800",
      label: "NOVO",
    },
    confirmado: {
      border: "border-yellow-300",
      text: "text-yellow-700",
      button: "bg-yellow-200 hover:bg-yellow-300 text-yellow-800",
      label: "CONFIRMADO",
    },
    pronto: {
      border: "border-green-300",
      text: "text-green-700",
      button: "bg-green-200 hover:bg-green-300 text-green-800",
      label: "PRONTO",
    },
    despachado: {
      border: "border-gray-400",
      text: "text-gray-700",
      button: "bg-gray-300 text-gray-700",
      label: "DESPACHADO",
    },
  };

  const status = statusConfig[pedido.status];

  return (
    <div
      className={`min-w-[280px] bg-white rounded-xl shadow border-t-4 ${status.border} flex flex-col`}
    >
      <div
        className={`text-xs font-semibold text-center py-1 rounded-t-xl ${status.text}`}
      >
        {status.label}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between">
          <span className="font-bold">#{pedido.id}</span>
          <span className="text-sm text-gray-600">{pedido.local}</span>
        </div>

        <ul className="text-sm list-disc list-inside">
          {pedido.itens.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        {pedido.observacoes && (
          <p className="text-xs italic text-gray-500">
            Obs: {pedido.observacoes}
          </p>
        )}

        <p className="font-semibold">R$ {pedido.total.toFixed(2)}</p>

        {!historico && (
          <div className="flex justify-end mt-1">
            <button
              onClick={() => onAvancar(pedido.id)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition ${status.button}`}
            >
              Avançar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
