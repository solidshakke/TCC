import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Search = () => {
  let [searchParams] = useSearchParams();
  const url = "http://localhost:3000/products?" + searchParams;
  const { data: items, loading, error } = useFetch(url);

  return (
    <div>
      <h1>Resultados disponíveis:</h1>
      <ul className="products">
      {items && 
        items.map((product) => (
         <li key={product.id}>
          <h2>{product.pedido}</h2>
          <p>{product.fornecedor}</p>
          <p>Invoice: {product.invoice}</p>
          <p>Data da invoice: {product.data_invoice}</p>
          <p>Data da prontidão: {product.data_prontidao}</p>
          <p>ETD: {product.etd}</p>
          <p>ETA: {product.eta}</p>
          
          <Link to={`/products/${product.id}`}>Detalhes</Link>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Search;