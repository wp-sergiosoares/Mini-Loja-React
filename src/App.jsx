import "./App.css";
import { useState, useEffect } from "react";
import { produtos } from "./lib/produtos";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

function App() {
  const [produtosList] = useState(produtos);
  const [carrinho, setCarrinho] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState([]);

  console.log(searchInput);

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

  const handleSearch = (e) => {
    const valor = e.target.value;
    setSearchInput(valor);
    const encontrouProduto = produtosList.filter((produto) =>
      produto.nome.toLowerCase().includes(valor.toLowerCase())
    );
    setFiltered(encontrouProduto);
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      setFiltered(produtosList);
    } else {
      const encontrouProduto = produtosList.filter((produto) =>
        produto.nome.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFiltered(encontrouProduto);
    }
  }, [searchInput, produtosList]);

  //console.log(carrinho);
  // console.log(totalCarrinho);

  return (
    <>
      <div className="my-10 p-4">
        <div className="container max-w-2xl mx-auto">
          <div className="space-y-5">
            <div className="text-4xl font-bold font-mono tracking-tighter">
              Mini Loja React
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // já está sendo filtrado com o onChange
              }}
            >
              <div className="flex gap-2 items-center justify-between">
                <div className="flex-1">
                  <input
                    type="text"
                    className="border-1 border-gray-800 p-3 w-full rounded-full text-lg"
                    placeholder="pesquisa..."
                    value={searchInput}
                    onChange={(e) => handleSearch(e)}
                  />
                </div>
                <div>
                  <button className="bg-blue-500 p-3 rounded-full text-white cursor-pointer hover:bg-blue-400">
                    Pesquisa
                  </button>
                </div>
              </div>
            </form>
            <div>
              {filtered && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {filtered.map((item) => (
                    <div key={item.id} className="shadow-md rounded-b-lg">
                      <div>
                        <img src={item.imagem} alt="" />
                      </div>
                      <div className="p-2 bg-gray-100">
                        <div className="font-bold text-lg">{item.nome}</div>
                        <div className="text-sm">{item.preco}</div>
                        <div className="mt-4">
                          <Button
                            onClick={() => handleAddCarrinho(item.id)}
                            className="p-2 text-white cursor-pointer rounded-lg bg-blue-500 hover:bg-blue-400"
                          >
                            adiciona
                          </Button>
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
