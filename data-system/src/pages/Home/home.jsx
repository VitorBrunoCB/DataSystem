import {
  FiTrendingUp,
  FiShoppingBag,
  FiDollarSign,
  FiBarChart2,
  FiCreditCard,
} from "react-icons/fi";

import CardMin from "../../components/Cards/CardMin";

export default function Home() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* CARDS RESUMO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 cursor-default">
        <Card
          title="Vendas Hoje"
          value="R$ 0,00"
          icon={<FiDollarSign />}
          color="from-emerald-500 to-emerald-600"
        />
        <Card
          title="Vendas do Mês"
          value="R$ 0,00"
          icon={<FiTrendingUp />}
          color="from-indigo-500 to-indigo-600"
        />
        <Card
          title="Total de Pedidos"
          value="0"
          icon={<FiShoppingBag />}
          color="from-orange-500 to-orange-600"
        />
        <Card
          title="Ticket Médio"
          value="R$ 0,00"
          icon={<FiBarChart2 />}
          color="from-pink-500 to-pink-600"
        />
      </div>

      {/* GRÁFICO */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Faturamento – Últimos 7 dias
        </h2>

        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed rounded-xl">
          Gráfico aqui
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FORMAS DE PAGAMENTO */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Formas de Pagamento
          </h2>

          <ul className="space-y-4">
            <PaymentItem label="Pix" value="R$ 0,00" />
            <PaymentItem label="Crédito" value="R$ 0,00" />
            <PaymentItem label="Débito" value="R$ 0,00" />
            <PaymentItem label="Dinheiro" value="R$ 0,00" />
          </ul>
        </div>

        {/* TOP PRODUTOS (CARDMIN) */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top Produtos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <CardMin
                key={index}
                title={`Produto ${index + 1}`}
                subtitle="Descrição curta"
                price="R$ 0,00"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTES AUXILIARES */

function Card({ title, value, icon, color }) {
  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        rounded-2xl p-5 text-white shadow-lg
        transform transition hover:scale-[1.03]
      `}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm opacity-80">{title}</span>
        <div className="text-2xl opacity-90">{icon}</div>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function PaymentItem({ label, value }) {
  return (
    <li className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-gray-700">
        <FiCreditCard />
        <span>{label}</span>
      </div>
      <span className="font-semibold text-gray-800">{value}</span>
    </li>
  );
}
