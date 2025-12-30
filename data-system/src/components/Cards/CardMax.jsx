import { useState, useRef, useEffect } from "react";

export default function CardMax({
  title = "Sofa SWLJK",
  subtitle = "3-seat sofa, dark white",
  price = "EGP 19,898",
  quantidade = 56,
  sku = "SKU12345",
  onClick,
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

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  // Converter price para número
  const precoNumero = Number(price.replace(/[^\d.-]/g, ""));
  const valorTotal = precoNumero * quantidade;

  return (
    <div
      className="relative w-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className={`
          bg-white rounded-xl shadow-sm
          hover:shadow-md transition overflow-hidden
          ${
            hovered
              ? "scale-105 z-50 shadow-xl absolute top-0 left-0 w-full"
              : ""
          }
        `}
        style={{ transformOrigin: "top center" }}
      >
        {/* Imagem */}
        <div className="w-full h-28 bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=80&q=80"
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Conteúdo */}
        <div className="p-2 flex flex-col gap-1">
          <span className="text-sm font-semibold text-gray-900">
            {title}
          </span>

          <span className="text-xs text-gray-400 leading-tight">
            {subtitle}
          </span>

          <span className="text-sm font-semibold text-orange-500 mt-1">
            {price}
          </span>

          {hovered && (
            <div className="mt-1 text-xs text-gray-500 space-y-1">
              <p>SKU: {sku}</p>
              <p>Valor Total: R$ {valorTotal.toLocaleString()}</p>
              <p>Quantidade: {quantidade}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
