
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
const Navbar = () => {
  const name = "Leandro";
  return (
  <>
    <h1 className="usuario">Olá {name}</h1>
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/cpedidos">Cadastrar Pedido</NavLink>
    <NavLink to="/cmateriais2">Cadastrar Material</NavLink>
    <NavLink to="/cfornecedor">Cadastrar Fornecedor</NavLink>
  </nav>
  </>
  );
};

export default Navbar;
