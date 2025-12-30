import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Faturamento() {
  const [activeTab, setActiveTab] = useState("resumo");

  const vendasMensais = [
    { mes: "Jan", valor: 1000 },
    { mes: "Fev", valor: 1200 },
    { mes: "Mar", valor: 900 },
    { mes: "Abr", valor: 1500 },
    { mes: "Mai", valor: 1300 },
    { mes: "Jun", valor: 1700 },
    { mes: "Jul", valor: 1600 },
    { mes: "Ago", valor: 1800 },
    { mes: "Set", valor: 1400 },
    { mes: "Out", valor: 1900 },
    { mes: "Nov", valor: 2000 },
    { mes: "Dez", valor: 2200 },
  ];

  const contasReceber = [
    { cliente: "Cliente A", valor: 5000 },
    { cliente: "Cliente B", valor: 3000 },
    { cliente: "Cliente C", valor: 2000 },
    { cliente: "Cliente D", valor: 4000 },
    { cliente: "Cliente E", valor: 3500 },
  ];

  const contasPagar = [
    {
      id: 1,
      emissao: "01/12/2025",
      documento: "NF123",
      fornecedor: "Fornecedor X",
      descricao: "Compra de materiais",
      categoria: "Materiais",
      valor: 4500,
      vencimento: "10/12/2025",
      pago: false,
    },
    {
      id: 2,
      emissao: "02/12/2025",
      documento: "NF124",
      fornecedor: "Fornecedor Y",
      descricao: "Serviço de limpeza",
      categoria: "Serviços",
      valor: 3200,
      vencimento: "12/12/2025",
      pago: false,
    },
    {
      id: 3,
      emissao: "03/12/2025",
      documento: "NF125",
      fornecedor: "Fornecedor Z",
      descricao: "Equipamentos",
      categoria: "Equipamentos",
      valor: 2800,
      vencimento: "15/12/2025",
      pago: false,
    },
  ];

  const topProdutos = [
    { nome: "Produto 1", vendas: 120 },
    { nome: "Produto 2", vendas: 90 },
    { nome: "Produto 3", vendas: 80 },
    { nome: "Produto 4", vendas: 70 },
    { nome: "Produto 5", vendas: 60 },
  ];

  const topClientes = [
    { nome: "Cliente 1", compras: 500 },
    { nome: "Cliente 2", compras: 400 },
    { nome: "Cliente 3", compras: 350 },
    { nome: "Cliente 4", compras: 300 },
    { nome: "Cliente 5", compras: 250 },
  ];

  const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28", "#FF4567"];
  const [pagarData, setPagarData] = useState(contasPagar);

  const togglePago = (id) => {
    setPagarData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, pago: !item.pago } : item))
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-900">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["resumo", "receber", "pagar"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              activeTab === tab
                ? "bg-amber-500 text-white shadow-md"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab === "resumo"
              ? "Resumo"
              : tab === "receber"
              ? "Contas a Receber"
              : "Contas a Pagar"}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      {activeTab === "resumo" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total de Vendas e Ticket Médio */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-700">Total de Vendas</h2>

            {/* Cards Dia / Mês / Ano */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-gray-700">Dia</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">R$ 0,00</p>
              </div>
              <div className="bg-gradient-to-br from-amber-200 to-amber-300 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-gray-700">Mês</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">R$ 0,00</p>
              </div>
              <div className="bg-gradient-to-br from-amber-300 to-amber-400 p-5 rounded-2xl shadow flex flex-col items-center justify-center">
                <p className="text-sm font-semibold text-gray-700">Ano</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">R$ 0,00</p>
              </div>
            </div>

            {/* Ticket Médio */}
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
                Ticket Médio
              </h3>
              <p className="text-2xl font-bold">R$ 0,00</p>
            </div>

            {/* Vendas Mensal */}
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-700">
                Vendas Mensal
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={vendasMensais}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="#FF8042"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rankings */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                Top 10 Produtos
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topProdutos}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vendas" fill="#0088FE" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4 text-gray-700">
                Top 10 Clientes
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={topClientes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compras" fill="#00C49F" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === "receber" && (
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Contas a Receber</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={contasReceber}
                dataKey="valor"
                nameKey="cliente"
                outerRadius={120}
                fill="#0088FE"
                label
              >
                {contasReceber.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeTab === "pagar" && (
        <div className="space-y-6">
          {/* Cards resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-2xl text-center shadow">
              <p className="text-sm">Total a Pagar</p>
              <p className="text-xl font-bold">R$ 0,00</p>
            </div>
            <div className="bg-gradient-to-br from-red-200 to-red-300 p-4 rounded-2xl text-center shadow">
              <p className="text-sm">Total Vencido</p>
              <p className="text-xl font-bold">R$ 0,00</p>
            </div>
            <div className="bg-gradient-to-br from-red-300 to-red-400 p-4 rounded-2xl text-center shadow">
              <p className="text-sm">A Pagar Hoje</p>
              <p className="text-xl font-bold">R$ 0,00</p>
            </div>
          </div>

          {/* Top 10 Despesas */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Top 10 Despesas por Categoria</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={contasPagar}
                  dataKey="valor"
                  nameKey="categoria"
                  outerRadius={100}
                  label
                >
                  {contasPagar.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          

          {/* Tabela de contas */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">Contas a Pagar</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-3 py-2">Pago</th>
                    <th className="px-3 py-2">Emissão</th>
                    <th className="px-3 py-2">Documento</th>
                    <th className="px-3 py-2">Fornecedor</th>
                    <th className="px-3 py-2">Descrição</th>
                    <th className="px-3 py-2">Categoria</th>
                    <th className="px-3 py-2">Valor</th>
                    <th className="px-3 py-2">Vencimento</th>
                  </tr>
                </thead>
                <tbody>
                  {pagarData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={item.pago}
                          onChange={() => togglePago(item.id)}
                        />
                      </td>
                      <td className="px-3 py-2">{item.emissao}</td>
                      <td className="px-3 py-2">{item.documento}</td>
                      <td className="px-3 py-2">{item.fornecedor}</td>
                      <td className="px-3 py-2">{item.descricao}</td>
                      <td className="px-3 py-2">{item.categoria}</td>
                      <td className="px-3 py-2">R$ {item.valor}</td>
                      <td className="px-3 py-2">{item.vencimento}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
