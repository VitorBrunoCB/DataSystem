export default function CardMax({
  title = "Sofa SWLJK",
  subtitle = "3-seat sofa, dark white",
  price = "EGP 19,898",
}) {
  return (
    <div
      className="
      bg-white rounded-xl shadow-sm
        hover:shadow-md transition cursor-pointer
        overflow-hidden
      "
    >
      {/* Imagem */}
      <div className="w-full h-28 bg-gray-200" />

      {/* Conteúdo */}
      <div className="p-2 flex flex-col gap-1">
        <span className="text-sm font-semibold text-gray-900">{title}</span>

        <span className="text-xs text-gray-400 leading-tight">{subtitle}</span>

        <span className="text-sm font-semibold text-orange-500 mt-1">
          {price}
        </span>
      </div>
    </div>
  );
}
