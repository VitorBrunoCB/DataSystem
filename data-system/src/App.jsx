import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/home";
import Cardapio from "./pages/CardapioDigital/cardapioDigital";
import Faturamento from "./pages/Faturamento/Faturamento";
import Pedidos from "./pages/Pedidos/pedidos";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="/faturamento" element={<Faturamento />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Route>
    </Routes>
  );
}
