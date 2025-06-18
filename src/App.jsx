import "./App.css";
import { useState } from "react";
import { produtos } from "./lib/produtos";

import { Trash2 } from "lucide-react";

function App() {
  const [produtosList] = useState(produtos);
  const [carrinho, setCarrinho] = useState([]);

  const handleAddCarrinho = (id) => {
    // adicionar ao carrinho o produto com o id selecionado

    const existeNoCarrinho = carrinho.find((item) => item.id === id);
    if (existeNoCarrinho) {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    } else {
      const produtoSelecionado = produtosList.find((item) => item.id === id);
      setCarrinho([...carrinho, { ...produtoSelecionado, quantidade: 1 }]);
    }
  };

  const handleRemove = (id) => {
    const produto = carrinho.find((item) => item.id === id);
    if (produto.quantidade === 1) {
      setCarrinho(carrinho.filter((item) => item.id !== id));
    } else {
      const novoCarrinho = carrinho.map((item) => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade - 1 };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    }
  };

  // soma de todos os precos de carrinho
  const totalCarrinho = carrinho.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  console.log(carrinho);
  // console.log(totalCarrinho);

  return (
    <>
      <div className="relative h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-5">
            <div className="text-4xl font-bold font-mono tracking-tighter">
              Mini Loja React
            </div>
            <div>
              {produtosList && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  {produtosList.map((item) => (
                    <div key={item.id} className="shadow-md rounded-b-lg">
                      <div>
                        <img src={item.imagem} alt="" />
                      </div>
                      <div className="p-2 bg-gray-100">
                        <div className="font-bold text-lg">{item.nome}</div>
                        <div className="text-sm">{item.preco}</div>
                        <div className="mt-4">
                          <button
                            onClick={() => handleAddCarrinho(item.id)}
                            className="p-2 text-white cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-400"
                          >
                            adiciona
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrinho.length > 0 && (
              <div className="space-y-4 max-w-md mx-auto mt-15 bg-amber-200 p-10 rounded-lg">
                <div className="space-y-2">
                  <div className="text-lg font-mono font-bold">
                    Carrinho de compras
                  </div>
                  <div className="space-y-1">
                    {carrinho.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center bg-amber-100 p-2 rounded-full"
                      >
                        <div className="flex-1">
                          {item.nome} x {item.quantidade} —{" "}
                          {(item.preco * item.quantidade).toFixed(2)} €
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="bg-red-500 cursor-pointer p-1 text-white rounded-full text-sm"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-lg font-mono font-bold">Total</div>
                  <div>
                    <div>Total de item: {totalItens}</div>
                    <div className="text-6xl font-bold">
                      {totalCarrinho.toFixed(2)} €
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
