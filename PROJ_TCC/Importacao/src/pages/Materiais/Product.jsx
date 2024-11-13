import { useFetch } from "../../hooks/useFetch";
import { useParams, Link } from "react-router-dom";

const Product = () => {
  //4  - rota dinamica
  const { id } = useParams();

  //5 - carregamento de dados
  const url = "http://localhost:3000/products/" + id;
  const { data: product, loading, error } = useFetch(url);

  return (
    <>
      {error && <p>Ocorreu um erro...</p>}
      {loading && <p>Carregando produto...</p>}
      {product && (
        <div>
          <h1>{product.pedido}</h1>
          <p>{product.fornecedor}</p>
          <p>Invoice: {product.invoice}</p>
          <p>Data da invoice: {product.data_invoice}</p>
          <p>Data da prontidão: {product.data_prontidao}</p>
          <p>ETD: {product.etd}</p>
          <p>ETA: {product.eta}</p>
          <br/>
          <p>ID do pedido: {id}</p> 
          <Link to={`/products/${product.id}/info`}>Mais informações</Link>
        </div>
      )}
    </>
  );
};

export default Product;