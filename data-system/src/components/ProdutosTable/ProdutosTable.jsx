export default function ProdutosTable({ produtos }) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-y-auto max-h-[580px]">
      <table className="w-full min-w-[700px] text-left border-collapse">
        <thead className="bg-[#033153] top-0 z-10">
          <tr>
            <th className="py-3 px-4 text-sm font-semibold text-white">Cod</th>
            <th className="py-3 px-4 text-sm font-semibold text-white">SKU</th>
            <th className="py-3 px-4 text-sm font-semibold text-white">Nome</th>
            <th className="py-3 px-4 text-sm font-semibold text-white">Quant.</th>
            <th className="py-3 px-4 text-sm font-semibold text-white">Valor Unit.</th>
            <th className="py-3 px-4 text-sm font-semibold text-white">Valor Tot.</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((prod, i) => (
            <tr
              key={i}
              className={`hover:bg-amber-50 transition ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="py-2 px-4">{prod.cod || i + 1}</td>
              <td className="py-2 px-4">{prod.sku || `SKU${i + 100}`}</td>
              <td className="py-2 px-4">{prod.title}</td>
              <td className="py-2 px-4">{prod.quant || 1}</td>
              <td className="py-2 px-4 font-semibold text-amber-500">{prod.price}</td>
              <td className="py-2 px-4 font-semibold text-amber-500">
                {prod.quant ? `R$ ${prod.quant * parseFloat(prod.price.replace("R$ ", "").replace(",", "."))}` : prod.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
