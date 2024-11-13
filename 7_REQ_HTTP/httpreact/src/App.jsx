import { useState, useEffect } from 'react'
import './App.css'
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState ([]);
  const {data: items, httpConfig, loading, error} = useFetch(url);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
// 1 - resgatando dados
//  useEffect(() => {
//  async function fetchData() {
//      
//    const res = await fetch(url)
//    const data = await res.json()
//    
//    setProducts(data)
//    }
//    fetchData();
//  }, []);

// 2 - add de produtos
const handleSubmit = async (e) => {
  e.preventDefault ()
    const product = {
      name,
      price,
    };
    // const res = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // // 3 - carregamento dinâmico
    // const addedProduct = await res.json();
    // setProducts((prevProducts) => [...prevProducts, addedProduct ]);

    // 5 - Refatorando post
    httpConfig(product, "POST");

    setName("");
    setPrice("")
};
//8 - Desafio 6
const handleRemove = (id) => {
  httpConfig(id, "DELETE");
}
  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {/* 6 - Loading */}
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!error && (
      <ul>
        {items && items.map((products) => (
          <li key={products.id}>
            {products.name} - R$ {products.price}
            <button onClick={() => handleRemove(product.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      )}
        <div className="add-products">
          <form onSubmit={handleSubmit}>
            <label>
              Nome:
              <input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              Preço:
              <input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)}/>
            </label>
            {/* 7 - state de loading no post */}
            {loading && <input type="submit" disabled value="Aguarde" />}
            {!loading && <input type="submit" value="Criar" />}
          </form>
        </div>
    </div>
  )
}

export default App

/*
Pessoal, ao instalarem o Json Server, utilizem o seguinte comando:
npm install json-server@0.17.0
A versão atual está apresentando falhas, mas com a versão 0.17.0, poderão seguir com o curso sem problemas.
Para aqueles que  já instalaram o pacote na versão mais recente, executem esse comando:
npm uninstall json-server
Em seguida, excluam a pasta node_modules, e executem o comando:
npm install
Por fim, executem o comando de instalação do pacote corrigido:
npm install json-server@0.17.0

*/
