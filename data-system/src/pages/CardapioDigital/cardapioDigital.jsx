import { useState, useRef, useEffect } from "react";
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
  const [viewMode, setViewMode] = useState("cardsMin");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState(["Comidas", "Bebidas"]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const itemsPerPage = 35;

  const modalRef = useRef();
  const categoryRef = useRef();

  // Fechar modal ou dropdown clicando fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedProduct(null);
        setShowNewCategory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resumo = [
    { title: "Total de Produtos", value: 120, color: "from-emerald-500 to-emerald-600", icon: <FiBox size={24} /> },
    { title: "Em Estoque", value: 95, color: "from-indigo-500 to-indigo-600", icon: <FiCheckCircle size={24} /> },
    { title: "Esgotados", value: 25, color: "from-orange-500 to-orange-600", icon: <FiXCircle size={24} /> },
    { title: "Valor em Estoque", value: "R$ 15.000", color: "from-pink-500 to-pink-600", icon: <FiDollarSign size={24} /> },
  ];

  const produtos = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    title: `Produto ${i + 1}`,
    subtitle: "Descrição curta",
    price: `R$ ${i * 10},00`,
    category: i % 2 === 0 ? "Comidas" : "Bebidas",
    active: true,
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=80&q=80",
    variations: [],
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

  const handleAddVariation = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      const newVariation = e.target.value.trim();
      if (!selectedProduct.variations.includes(newVariation)) {
        setSelectedProduct({
          ...selectedProduct,
          variations: [...selectedProduct.variations, newVariation],
        });
      }
      e.target.value = "";
      e.preventDefault();
    }
  };

  const handleRemoveVariation = (variation) => {
    setSelectedProduct({
      ...selectedProduct,
      variations: selectedProduct.variations.filter((v) => v !== variation),
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setSelectedProduct({ ...selectedProduct, category: newCategory.trim() });
      setNewCategory("");
      setShowNewCategory(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-gray-900">
      {/* CARDS DE RESUMO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {resumo.map((item, index) => (
          <div key={index} className={`relative bg-gradient-to-br ${item.color} text-white rounded-2xl p-5 shadow-lg`}>
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
              viewMode === "qrcode" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-900"
            }`}
          >
            <IoQrCodeOutline />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("cardsMin")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "cardsMin" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-900"
            }`}
          >
            <FiGrid />
          </button>

          <button
            onClick={() => setViewMode("cardsMax")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "cardsMax" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-900"
            }`}
          >
            <FiMaximize2 />
          </button>

          <button
            onClick={() => setViewMode("table")}
            className={`p-3 rounded-lg border hover:bg-gray-300 transition cursor-pointer ${
              viewMode === "table" ? "bg-amber-500 text-white border-amber-500" : "bg-white text-gray-900"
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
            {categories.map((c, idx) => (
              <option key={idx}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PRODUTOS + PAGINAÇÃO */}
      <div className="relative pb-16">
        {viewMode === "cardsMin" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {produtosPaginados.map((prod, index) => (
              <div key={index} onClick={() => setSelectedProduct(prod)}>
                <CardMin title={prod.title} subtitle={prod.subtitle} price={prod.price} />
              </div>
            ))}
          </div>
        ) : viewMode === "cardsMax" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
            {produtosPaginados.slice(0, 18).map((prod, index) => (
              <CardMax key={index} title={prod.title} subtitle={prod.subtitle} price={prod.price} />
            ))}
          </div>
        ) : viewMode === "table" ? (
          <ProdutosTable produtos={produtosPaginados} />
        ) : viewMode === "qrcode" ? (
          <div className="w-full h-64 flex justify-center items-center bg-gray-300 rounded-lg">
            <p className="text-gray-700">Tela QRCode</p>
          </div>
        ) : null}

        {/* PAGINAÇÃO FIXA */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center items-center gap-2 bg-gray-100 py-3">
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
                currentPage === i + 1 ? "bg-amber-500 text-white border-amber-500" : ""
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

      {/* MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white rounded-xl p-6 w-full max-w-lg relative space-y-4 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedProduct(null)}
            >
              X
            </button>

            <h2 className="text-xl font-bold mb-2">Editar Produto</h2>

            {/* Imagem */}
            <div className="relative w-full h-40 mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover rounded-lg"
              />
              <button className="absolute top-2 right-2 bg-amber-500 text-white p-2 rounded-full hover:bg-amber-600 transition cursor-pointer">
                Alterar
              </button>
            </div>

            {/* Título */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Título</label>
              <input
                type="text"
                value={selectedProduct.title}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, title: e.target.value })
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Descrição */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Descrição</label>
              <textarea
                value={selectedProduct.subtitle}
                onChange={(e) =>
                  setSelectedProduct({ ...selectedProduct, subtitle: e.target.value })
                }
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Preço + Categoria */}
            <div className="flex gap-2 flex-wrap relative">
              <div className="flex-1 flex flex-col">
                <label className="mb-1 font-medium">Preço</label>
                <input
                  type="text"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, price: e.target.value })
                  }
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="flex-1 flex flex-col relative" ref={categoryRef}>
                <label className="mb-1 font-medium">Categoria</label>
                <div className="flex gap-2 relative">
                  <select
                    value={selectedProduct.category}
                    onChange={(e) =>
                      setSelectedProduct({ ...selectedProduct, category: e.target.value })
                    }
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    {categories.map((c, idx) => (
                      <option key={idx}>{c}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowNewCategory(!showNewCategory)}
                    className="bg-amber-500 text-white p-2 rounded-lg hover:bg-amber-600 transition cursor-pointer"
                  >
                    <FiPlus />
                  </button>

                  {showNewCategory && (
                    <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg p-2 w-40 z-50">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                        placeholder="Nova categoria..."
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Variações */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Variações</label>
              <input
                type="text"
                placeholder="Digite e aperte Enter..."
                onKeyDown={handleAddVariation}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 mb-2"
              />
              <div className="flex flex-wrap gap-2">
                {selectedProduct.variations.map((v, idx) => (
                  <span key={idx} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full">
                    {v}
                    <button
                      onClick={() => handleRemoveVariation(v)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Ativar no cardápio */}
            <div className="flex items-center gap-3">
              <span className="font-medium">Ativar no cardápio</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedProduct.active}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, active: e.target.checked })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-amber-500 peer-focus:ring-2 peer-focus:ring-amber-400 transition-all"></div>
                <div
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all"
                ></div>
              </label>
            </div>

            {/* Botão Salvar */}
            <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition cursor-pointer">
              Salvar Alterações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
