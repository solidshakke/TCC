import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './Home.css';
import PedidoTabela from '../../components/PedidoTabela';

const Home = () => {
  const url = 'http://localhost:3000/products';
  const {data: items, loading, error} = useFetch(url);

  return (
  <div>
    <h1>Produtos</h1>
    {loading && <p>Carregando dados ...</p>}
    {error && <p>{error}</p>}
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
    <PedidoTabela />
  </div>
  ); 
};

export default Home;