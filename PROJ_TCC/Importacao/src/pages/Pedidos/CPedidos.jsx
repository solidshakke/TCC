import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch';
import './CPedidos.css'

const url = "http://localhost:3000/products";

const CPedidos = () => {
  const [products, setProducts] = useState ([]);
  const {data: items, httpConfig, loading, error} = useFetch(url);
  const [pedido, setPedido] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [invoice, setInvoice] = useState("");
  const [data_invoice, setDataInvoice] = useState("");
  const [data_prontidao, setDataProntidao] = useState("");
  const [etd, setEtd] = useState("");
  const [eta, setEta] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault ()
      const product = {
        pedido,
        fornecedor,
        invoice,
        data_invoice,
        data_prontidao,
        etd,
        eta,
      };
      httpConfig(product, "POST");

      setPedido("");
      setFornecedor("");
      setInvoice("");
      setDataInvoice("");
      setDataProntidao("");
      setEtd("");
      setEta("");
  };
    const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  }
  return (
      <div className="add-products">
        <form onSubmit={handleSubmit}>
            <div>
                <label>   
                    <span>Pedido: </span>
                    <input type="text" name="pedido" placeholder="Digite o nº do Pedido" onChange={(e) => setPedido(e.target.value)} value={pedido}/>
                </label>
                <label>   
                    <span>Fornecedor: </span>
                    <input type="text" name="fornecedor" placeholder="Digite o nome do Fornecedor" onChange={(e) => setFornecedor(e.target.value)} value={fornecedor}/>
                </label>
                <label>   
                    <span>Invoice: </span>
                    <input type="text" name="invoice" placeholder="Digite o nº da Invoice" onChange={(e) => setInvoice(e.target.value)} value={invoice}/>
                </label>
                <label>   
                    <span>Data da Invoice: </span>
                    <input type="date" name="data_invoice" placeholder="Digite a data da Invoice" onChange={(e) => setDataInvoice(e.target.value)} value={data_invoice}/>
                </label>
                <label>   
                    <span>Data de Prontidão: </span>
                    <input type="date" name="data_prontidao" placeholder="Digite a data de Prontidão do Pedido" onChange={(e) => setDataProntidao(e.target.value)} value={data_prontidao}/>
                </label>
                <label>   
                    <span>ETD: </span>
                    <input type="date" name="etd" onChange={(e) => setEtd(e.target.value)} value={etd}/>
                </label>
                <label>   
                    <span>ETA: </span>
                    <input type="date" name="eta" onChange={(e) => setEta(e.target.value)} value={eta}/>
                </label>
            </div>
          {loading && <input type="submit" disabled value="Aguarde" />}
          {!loading && <input type="submit" value="Criar" />}
        </form>
        <div className = "ShowProducts" style={{lineHeight: "1.8"}}>
            {loading && <p>Carregando dados...</p>}
            {error && <p>{error}</p>} 
            {!error && (
             <ul>
                {items && items.map((products) => (
                 <li key={products.id}>
                {products.pedido}  
                   - {products.fornecedor} -  
                  Invoice: {products.invoice} - 
                  Data da Invoice: {products.data_invoice} <br/>
                  Data de Prontidão: {products.data_prontidao} -
                  ETD: {products.etd} -
                  ETA: {products.eta} - 

          <button onClick={() => handleRemove(products.id)}>Excluir</button>
         </li>
       ))}
     </ul>
     )}

        </div>
      </div>
  );
};

export default CPedidos;