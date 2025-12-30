import { useState } from "react";
import {
  FiPlus,
  FiGrid,
  FiList,
  FiBox,
  FiCheckCircle,
  FiXCircle,
  FiDollarSign,
  FiMaximize2,
} from "react-icons/fi";
import CardMin from "../../components/Cards/CardMin";
import CardMax from "../../components/Cards/CardMax";
import ProdutosTable from "../../components/ProdutosTable/ProdutosTable";
import { IoQrCodeOutline } from "react-icons/io5";

export default function CardapioDigital() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [viewMode, setViewMode] = useState("cardsMin"); // "cardsMin", "table", "cardsMax", "qrcode"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 35;

  const resumo = [
    {
      title: "Total de Produtos",
      value: 120,
      color: "from-emerald-500 to-emerald-600",
      icon: <FiBox size={24} />,
    },
    {
      title: "Em Estoque",
      value: 95,
      color: "from-indigo-500 to-indigo-600",
      icon: <FiCheckCircle size={24} />,
    },
    {
      title: "Esgotados",
      value: 25,
      color: "from-orange-500 to-orange-600",
      icon: <FiXCircle size={24} />,
    },
    {
      title: "Valor em Estoque",
      value: "R$ 15.000",
      color: "from-pink-500 to-pink-600",
      icon: <FiDollarSign size={24} />,
    },
  ];

  const produtos = Array.from({ length: 50 }).map((_, i) => ({
    title: `Produto ${i + 1}`,
    subtitle: "Descrição curta",
    price: `R$ ${i * 10},00`,
    category: i % 2 === 0 ? "Comidas" : "Bebidas",
  }));

  const produtosFiltrados = produtos.filter(
    (prod) =>
      prod.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "Todos" || prod.category === categoryFilter)
  );

  const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const produtosPaginados = produtosFiltrados.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {resumo.map((item, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${item.color} text-white rounded-2xl p-5 shadow-lg`}
          >
            <div className="absolute top-3 right-3">{item.icon}</div>
            <p className="text-sm opacity-80">{item.title}</p>
            <p className="text-2xl font-semibold mt-2">{item.value}</p>
          </div>
        ))}
      </div>

      {/* BARRA DE PESQUISA E BOTÕES */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex w-full sm:w-1/2 gap-2">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button
            onClick={() => setViewMode("qrcode")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "qrcode"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-900"
            }`}
          >
            <IoQrCodeOutline />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Botões separados de visualização */}
          <button
            onClick={() => setViewMode("cardsMin")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "cardsMin"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-900"
            }`}
          >
            <FiGrid />
          </button>

          <button
            onClick={() => setViewMode("cardsMax")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "cardsMax"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-900"
            }`}
          >
            <FiMaximize2 />
          </button>

          <button
            onClick={() => setViewMode("table")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "table"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white text-gray-900"
            }`}
          >
            <FiList />
          </button>

          <button className="flex items-center gap-2 bg-amber-500 text-white p-3 rounded-lg hover:bg-amber-600 transition cursor-pointer">
            <FiPlus /> Adicionar Produto
          </button>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option>Todos</option>
            <option>Comidas</option>
            <option>Bebidas</option>
          </select>
        </div>
      </div>

      {/* PRODUTOS */}
      {viewMode === "cardsMin" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {produtosPaginados.map((prod, index) => (
            <CardMin
              key={index}
              title={prod.title}
              subtitle={prod.subtitle}
              price={prod.price}
            />
          ))}
        </div>
      ) : viewMode === "cardsMax" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          {produtosPaginados.slice(0, 18).map((prod, index) => (
            <CardMax
              key={index}
              title={prod.title}
              subtitle={prod.subtitle}
              price={prod.price}
            />
          ))}
        </div>
      ) : viewMode === "table" ? (
        <ProdutosTable produtos={produtosPaginados} />
      ) : viewMode === "qrcode" ? (
        <div className="w-full h-64 flex justify-center items-center bg-gray-300 rounded-lg">
          <p className="text-gray-700">Tela QRCode</p>
        </div>
      ) : null}

      {/* PAGINAÇÃO */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-amber-500"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded-lg border border-gray-300 hover:bg-amber-500 ${
              currentPage === i + 1
                ? "bg-amber-500 text-white border-amber-500"
                : ""
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-amber-500"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
