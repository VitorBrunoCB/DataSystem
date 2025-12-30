export default function CardMin({
  title = "Sofa",
  subtitle = "3-seats, dark white",
  price = "EGP 19,888",
}) {
  return (
    <div
      className="
        w-full sm:w-auto bg-white rounded-xl shadow-sm
        p-2 flex gap-2 items-center
        hover:shadow-md transition cursor-pointer
      "
    >
      {/* Imagem à esquerda */}
      <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0" />

      {/* Informações à direita */}
      <div className="flex flex-col justify-center">
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        <span className="text-xs text-gray-400">{subtitle}</span>
        <span className="text-sm font-semibold text-orange-500 mt-1">
          {price}
        </span>
      </div>
    </div>
  );
}
