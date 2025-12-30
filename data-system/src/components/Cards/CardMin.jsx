import { useState, useRef } from "react";

export default function CardMin({
  title = "Sofa",
  subtitle = "3-seats, dark white",
  price = "EGP 19,888",
  quantidade = 56,
  sku = "SKU12345", // nova prop
}) {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setHovered(true), 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setHovered(false);
  };

  // Converter price para número para calcular o total
  const precoNumero = Number(price.replace(/[^\d.-]/g, "")); // remove R$, etc.
  const valorTotal = precoNumero * quantidade;

  return (
    <div className="relative w-full sm:w-auto">
      <div
        className={`
          bg-white rounded-xl shadow-sm flex items-stretch
          cursor-pointer transition-all duration-300 ease-out
          ${
            hovered
              ? "scale-110 z-50 shadow-xl absolute top-0 left-0 w-full"
              : ""
          }
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ transformOrigin: "top center" }}
      >
        {/* Imagem à esquerda ocupa toda a altura */}
        <div className="w-16 sm:w-20 flex-shrink-0 bg-gray-200 rounded-l-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=80&q=80"
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo do card */}
        <div className="flex gap-2 items-center flex-1 p-2">
          <div className="flex flex-col justify-center flex-1">
            <span className="text-sm font-semibold text-gray-900">{title}</span>
            <span className="text-xs text-gray-400">{subtitle}</span>
            <span className="text-sm font-semibold text-orange-500 mt-1">
              {price}
            </span>

            {hovered && (
              <div className="mt-1 text-xs text-gray-500 space-y-1">
                <p>SKU: {sku}</p>
                <p>Valor Total: R$ {valorTotal.toLocaleString()}</p>
              </div>
            )}
          </div>

          {/* Linha separadora */}
          <div className="h-12 w-px bg-gray-300 mx-3" />

          {/* Direita: quantidade */}
          <div className="flex flex-col items-center justify-center min-w-[50px]">
            <span className="text-sm text-gray-500">Quant.</span>
            <span className="text-lg font-bold text-[#033153]">
              {quantidade}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
